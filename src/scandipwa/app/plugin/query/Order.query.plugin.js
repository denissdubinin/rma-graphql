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

export class OrderQueryPlugin {
    /**
     * Get base order info fields
     * @returns [Field]
     * @private
     */
    _aroundGetBaseOrderInfoFields = (args, callback, instance) => [
        ...callback.apply(instance, args),
        'status_can_be_returned'
    ];

    /**
     * Get order products fields
     * @returns [Field]
     * @private
     */
    _aroundGetOrderProductsFields = (args, callback, instance) => [
        ...callback.apply(instance, args),
        'order_item_id',
        'qty_available_to_return'
    ];
}

export const { _aroundGetBaseOrderInfoFields, _aroundGetOrderProductsFields } = new OrderQueryPlugin();

export default {
    'Query/Order': {
        'member-function': {
            _getBaseOrderInfoFields: [
                {
                    position: 100,
                    implementation: _aroundGetBaseOrderInfoFields
                }
            ],
            _getOrderProductsFields: [
                {
                    position: 100,
                    implementation: _aroundGetOrderProductsFields
                }
            ]
        }
    }
};
