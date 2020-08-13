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

import MyAccountNewReturnCustomerTable from '../MyAccountNewReturnCustomerTable';
import MyAccountNewReturnAddressTable from '../MyAccountNewReturnAddressTable';
import MyAccountReturnDetailsItems from '../MyAccountReturnDetailsItems';
import MyAccountReturnDetailsTracking from '../MyAccountReturnDetailsTracking';
import MyAccountReturnDetailsChat from '../MyAccountReturnDetailsChat';

import './MyAccountReturnDetails.style';

export default class MyAccountReturnDetails extends PureComponent {
    static propTypes = {
        shippingAddress: PropTypes.object,
        comments: PropTypes.array.isRequired,
        tracking: PropTypes.array.isRequired,
        addCommentToState: PropTypes.func.isRequired,
        renderPageTitle: PropTypes.func.isRequired,
        details: PropTypes.object.isRequired
    };

    static defaultProps = {
        shippingAddress: {}
    }

    render() {
        const {
            addCommentToState,
            comments,
            tracking,
            shippingAddress,
            renderPageTitle,
            details: {
                items = [],
                entity_id = '',
                increment_id = ''
            }
        } = this.props;

        return (
            <div block="MyAccountReturnDetails">
                { renderPageTitle(increment_id) }
                <div
                  block="MyAccountReturnDetails"
                  elem="CustomerAndAddressBlocks"
                >
                    <MyAccountNewReturnCustomerTable />
                    <MyAccountNewReturnAddressTable address={ shippingAddress } />
                </div>
                <MyAccountReturnDetailsTracking tracking={ tracking } />
                <MyAccountReturnDetailsItems items={ items } />
                { (() => (
                        <MyAccountReturnDetailsChat
                          addCommentToState={ addCommentToState }
                          comments={ comments }
                          requestId={ entity_id }
                        />
                ))() }
            </div>
        );
    }
}
