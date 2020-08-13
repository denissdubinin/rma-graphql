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

import Loader from 'Component/Loader';
import Field from 'Component/Field';
import MyAccountNewReturnCustomerTable from '../MyAccountNewReturnCustomerTable';
import MyAccountNewReturnAddressTable from '../MyAccountNewReturnAddressTable';
import MyAccountNewReturnItemSelect from '../MyAccountNewReturnItemSelect';

import './MyAccountNewReturn.style';

export default class MyAccountNewReturn extends PureComponent {
    static propTypes = {
        shippingAddress: PropTypes.object,
        reasonData: PropTypes.object.isRequired,
        onNewRequestSubmit: PropTypes.func.isRequired,
        orderId: PropTypes.string.isRequired,
        history: PropTypes.object.isRequired,
        isLoading: PropTypes.bool.isRequired,
        renderPageTitle: PropTypes.func.isRequired,
        items: PropTypes.array.isRequired,
        createdAt: PropTypes.string.isRequired
    };

    static defaultProps = {
        shippingAddress: {}
    };


    state = {
        selectedItems: {},
        hasItemsError: false,
        messageText: ''
    };

    handleSelectedItemsChange = (selectedItems) => {
        this.setState({ selectedItems });
    };

    handleRequestSubmitPress = async () => {
        const { orderId, onNewRequestSubmit } = this.props;
        const { selectedItems, messageText } = this.state;

        if (!Object.keys(selectedItems).length) {
            return;
        }

        const isAllFilled = !Object.values(selectedItems).find(selectedItem => (
            Object.values(selectedItem).find(item => !item) !== undefined
        ));

        if (!isAllFilled) {
            this.setState({ hasItemsError: true });
            return;
        }

        onNewRequestSubmit({
            items: selectedItems,
            order_id: orderId,
            message: messageText
        });
    };

    handleBackPress = () => {
        const { history } = this.props;

        history.goBack();
    };

    handleTextAreaChange = (value) => {
        this.setState({ messageText: value });
    };

    isButtonEnabled() {
        const { selectedItems } = this.state;
        const isSubmitDisabled = !Object.keys(selectedItems).length;

        return isSubmitDisabled;
    }

    renderActions() {
        return (
            <div
              block="MyAccountNewReturn"
              elem="Actions"
            >
                <button
                  block="Button"
                  onClick={ this.handleRequestSubmitPress }
                  disabled={ this.isButtonEnabled() }
                >
                    { __('Submit request') }
                </button>
                <button
                  block="Button"
                  mods={ { isHollow: true } }
                  onClick={ this.handleBackPress }
                >
                    { __('Cancel') }
                </button>
            </div>
        );
    }

    renderLoader() {
        const { isLoading } = this.props;
        return <Loader isLoading={ isLoading } />;
    }

    renderMessageTextArea() {
        const { messageText } = this.state;

        return (
            <Field
              type="textarea"
              placeholder="Please describe your issue in details."
              id="message"
              name="message"
              mix={ {
                  block: 'MyAccountNewReturn',
                  elem: 'MessageTextArea'
              } }
              value={ messageText }
              onChange={ this.handleTextAreaChange }
            />
        );
    }

    renderMessageSection() {
        return (
            <div>
                <h4
                  block="MyAccountNewReturn"
                  elem="MessageTitle"
                >
                    { __('Message:') }
                </h4>
                { this.renderMessageTextArea() }
            </div>
        );
    }

    render() {
        const {
            reasonData,
            items,
            createdAt,
            renderPageTitle,
            orderId = '',
            shippingAddress
        } = this.props;
        const { hasItemsError } = this.state;

        return (
            <div block="MyAccountNewReturn">
                { this.renderLoader() }
                { renderPageTitle(orderId) }
                <div
                  block="MyAccountNewReturn"
                  elem="CustomerAndAddressBlocks"
                >
                    <MyAccountNewReturnCustomerTable />
                    <MyAccountNewReturnAddressTable address={ shippingAddress } />
                </div>
                <MyAccountNewReturnItemSelect
                  onItemChange={ this.handleSelectedItemsChange }
                  reasonData={ reasonData }
                  items={ items }
                  hasError={ hasItemsError }
                  createdAt={ createdAt }
                />
                { this.renderMessageSection() }
                { this.renderActions() }
            </div>
        );
    }
}
