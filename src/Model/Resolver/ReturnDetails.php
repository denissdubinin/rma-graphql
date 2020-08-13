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

use Magento\Catalog\Api\ProductRepositoryInterface;
use Magento\Framework\Api\FilterBuilder;
use Magento\Framework\Api\SearchCriteriaBuilder;
use Magento\Framework\DataObject;
use Magento\Framework\GraphQl\Config\Element\Field;
use Magento\Framework\GraphQl\Query\Resolver\ContextInterface;
use Magento\Framework\GraphQl\Query\Resolver\Value;
use Magento\Framework\GraphQl\Query\ResolverInterface;
use Magento\Framework\GraphQl\Schema\Type\ResolveInfo;
use Magento\Rma\Api\CommentRepositoryInterface;
use Magento\Rma\Api\Data\CommentInterface;
use Magento\Rma\Api\Data\TrackSearchResultInterface;
use Magento\Rma\Api\RmaRepositoryInterface;
use Magento\Rma\Api\TrackRepositoryInterface;
use Magento\Rma\Helper\Eav;
use Magento\Rma\Model\ResourceModel\Item\Collection;
use Magento\Rma\Model\ResourceModel\Item\CollectionFactory;
use Magento\Rma\Model\Rma;

class ReturnDetails implements ResolverInterface
{
    /**
     * @var array
     */
    protected $options = [];

    /**
     * @var RmaRepositoryInterface
     */
    protected $rmaRepository;

    /**
     * Rma item collection
     *
     * @var CollectionFactory
     */
    protected $itemsFactory;

    /**
     * @var ProductRepositoryInterface
     */
    protected $productRepository;

    /**
     * @var Eav
     */
    protected $rmaEav;

    /**
     * Track repository
     *
     * @var TrackRepositoryInterface
     */
    protected $trackRepository;

    /**
     * @var CommentRepositoryInterface
     */
    protected $commentRepository;

    /**
     * Criteria builder
     *
     * @var SearchCriteriaBuilder
     */
    protected $criteriaBuilder;

    /**
     * Filter builder
     *
     * @var FilterBuilder
     */
    protected $filterBuilder;

    /**
     * ReturnDetails constructor.
     *
     * @param RmaRepositoryInterface $rmaRepository
     * @param CollectionFactory $itemsFactory
     * @param ProductRepositoryInterface $productRepository
     * @param Eav $rmaEav
     * @param TrackRepositoryInterface $trackRepository
     * @param CommentRepositoryInterface $commentRepository
     * @param SearchCriteriaBuilder $criteriaBuilder
     * @param FilterBuilder $filterBuilder
     */
    public function __construct(
        RmaRepositoryInterface $rmaRepository,
        CollectionFactory $itemsFactory,
        ProductRepositoryInterface $productRepository,
        Eav $rmaEav,
        TrackRepositoryInterface $trackRepository,
        CommentRepositoryInterface $commentRepository,
        SearchCriteriaBuilder $criteriaBuilder,
        FilterBuilder $filterBuilder
    )
    {
        $this->rmaRepository = $rmaRepository;
        $this->itemsFactory = $itemsFactory;
        $this->productRepository = $productRepository;
        $this->rmaEav = $rmaEav;
        $this->trackRepository = $trackRepository;
        $this->commentRepository = $commentRepository;
        $this->criteriaBuilder = $criteriaBuilder;
        $this->filterBuilder = $filterBuilder;
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
        $rmaId = $args['return_id'];

        /** @var Rma $rma */
        $rma = $this->rmaRepository->get($rmaId);

        if (!$rma) {
            return [];
        }

        /** @var $collection Collection */
        $itemsCollection = $this->itemsFactory->create()
            ->addAttributeToSelect('*')
            ->addFilter('rma_entity_id', $rmaId)
            ->getItems();

        $items = [];

        foreach ($itemsCollection as $item) {
            $product = $this->productRepository->get($item->getProductSku());

            $productIdObject = new DataObject();
            $productIdObject['product_id'] = $product->getId();

            $items[] = array_merge(
                $item->getData(),
                [
                    'products' => [$productIdObject], // We pass it to ProductResolver
                    'reason' => $this->getReturnOptionLabel('reason', $item->getReason()),
                    'condition' => $this->getReturnOptionLabel('condition', $item->getCondition()),
                    'resolution' => $this->getReturnOptionLabel('resolution', $item->getResolution()),
                ]
            );
        }

        return $rma->getData() + [
                'items' => $items,
                'shipping_info' => [
                    'tracking' => $this->getTracks($rma->getEntityId()),
                    'shipping_address' => $rma->getOrder()->getShippingAddress()->getData()
                ],
                'comments' => $this->getComments($rma->getEntityId())
            ];
    }

    /**
     * @param $attribute
     * @param $valueId
     * @return array
     */
    protected function getReturnOptionLabel($attribute, $valueId)
    {
        if (!isset($this->options[$attribute])) {
            $this->options[$attribute] = $this->rmaEav->getAttributeOptionValues($attribute);
        }

        if (!isset($this->options[$attribute][$valueId])) {
            return null;
        }

        return $this->options[$attribute][$valueId];
    }

    /**
     * @param $rmaEntityId
     * @return TrackSearchResultInterface
     */
    protected function getTracks($rmaEntityId)
    {
        $this->criteriaBuilder->addFilters(
            ['eq' => $this->filterBuilder->setField('rma_entity_id')->setValue($rmaEntityId)->create()]
        );

        return $this->trackRepository->getList($this->criteriaBuilder->create());
    }

    /**
     * Gets RMA comments.
     *
     * @param $rmaEntityId
     * @return CommentInterface[]
     */
    public function getComments($rmaEntityId): array
    {
        $criteria = $this->criteriaBuilder
            ->addFilter('rma_entity_id', $rmaEntityId)
            ->addFilter('is_visible_on_front', 1)
            ->create();

        return $this->commentRepository->getList($criteria)->getItems();
    }
}
