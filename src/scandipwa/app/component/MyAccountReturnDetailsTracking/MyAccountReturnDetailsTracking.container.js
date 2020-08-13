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

import React from 'react';
import PropTypes from 'prop-types';

import DataContainer from 'Util/Request/DataContainer';
import MyAccountReturnDetailsTracking from './MyAccountReturnDetailsTracking.component';

/** @namespace ScandiPWA/RmaGraphQl/Component/MyAccountReturnDetailsTracking/Container */
export class MyAccountReturnDetailsTrackingContainer extends DataContainer {
    /**
     * Prop types
     * @type {*}
     */
    static propTypes = {
        tracking: PropTypes.array.isRequired
    };

    /**
     * Remder
     * @returns {*}
     */
    render() {
        return (
            <MyAccountReturnDetailsTracking
              { ...this.props }
            />
        );
    }
}

export default MyAccountReturnDetailsTrackingContainer;
