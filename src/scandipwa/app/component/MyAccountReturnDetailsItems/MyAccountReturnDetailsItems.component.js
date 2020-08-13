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

import React from 'react';
import PropTypes from 'prop-types';

import MyAccountNewReturnItemSelect from '../MyAccountNewReturnItemSelect/MyAccountNewReturnItemSelect.component';
import './MyAccountReturnDetailsItems.style';

export default class MyAccountReturnDetailsItems extends MyAccountNewReturnItemSelect {
    /**
     * Prop types
     * @type {*}
     */
    static propTypes = {
        items: PropTypes.array.isRequired
    };

    /**
     * Render item details
     * @param name
     * @param qty
     * @param attributes
     * @returns {*}
     */
    renderItemDetails(name, qty, attributes) {
        return (
            <div
              block="MyAccountReturnDetailsItems"
              elem="ItemDetails"
            >
                <p
                  block="CartItem"
                  elem="Heading"
                  itemProp="name"
                >
                    { name }
                </p>
                <p block="MyAccountReturnDetailsItems" elem="Attributes">{ `Qty: ${ parseInt(qty, 10) }` }</p>
                { this.renderAttributes(attributes) }
            </div>
        );
    }

    /**
     * Render attributes
     * @param attributes
     * @returns {*}
     */
    renderAttributes(attributes) {
        return attributes.map(attribute => attribute.attribute_value && this.renderAttribute(attribute));
    }

    /**
     * Render attribute row
     * @param attribute_value
     * @param label
     * @param attribute_options
     * @returns {null|*}
     */
    renderAttribute({ attribute_value, attribute_label: label, attribute_options }) {
        if (!attribute_value) {
            return null;
        }

        return (
             <div key={ label }>
                 <span>
                     { `${ label }: ${ attribute_options.length ? attribute_options[0].label : attribute_value }` }
                 </span>
             </div>
        );
    }

    /**
     * Render item reason
     * @param title
     * @param value
     * @returns {*}
     */
    renderReasonItem(title, value) {
        return (
            <div>
                <span
                  block="MyAccountReturnDetailsItems"
                  elem="ReasonItemTitle"
                >
                    { `${ title } ` }
                </span>
                <span>{ value }</span>
            </div>
        );
    }

    /**
     * Render status block
     * @param status
     * @returns {*}
     */
    renderStatusBlock(status) {
        return (
            <span
              block="MyAccountReturnDetailsItems"
              elem="ReasonBlockStatus"
            >
                { `Item Status: ${ status }` }
            </span>
        );
    }

    /**
     * Render reason block
     * @param item
     * @returns {*}
     */
    renderReasonBlock(item) {
        const { reason, resolution, condition } = item;

        return (
            <div
              block="MyAccountReturnDetailsItems"
              elem="ReasonBlock"
            >
                { this.renderReasonItem('Return Reason:', reason) }
                { this.renderReasonItem('Items Condition:', condition) }
                { this.renderReasonItem('Return Resolution:', resolution) }
            </div>
        );
    }

    /**
     * Render item info
     * @param item
     * @returns {*}
     */
    renderItemInfo(item) {
        const {
            order_products: { 0: product },
            qty_requested,
            product_name,
            status
        } = item;

        const attributes = product ? product.attributes : [];

        return (
            <figure block="CartItem" elem="Wrapper">
                { this.renderImage(product) }
                <figcaption
                  block="CartItem"
                  elem="Content"
                >
                    { this.renderItemDetails(product_name, qty_requested, attributes) }
                    { this.renderReasonBlock(item) }
                    { this.renderStatusBlock(status) }
                </figcaption>
            </figure>
        );
    }

    /**
     * Render item
     * @param item
     * @param index
     * @returns {*}
     */
    renderItem = (item, index) => (
        <div
          block="MyAccountNewReturnItemSelect"
          elem="ItemWrapper"
          key={ index }
        >
            { this.renderItemInfo(item) }
        </div>
    );

    /**
     * Render title
     * @returns {*}
     */
    renderTitle() {
        return (
            <h4
              block="MyAccountNewReturnItemSelect"
              elem="Title"
            >
                Items
            </h4>
        );
    }

    /**
     * Render
     * @returns {*}
     */
    render() {
        return (
            <div
              block="MyAccountNewReturnItemSelect"
              mix={ {
                  block: 'MyAccountReturnDetailsItems'
              } }
            >
                { this.renderTitle() }
                { this.renderItems() }
            </div>
        );
    }
}
