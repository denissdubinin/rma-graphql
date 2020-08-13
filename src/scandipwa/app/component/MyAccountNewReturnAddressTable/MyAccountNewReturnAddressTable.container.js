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

import MyAccountNewReturnAddressTable from './MyAccountNewReturnAddressTable.component';

/** @namespace ScandiPWA/RmaGraphQl/Component/MyAccountNewReturnAddressTable/Container */
export class MyAccountNewReturnAddressTableContainer extends PureComponent {
    static propTypes = {
        address: PropTypes.object
    };

    static defaultProps = {
        address: {}
    };

    render() {
        const { address } = this.props;

        return (
            <MyAccountNewReturnAddressTable address={ address } />
        );
    }
}

export default MyAccountNewReturnAddressTableContainer;
