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

import { ReturnReducer } from '../../store/Return';

export class ReturnReducerPlugin {
    /**
     * Get reducers
     * @param args
     * @param callback
     * @param instance
     * @returns {*}
     */
    aroundGetReducers = (args, callback, instance) => ({
        ...callback.apply(instance, args),
        ReturnReducer
    });
}

const { aroundGetReducers } = new ReturnReducerPlugin();

export const config = {
    'Store/Index/getReducers': {
        function: [
            {
                position: 10,
                implementation: aroundGetReducers
            }
        ]
    }
};

export default config;
