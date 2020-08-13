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
import MyAccountMyReturnsDropdown from '../MyAccountMyReturnsDropdown';
import MyAccountReturnTableRow from '../MyAccountReturnTableRow';

import './MyAccountMyReturns.style';

/** @namespace ScandiPWA/RmaGraphQl/Component/MyAccountMyReturns/Component */
export class MyAccountMyReturns extends PureComponent {
    static propTypes = {
        handleReturnClick: PropTypes.func.isRequired,
        handleReturnItemClick: PropTypes.func.isRequired,
        returnList: PropTypes.array.isRequired,
        areReturnsLoading: PropTypes.bool.isRequired,
        renderPageTitle: PropTypes.func.isRequired
    };

    state = {
        selectedOrderId: ''
    };

    handleDropdownChange = (id) => {
        this.setState({ selectedOrderId: id });
    };

    handleReturnClick = () => {
        const { handleReturnClick } = this.props;
        const { selectedOrderId } = this.state;

        handleReturnClick(selectedOrderId);
    };

    renderNew() {
        const { selectedOrderId } = this.state;

        return (
            <div block="MyAccountMyReturns" elem="New">
                <p>{ __('Create new return request:') }</p>
                <div block="MyAccountMyReturns" elem="DropdownWrapper">
                    <MyAccountMyReturnsDropdown
                      { ...this.props }
                      onSelectChange={ this.handleDropdownChange }
                    />
                    <button
                      block="Button"
                      onClick={ this.handleReturnClick }
                      disabled={ !selectedOrderId }
                    >
                        { __('Return') }
                    </button>
                </div>
            </div>
        );
    }

    renderTable() {
        const { returnList, areReturnsLoading } = this.props;

        if (areReturnsLoading) {
            return null;
        }

        if (!areReturnsLoading && !returnList.length) {
            return this.renderNoReturns();
        }

        return (
            <table block="MyAccountMyOrders" elem="Table">
                <thead>
                <tr>
                    <th>{ __('Return #') }</th>
                    <th block="hidden-mobile">{ __('Date') }</th>
                    <th block="hidden-mobile">{ __('Ship From') }</th>
                    <th>{ __('Return Status') }</th>
                </tr>
                </thead>
                <tbody>
                { this.renderReturnsList() }
                </tbody>
            </table>
        );
    }

    renderReturnRow = (row) => {
        const { handleReturnItemClick } = this.props;
        const { entity_id } = row;

        return (
            <MyAccountReturnTableRow
              key={ entity_id }
              row={ row }
              /* eslint-disable-next-line react/jsx-no-bind */
              onClick={ () => handleReturnItemClick(entity_id) }
            />
        );
    };

    renderReturnsList() {
        const { returnList } = this.props;

        const returns = returnList.length
            ? returnList
            : Array.from({ length: 10 }, (_, id) => ({ base_order_info: { id } }));

        return returns.reduceRight(
            (acc, e) => [...acc, this.renderReturnRow(e)],
            []
        );
    }

    renderNoReturns() {
        return (
            <div block="MyAccountMyReturns" elem="NoReturns">
                { __('You have no returns.') }
            </div>
        );
    }

    render() {
        const { areReturnsLoading, renderPageTitle } = this.props;

        return (
            <div block="MyAccountMyReturns">
                { renderPageTitle() }
                <Loader isLoading={ areReturnsLoading } />
                { this.renderNew() }
                { this.renderTable() }
            </div>
        );
    }
}

export default MyAccountMyReturns;
