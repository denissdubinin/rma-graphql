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

declare(strict_types=1);

namespace ScandiPWA\RmaGraphQl\Model\Resolver;

use Magento\Framework\Exception\LocalizedException;
use Magento\Framework\GraphQl\Config\Element\Field;
use Magento\Framework\GraphQl\Query\Resolver\ContextInterface;
use Magento\Framework\GraphQl\Query\Resolver\Value;
use Magento\Framework\GraphQl\Schema\Type\ResolveInfo;
use Magento\Framework\GraphQl\Query\ResolverInterface;
use Magento\Rma\Api\RmaRepositoryInterface;
use Magento\Rma\Model\Rma\Status\HistoryFactory;

class SendRmaComment implements ResolverInterface
{
    /**
     * @var RmaRepositoryInterface
     */
    protected $rmaRepository;

    /**
     * @var HistoryFactory
     */
    protected $statusHistoryFactory;

    /**
     * SendMessage constructor.
     *
     * @param RmaRepositoryInterface $rmaRepository
     * @param HistoryFactory $statusHistoryFactory
     */
    public function __construct(
        RmaRepositoryInterface $rmaRepository,
        HistoryFactory $statusHistoryFactory
    )
    {
        $this->rmaRepository = $rmaRepository;
        $this->statusHistoryFactory = $statusHistoryFactory;
    }

    /**
     * @param Field $field
     * @param ContextInterface $context
     * @param ResolveInfo $info
     * @param array|null $value
     * @param array|null $args
     *
     * @return array|Value|mixed
     * @throws LocalizedException
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
        $rma = $this->rmaRepository->get($input['request_id']);

        if (!$rma) {
            throw new LocalizedException('Return is not found.');
        }

        $comment = trim(strip_tags($input['comment']));

        if (empty($comment)) {
            throw new LocalizedException(__('Please enter a valid message.'));
        }

        $statusHistory = $this->statusHistoryFactory->create();
        $statusHistory->setRmaEntityId($rma->getId());
        $statusHistory->setComment($comment);
        $statusHistory->sendCustomerCommentEmail();
        $statusHistory->saveComment($comment, true, false);

        // As it returns 'false' string, on FE we expect it as '0' string.
        $statusHistory->setIsAdmin('0');

        return $statusHistory;
    }
}
