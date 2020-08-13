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

import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { getFormattedDate } from 'Store/Order/Order.reducer';

import './MyAccountReturnTableRow.style';

/** @namespace ScandiPWA/RmaGraphQl/Component/MyAccountReturnTableRow/Component */
export class MyAccountReturnTableRow extends PureComponent {
    /**
     * Prop types
     * @type {*}
     */
    static propTypes = {
        onViewClick: PropTypes.func.isRequired,
        row: PropTypes.object.isRequired
    };

    /**
     * Render
     * @returns {*}
     */
    render() {
        const {
            row: {
                increment_id,
                date_requested,
                customer_name,
                status
            },
            onViewClick
        } = this.props;

        return (
            <tr onClick={ onViewClick } block="MyAccountReturnTableRow">
                <td>{ increment_id }</td>
                <td block="hidden-mobile">{ getFormattedDate(date_requested) }</td>
                <td block="hidden-mobile">{ customer_name }</td>
                <td>{ status }</td>
            </tr>
        );
    }
}

export default MyAccountReturnTableRow;
