<?php
/**
 * ScandiPWA - Progressive Web App for Magento
 *
 * Copyright © Scandiweb, Inc. All rights reserved.
 * See LICENSE for license details.
 *
 * @license OSL-3.0 (Open Software License ("OSL") v. 3.0)
 * @package scandipwa/base-theme
 * @link https://github.com/scandipwa/base-theme
 */

namespace ScandiPWA\RmaGraphQl\Model\Resolver;

use Exception;
use Magento\Framework\Exception\LocalizedException;
use Magento\Framework\GraphQl\Config\Element\Field;
use Magento\Framework\GraphQl\Exception\GraphQlInputException;
use Magento\Framework\GraphQl\Query\Resolver\ContextInterface;
use Magento\Framework\GraphQl\Query\Resolver\Value;
use Magento\Framework\GraphQl\Query\ResolverInterface;
use Magento\Framework\GraphQl\Schema\Type\ResolveInfo;
use Magento\Framework\Stdlib\DateTime\DateTime;
use Magento\Rma\Api\Data\RmaInterface;
use Magento\Rma\Helper\Data;
use Magento\Rma\Model\Rma;
use Magento\Rma\Model\Rma\Source\Status;
use Magento\Rma\Model\Rma\Status\HistoryFactory;
use Magento\Rma\Model\RmaFactory;
use Magento\Sales\Model\Order;
use Magento\Sales\Model\OrderRepository;

class CreateNewRequest implements ResolverInterface
{
    /**
     * @var RmaFactory
     */
    protected $rmaModelFactory;

    /**
     * @var OrderRepository
     */
    protected $orderRepository;

    /**
     * @var DateTime
     */
    protected $dateTime;

    /**
     * @var HistoryFactory
     */
    protected $statusHistoryFactory;

    /**
     * @var Data
     */
    protected $rmaHelper;

    /**
     * CreateNewRequest constructor.
     *
     * @param RmaFactory $rmaModelFactory
     * @param OrderRepository $orderRepository
     * @param DateTime $dateTime
     * @param HistoryFactory $statusHistoryFactory
     * @param Data $rmaHelper
     */
    public function __construct(
        RmaFactory $rmaModelFactory,
        OrderRepository $orderRepository,
        DateTime $dateTime,
        HistoryFactory $statusHistoryFactory,
        Data $rmaHelper
    )
    {
        $this->rmaModelFactory = $rmaModelFactory;
        $this->orderRepository = $orderRepository;
        $this->dateTime = $dateTime;
        $this->statusHistoryFactory = $statusHistoryFactory;
        $this->rmaHelper = $rmaHelper;
    }

    /**
     * @param Field $field
     * @param ContextInterface $context
     * @param ResolveInfo $info
     * @param array|null $value
     * @param array|null $args
     *
     * @return array|Value|mixed
     * @throws GraphQlInputException
     * @throws Exception
     */
    public function resolve(
        Field $field,
        $context,
        ResolveInfo $info,
        array $value = null,
        array $args = null
    )
    {
        $input = $args['input'];
        $orderId = $input['order_id'];

        if (empty($orderId)) {
            throw new GraphQlInputException(__('Order ID is missing.'));
        }

        if (!$this->rmaHelper->canCreateRma($orderId)) {
            throw new Exception('Return cannot be created.');
        }

        /** @var Order $order */
        $order = $this->orderRepository->get($orderId);
        $customerId = $context->getUserId();

        if (!$this->canViewOrder($customerId, $order)) {
            throw new Exception('Return cannot be created.');
        }

        /** @var Rma $rmaObject */
        $rmaObject = $this->buildRma($order);
        $saveRmaResult = $rmaObject->saveRma($input);

        if (!$saveRmaResult) {
            throw new LocalizedException(__('Something went wrong, please try again later'));
        }

        $statusHistory = $this->statusHistoryFactory->create();
        $statusHistory->setRmaEntityId($rmaObject->getEntityId());
        $statusHistory->sendNewRmaEmail();
        $statusHistory->saveSystemComment();

        if (isset($input['message']) && !empty($input['message'])) {
            $comment = $this->statusHistoryFactory->create();
            $comment->setRmaEntityId($rmaObject->getEntityId());
            $comment->saveComment($input['message'], true, false);
        }

        return [
            'return_id' => $rmaObject->getEntityId()
        ];
    }

    /**
     * Triggers save order and create history comment process
     *
     * @param Order $order
     *
     * @return RmaInterface
     */
    protected function buildRma(Order $order): RmaInterface
    {
        $rmaModel = $this->rmaModelFactory->create();

        $rmaModel->setData([
            'status' => Status::STATE_PENDING,
            'date_requested' => $this->dateTime->gmtDate(),
            'order_id' => $order->getId(),
            'order_increment_id' => $order->getIncrementId(),
            'store_id' => $order->getStoreId(),
            'customer_id' => $order->getCustomerId(),
            'order_date' => $order->getCreatedAt(),
            'customer_name' => $order->getCustomerName(),
            'customer_custom_email' => $order->getCustomerEmail(),
        ]);

        return $rmaModel;
    }

    /**
     * Check order view availability
     *
     * @param $customerId
     * @param Rma|Order $item
     *
     * @return bool
     */
    protected function canViewOrder($customerId, $item)
    {
        return $item->getId() && $customerId && $item->getCustomerId() == $customerId;
    }
}
