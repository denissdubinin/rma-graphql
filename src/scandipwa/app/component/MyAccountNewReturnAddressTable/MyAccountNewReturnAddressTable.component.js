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

import MyAccountAddressTable from 'Component/MyAccountAddressTable/MyAccountAddressTable.container';

export default class MyAccountNewReturnAddressTable extends PureComponent {
    static propTypes = {
        address: PropTypes.object
    };

    static defaultProps = {
        address: {}
    };

    render() {
        const { address } = this.props;

        return (
            <div
              block="MyAccountDashboard"
              elem="DefaultAddress"
            >
                { address && Object.keys(address).length && (
                    <MyAccountAddressTable
                      address={ address }
                      showAdditionalFields
                      title={ __('Order shipping address') }
                    />
                ) }
            </div>
        );
    }
}
