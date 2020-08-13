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


import { GET_RETURN_LIST, SET_LOADING } from './Return.action';

export const initialState = {
    isLoading: false,
    returnList: []
};

/** @namespace ScandiPWA/RmaGraphQl/Store/Return/Reducer/returnReducer */
export const ReturnReducer = (state = initialState, action) => {
    const { type } = action;

    switch (type) {
    case GET_RETURN_LIST:
        const { data } = action;

        return {
            ...state,
            returnList: data
        };
    case SET_LOADING:
        const { is } = action;

        return {
            ...state,
            isLoading: is
        };
    default:
        return state;
    }
};

export default ReturnReducer;
