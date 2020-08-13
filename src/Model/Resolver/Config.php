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
use Magento\Framework\GraphQl\Schema\Type\ResolveInfo;
use Magento\Rma\Helper\Eav;
use Magento\Store\Model\StoreManagerInterface;
use Magento\Framework\GraphQl\Query\ResolverInterface;

class Config implements ResolverInterface
{
    /**
     * @var StoreManagerInterface
     */
    protected $storeManager;

    /**
     * @var Eav
     */
    protected $rmaEav;

    /**
     * Config constructor.
     *
     * @param StoreManagerInterface $storeManager
     * @param Eav $rmaEav
     */
    public function __construct(
        StoreManagerInterface $storeManager,
        Eav $rmaEav
    )
    {
        $this->storeManager = $storeManager;
        $this->rmaEav = $rmaEav;
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
        return [
            'reasons' => $this->getReturnOptions('reason'),
            'conditions' => $this->getReturnOptions('condition'),
            'resolutions' => $this->getReturnOptions('resolution')
        ];
    }

    /**
     * @param $attribute
     * @return array
     */
    protected function getReturnOptions($attribute)
    {
        $options = [];

        foreach ($this->rmaEav->getAttributeOptionValues($attribute) as $key => $value) {
            $options[] = [
                'label' => $value,
                'value' => $key
            ];
        }

        return $options;
    }
}
