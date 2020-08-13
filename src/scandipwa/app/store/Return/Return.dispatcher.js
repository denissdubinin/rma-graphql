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

import { fetchQuery, fetchMutation } from 'Util/Request';
import { showNotification } from 'Store/Notification';
import { getReturnList, setLoading } from './Return.action';
import ProductReturnQuery from '../../query/ProductReturn.query';

/** @namespace ScandiPWA/RmaGraphQl/Store/Return/Dispatcher */
export class ReturnDispatcher {
    /**
     * Request returns
     * @param dispatch
     * @returns {*}
     */
    requestReturns(dispatch) {
        const query = ProductReturnQuery.getReturnList();
        dispatch(setLoading(true));

        return fetchQuery(query).then(
            /** @namespace ScandiPWA/RmaGraphQl/Store/Return/Dispatcher/fetchQueryThen */
            ({ getReturnList: orders }) => {
                dispatch(setLoading(false));
                dispatch(getReturnList(orders, false));
            },
            /** @namespace ScandiPWA/RmaGraphQl/Store/Return/Dispatcher/fetchQueryThen */
            (error) => {
                dispatch(setLoading(false));
                dispatch(showNotification('error', error[0].message));
            }
        );
    }

    /**
     * Send comment
     * @param request_id
     * @param comment
     * @returns {*}
     */
    sendComment(request_id, comment = '') {
        const mutation = ProductReturnQuery.sendRmaComment({ request_id, comment });

        return fetchMutation(mutation);
    }
}

export default new ReturnDispatcher();
