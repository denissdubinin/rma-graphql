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

use Magento\Framework\GraphQl\Config\Element\Field;
use Magento\Framework\GraphQl\Query\Resolver\ContextInterface;
use Magento\Framework\GraphQl\Query\Resolver\Value;
use Magento\Framework\GraphQl\Query\ResolverInterface;
use Magento\Framework\GraphQl\Schema\Type\ResolveInfo;
use Magento\Rma\Helper\Data;
use Magento\Rma\Model\ResourceModel\Rma\Grid\Collection;
use Magento\Rma\Model\ResourceModel\Rma\Grid\CollectionFactory;

class ReturnsForUser implements ResolverInterface
{
    /**
     * @var CollectionFactory
     */
    protected $rmaData;

    /**
     * @var CollectionFactory
     */
    protected $collectionFactory;

    /**
     * ReturnsForUser constructor.
     * @param Data $rmaData
     * @param CollectionFactory $collectionFactory
     */
    public function __construct(
        Data $rmaData,
        CollectionFactory $collectionFactory
    )
    {
        $this->rmaData = $rmaData;
        $this->collectionFactory = $collectionFactory;
    }

    /**
     * @param Field $field
     * @param ContextInterface $context
     * @param ResolveInfo $info
     * @param array|null $value
     * @param array|null $args
     *
     * @return array|Value|mixed
     */
    public function resolve(
        Field $field,
        $context,
        ResolveInfo $info,
        array $value = null,
        array $args = null
    )
    {
        if (!$this->rmaData->isEnabled()) {
            return [];
        }

        $userId = $context->getUserId();

        return $this->getRequestsForUser($userId);
    }

    /**
     * @param $userId
     * @return Collection
     */
    protected function getRequestsForUser($userId)
    {
        return $this->collectionFactory->create()
            ->addFieldToSelect('*')
            ->addFieldToFilter(
                'customer_id',
                $userId
            )->setOrder(
                'date_requested',
                'desc'
            );
    }
}
