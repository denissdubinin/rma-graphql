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

namespace ScandiPWA\RmaGraphQl\Plugin;

use Magento\Framework\GraphQl\Config\Element\Field;
use Magento\Framework\GraphQl\Schema\Type\ResolveInfo;
use Magento\Rma\Model\Item;
use Magento\Sales\Api\Data\OrderInterface;
use Magento\Sales\Api\OrderRepositoryInterface;
use ScandiPWA\QuoteGraphQl\Model\Resolver\ProductResolver;

class ProductResolverPlugin
{
    /**
     * @var null|string
     */
    protected $orderId = null;

    /**
     * @var OrderRepositoryInterface
     */
    protected $order;

    /**
     * @var Item
     */
    protected $rmaItem;

    /**
     * @param OrderInterface $order
     * @param Item $rmaItem
     */
    public function __construct(
        OrderInterface $order,
        Item $rmaItem
    )
    {
        $this->order = $order;
        $this->rmaItem = $rmaItem;
    }

    /**
     * @param ProductResolver $subject
     * @param $result
     * @param Field $field
     * @param $context
     * @param ResolveInfo $info
     * @param array|null $value
     * @param array|null $args
     * @return mixed
     */
    public function afterResolve(
        ProductResolver $subject,
        $result,
        Field $field,
        $context,
        ResolveInfo $info,
        array $value = null,
        array $args = null
    )
    {
        foreach ($result as $key => &$item) {
            if (!isset($value['products']) || !isset($value['products'][$key])) {
                continue;
            }

            $product = $value['products'][$key];

            if (!$product->getOrder()) {
                break;
            }

            if (!$this->orderId) {
                $this->orderId = $product->getOrder()->getId();
            }

            $item['qty_available_to_return'] = $this->rmaItem->getReturnableQty($this->orderId, $product->getItemId());
            $item['order_item_id'] = $product->getItemId();
        }

        return $result;
    }
}
