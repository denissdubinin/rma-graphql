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

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import Image from 'Component/Image';
import Field from 'Component/Field';
import TextPlaceholder from 'Component/TextPlaceholder';

import './MyAccountNewReturnItemSelect.style';

export default class MyAccountNewReturnItemSelect extends PureComponent {
    static propTypes = {
        items: PropTypes.array.isRequired,
        onItemChange: PropTypes.func.isRequired,
        reasonData: PropTypes.object.isRequired,
        hasError: PropTypes.bool.isRequired
    };

    state = {
        selectedItems: {}
    };

    handleItemSelect = (isChecked, id) => {
        const { onItemChange } = this.props;
        const { selectedItems: items } = this.state;
        const selectedItems = { ...items };

        if (isChecked) {
            const index = selectedItems.indexOf(id);
            if (index > -1) {
                selectedItems.splice(index, 1);
            }
        } else {
            selectedItems[id] = {
                order_item_id: id,
                qty_requested: 0
            };
        }

        this.setState({ selectedItems });
        onItemChange(selectedItems);
    };

    handleReasonBlockSelect(blockId, key, id) {
        const { onItemChange } = this.props;
        const {
            selectedItems: items,
            selectedItems: { [id]: selectedItem }
        } = this.state;

        const selectedItems = {
            ...items,
            [id]: {
                ...selectedItem,
                [key]: blockId
            }
        };

        this.setState({ selectedItems });
        onItemChange(selectedItems);
    }

    handleQtyChange(qty, id) {
        const { onItemChange } = this.props;
        const {
            selectedItems: items,
            selectedItems: { [id]: selectedItem }
        } = this.state;

        const selectedItems = {
            ...items,
            [id]: {
                ...selectedItem,
                qty_requested: qty
            }
        };

        this.setState({ selectedItems });
        onItemChange(selectedItems);
    }

    renderImage({ name, thumbnail: { url: thumbnailUrl }, small_image: { url: small_imageUrl } }) {
        return (
            <>
                <Image
                  src={ thumbnailUrl }
                  mix={ {
                      block: 'CartItem',
                      elem: 'Picture'
                  } }
                  ratio="custom"
                  alt={ `Product ${ name } thumbnail.` }
                />
                <img
                  style={ { display: 'none' } }
                  alt={ name }
                  src={ small_imageUrl }
                  itemProp="image"
                />
            </>
        );
    }

