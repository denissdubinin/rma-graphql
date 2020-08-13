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
import { connect } from 'react-redux';

import MyAccountNewReturnCustomerTable from './MyAccountNewReturnCustomerTable.component';

/** @namespace ScandiPWA/RmaGraphQl/Component/MyAccountNewReturnCustomerTable/Container/mapStateToProps */
export const mapStateToProps = state => ({
    customer: state.MyAccountReducer.customer
});

/** @namespace ScandiPWA/RmaGraphQl/Component/MyAccountNewReturnCustomerTable/Container */
export class MyAccountNewReturnCustomerTableContainer extends PureComponent {
    render() {
        return (
            <MyAccountNewReturnCustomerTable
              { ...this.props }
              title={ __('My profile') }
            />
        );
    }
}

export default connect(mapStateToProps, null)(MyAccountNewReturnCustomerTableContainer);
