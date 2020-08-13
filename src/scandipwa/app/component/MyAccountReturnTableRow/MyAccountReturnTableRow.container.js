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

import { orderType } from 'Type/Account';
import MyAccountReturnTableRow from './MyAccountReturnTableRow.component';

/** @namespace ScandiPWA/RmaGraphQl/Component/MyAccountReturnTableRow/Container */
export class MyAccountReturnTableRowContainer extends PureComponent {
    /**
     * Prop types
     * @type {*}
     */
    static propTypes = {
        currency_code: PropTypes.string,
        row: orderType.isRequired,
        onClick: PropTypes.func
    };

    /**
     * Default props
     * @type {*}
     */
    static defaultProps = {
        currency_code: '',
        onClick: () => {}
    };

    /**
     * Container functions
     * @type {*}
     */
    containerFunctions = {
        onViewClick: this.onViewClick.bind(this)
    };

    /**
     * On view click
     */
    onViewClick() {
        const { row, onClick } = this.props;

        onClick(row);
    }

    /**
     * Container props
     * @returns {{row, currency_code}}
     */
    containerProps = () => {
        const { row, currency_code } = this.props;
        return { row, currency_code };
    };

    /**
     * Render
     * @returns {*}
     */
    render() {
        return (
            <MyAccountReturnTableRow
              { ...this.containerProps() }
              { ...this.containerFunctions }
            />
        );
    }
}

export default MyAccountReturnTableRowContainer;
