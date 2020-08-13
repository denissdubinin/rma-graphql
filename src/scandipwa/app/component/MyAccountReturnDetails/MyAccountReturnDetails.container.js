/* eslint-disable react/forbid-prop-types */
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
import { connect } from 'react-redux';

import Loader from 'Component/Loader';
import { OrderDispatcher } from 'Store/Order';
import { showNotification } from 'Store/Notification';
import { fetchQuery } from 'Util/Request';
import ProductReturnQuery from '../../query/ProductReturn.query';
import MyAccountReturnDetails from './MyAccountReturnDetails.component';

/** @namespace ScandiPWA/RmaGraphQl/Component/MyAccountReturnDetails/Container/mapDispatchToProps */
export const mapDispatchToProps = dispatch => ({
    getOrderList: () => OrderDispatcher.requestOrders(dispatch),
    showNotification: (type, title, error) => dispatch(showNotification(type, title, error)),
    showSuccessNotification: message => dispatch(showNotification('success', message))
});

/** @namespace ScandiPWA/RmaGraphQl/Component/MyAccountReturnDetails/Container */
export class MyAccountReturnDetailsContainer extends PureComponent {
    static propTypes = {
        showNotification: PropTypes.func.isRequired,
        showSuccessNotification: PropTypes.func.isRequired,
        history: PropTypes.object.isRequired
    };

    state = {
        tracking: [],
        isLoading: false,
        details: {},
        comments: [],
        shippingAddress: null
    };

    componentDidMount() {
        this.requestData();
    }

    requestData() {
        const { showNotification, history: { location: { pathname } } } = this.props;

        const returnId = pathname
            .split('/')[3] // eslint-disable-line no-magic-numbers
            .split('&')[1]
            .split('=')[1];

        this.setState({
            isLoading: true
        });

        return fetchQuery([
            ProductReturnQuery.getReturnDetails(returnId)
        ])
            .then(
                /** @namespace ScandiPWA/RmaGraphQl/Component/MyAccountReturnDetails/Container/fetchQueryThen */
                ({
                    getReturnDetailsById: {
                        shipping_info: { shipping_address: shippingAddress, tracking },
                        comments
                    },
                    getReturnDetailsById
                }) => {
                    this.setState({
                        tracking,
                        isLoading: false,
                        details: getReturnDetailsById,
                        shippingAddress,
                        comments
                    });
                },
                /** @namespace ScandiPWA/RmaGraphQl/Component/MyAccountReturnDetails/Container/fetchQueryThen */
                e => showNotification('error', 'Error fetching Return Details!', e)
            );
    }

    addCommentToState = (comment) => {
        this.setState(previousState => ({
            comments: [...previousState.comments, comment]
        }));
    };

    render() {
        const { isLoading } = this.state;

        return (
            <div>
                <Loader isLoading={ isLoading } />
                <MyAccountReturnDetails
                  { ...this.state }
                  { ...this.props }
                  addCommentToState={ this.addCommentToState }
                />
            </div>
        );
    }
}

export default connect(null, mapDispatchToProps)(MyAccountReturnDetailsContainer);
