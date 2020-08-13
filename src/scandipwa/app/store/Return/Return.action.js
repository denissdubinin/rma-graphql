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

export const GET_RETURN_LIST = 'GET_RETURN_LIST';
export const SET_LOADING = 'SET_LOADING';

/** @namespace ScandiPWA/RmaGraphQl/Store/Return/Action/getReturnList */
export const getReturnList = data => ({
    type: GET_RETURN_LIST,
    data
});

/** @namespace ScandiPWA/RmaGraphQl/Store/Return/Action/setLoading */
export const setLoading = is => ({
    type: SET_LOADING,
    is
});
