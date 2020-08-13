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


import { Field } from 'Util/Query';
import { OrderQuery, ProductListQuery } from 'Query';

/** @namespace ScandiPWA/RmaGraphQl/Query */
export class ProductReturnQuery {
    /**
     * Get return list fields
     * @returns {*}
     */
    getReturnList() {
        return new Field('getReturnList')
            .addField('customer_id')
            .addField('customer_name')
            .addField('date_requested')
            .addField('entity_id')
            .addField('increment_id')
            .addField('order_date')
            .addField('order_increment_id')
            .addField('status')
            .addField('store_id');
    }

    /**
     * Get RMA configuration fields
     */
    getRmaConfiguration() {
        return new Field('getRmaConfiguration')
            .addField(this._getReturnReasonsFields())
            .addField(this._getItemConditionsFields())
            .addField(this._getItemResolutionsFields());
    }

    /**
     * Get return reasons fields
     * @returns {*}
     * @private
     */
    _getReturnReasonsFields() {
        return new Field('reasons')
            .addField('label')
            .addField('value');
    }

    /**
     * Get item conditions fields
     * @returns {*}
     * @private
     */
    _getItemConditionsFields() {
        return new Field('conditions')
            .addField('label')
            .addField('value');
    }

    /**
     * Get item resolutions fields
     * @returns {*}
     * @private
     */
    _getItemResolutionsFields() {
        return new Field('resolutions')
            .addField('label')
            .addField('value');
    }

    /**
     * Get new return mutation
     * @param options
     * @returns {*}
     */
    getNewReturnMutation(options) {
        return new Field('createReturnRequest')
            .addArgument('input', 'CreateReturnInput!', options)
            .addField('return_id');
    }

    /**
     * Get return tracking info fields
     * @param input
     * @returns {*}
     */
    getReturnTrackingInfo(input) {
        return new Field('addTrackingToRequest')
            .addArgument('input', 'AddTrackingInput!', input)
            .addField('success');
    }

    /**
     * Get return details fields
     * @param returnId
     * @returns {*}
     */
    getReturnDetails(returnId) {
        return new Field('getReturnDetailsById')
            .addArgument('return_id', 'Int!', returnId)
            .addField(this._getReturnShippingInfoFields())
            .addField(this._getReturnCommentsField())
            .addField(this._getReturnItemFields())
            .addField('date_requested')
            .addField('entity_id')
            .addField('increment_id')
            .addField('order_id')
            .addField('order_increment_id')
            .addField('status');
    }

    /**
     * Get return shipping info fields
     * @returns {*}
     * @private
     */
    _getReturnShippingInfoFields() {
        return new Field('shipping_info')
            .addField(OrderQuery._prepareOrderCustomerAddressInfo())
            .addField(this._getReturnTrackingFields());
    }

    /**
     * Get return tracking info fields
     * @returns {*}
     * @private
     */
    _getReturnTrackingFields() {
        return new Field('tracking')
            .addField('carrier_title')
            .addField('track_number');
    }

    /**
     * Get return comments field
     * @returns {*}
     * @private
     */
    _getReturnCommentsField() {
        return new Field('comments')
            .addFieldList(this._getReturnCommentsFields());
    }

    /**
     * Get return comments fields
     * @returns {string[]}
     * @private
     */
    _getReturnCommentsFields() {
        return [
            'comment',
            'created_at',
            'is_admin'
        ];
    }

    /**
     * Get return item fields
     * @returns {*}
     * @private
     */
    _getReturnItemFields() {
        return new Field('items')
            .addField(this._getReturnProductFields())
            .addField('condition')
            .addField('entity_id')
            .addField('is_qty_decimal')
            .addField('order_item_id')
            .addField('product_name')
            .addField('product_sku')
            .addField('product_options')
            .addField('qty_approved')
            .addField('qty_authorized')
            .addField('qty_requested')
            .addField('qty_returned')
            .addField('reason')
            .addField('resolution')
            .addField('rma_entity_id')
            .addField('status');
    }

    /**
     * Get return product fields
     * @returns {*}
     * @private
     */
    _getReturnProductFields() {
        return new Field('order_products')
            .addFieldList(ProductListQuery._getProductInterfaceFields(false, false));
    }

    /**
     * Get send rma comment fields
     * @param input
     * @returns {*}
     */
    sendRmaComment(input) {
        return new Field('sendRmaComment')
            .addArgument('input', 'SendRmaCommentInput!', input)
            .addFieldList(this._getReturnCommentsFields());
    }
}

export default new ProductReturnQuery();