    renderItemDetails(item) {
        const { name, attributes } = item;

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
                <div
                  block="MyAccountReturnDetailsItems"
                  elem="ItemAttributes"
                >
                    { this.renderAttributes(attributes) }
                </div>
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

    renderReasonBlockSelect(title, options, key, id) {
        const { hasError } = this.props;
        const { selectedItems: { [id]: item } } = this.state;
        const value = item[key] || '';
        const message = (hasError && !value) ? __('Select field!') : '';

        return (
            <div
              block="MyAccountNewReturnItemSelect"
              elem="SelectWrapper"
            >
                <span
                  block="MyAccountNewReturnItemSelect"
                  elem="SelectTitle"
                >
                    { title }
                </span>
                <Field
                  id={ title }
                  name={ title }
                  type="select"
                  placeholder={ __('Choose %s', title.toLowerCase()) }
                  mix={ {
                      block: 'MyAccountNewReturnItemSelect',
                      elem: 'SelectInput'
                  } }
                  message={ message }
                  selectOptions={ options }
                  value={ value }
                  /* eslint-disable-next-line react/jsx-no-bind */
                  onChange={ blockId => this.handleReasonBlockSelect(blockId, key, id) }
                />
            </div>
        );
    }

    renderReasonBlockQty(id, orderedQty) {
        const { hasError } = this.props;
        const { selectedItems: { [id]: { qty_requested } } } = this.state;
        const message = (hasError && !qty_requested) ? __('Choose qty!') : '';

        return (
            <div
              key={ id }
              block="MyAccountNewReturnItemSelect"
              elem="QtyBlockWrapper"
            >
                <span>
                    { __('Return Qty:') }
                    &nbsp;
                </span>
                <Field
                  id="item_qty"
                  name="item_qty"
                  type="number"
                  isControlled
                  min={ 0 }
                  message={ message }
                  max={ orderedQty }
                  value={ qty_requested }
                  /* eslint-disable-next-line react/jsx-no-bind */
                  onChange={ qty => this.handleQtyChange(qty, id) }
                />
                <span>{ ` / ${ orderedQty }` }</span>
            </div>
        );
    }

    renderReasonBlockRules() {
        return (
            <span
              block="MyAccountNewReturnItemSelect"
              elem="ReasonBlockRuleTitle"
            >
                { __('The return for this product can’t be processed.') }
            </span>
        );
    }

    renderReasonBlockInputs(id, qty_available_to_return) {
        const { reasonData: { reasons, conditions, resolutions } } = this.props;

        return (
            <>
                { this.renderReasonBlockQty(id, qty_available_to_return) }
                { this.renderReasonBlockSelect(__('Return Reason'), reasons, 'reason', id) }
                { this.renderReasonBlockSelect(__('Item Condition'), conditions, 'condition', id) }
                { this.renderReasonBlockSelect(__('Return Resolution'), resolutions, 'resolution', id) }
            </>
        );
    }

    renderReasonBlock(item, id, isChecked, isDisabled) {
        const { id: itemId, qty_available_to_return } = item;

        if (!isChecked && !isDisabled) {
            return null;
        }

        return (
            <div
              key={ itemId }
              block="MyAccountNewReturnItemSelect"
              elem="ReasonBlockWrapper"
              mods={ { isRulesBlock: isDisabled } }
            >
                { isDisabled
                    ? this.renderReasonBlockRules()
                    : this.renderReasonBlockInputs(id, qty_available_to_return, item) }
            </div>
        );
    }

    renderItemField(item, id, isChecked, isDisabled) {
        return (
            <div
              key={ id }
              block="MyAccountNewReturnItemSelect"
              elem="ItemInnerWrapper"
            >
                <figure block="CartItem" elem="Wrapper">
                    { this.renderImage(item) }
                    <figcaption
                      block="CartItem"
                      elem="Content"
                    >
                        { this.renderItemDetails(item) }
                    </figcaption>
                </figure>
                <Field
                  id={ `${ id }` }
                  name={ `${ id }` }
                  value={ id }
                  type="checkbox"
                  mix={ {
                      block: 'MyAccountNewReturnItemSelect',
                      elem: 'ItemField',
                      mods: { isDisabled }
                  } }
                  isDisabled={ isDisabled }
                  checked={ isChecked }
                  /* eslint-disable-next-line react/jsx-no-bind */
                  onChange={ () => this.handleItemSelect(isChecked, id, isDisabled) }
                />
            </div>
        );
    }

    renderItem = (item, index) => {
        const { selectedItems } = this.state;
        const { order_item_id, qty_available_to_return } = item;

        const id = parseInt(order_item_id, 10);
        const isChecked = !!selectedItems[id];
        const isDisabled = qty_available_to_return === 0;

        return (
            <div
              block="MyAccountNewReturnItemSelect"
              elem="ItemWrapper"
              key={ index }
            >
                { this.renderItemField(item, id, isChecked, isDisabled) }
                { this.renderReasonBlock(item, id, isChecked, isDisabled) }
            </div>
        );
    };

    renderItems() {
        const { items } = this.props;

        if (!items.length) {
            return (
                <>
                    <TextPlaceholder
                      mix={ {
                          block: 'MyAccountNewReturnItemSelect',
                          elem: 'ItemImagePlaceholder'
                      } }
                    />
                    <TextPlaceholder />
                </>
            );
        }

        return (
            <div>
                { items.map((item, index) => this.renderItem(item, index)) }
            </div>
        );
    }

    renderTitle() {
        return (
            <h4
              block="MyAccountNewReturnItemSelect"
              elem="Title"
            >
                { __('Choose Items:') }
            </h4>
        );
    }

    render() {
        return (
            <div block="MyAccountNewReturnItemSelect">
                { this.renderTitle() }
                { this.renderItems() }
            </div>
        );
    }
}
