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

import {
    MyAccountNewReturnItemSelectContainer as SourceMyAccountNewReturnItemSelectContainer
} from '../MyAccountNewReturnItemSelect/MyAccountNewReturnItemSelect.container';
import MyAccountReturnDetailsItems from './MyAccountReturnDetailsItems.component';

/** @namespace ScandiPWA/RmaGraphQl/Component/MyAccountReturnDetailsItems/Container */
export class MyAccountReturnDetailsItemsContainer extends SourceMyAccountNewReturnItemSelectContainer {
    /**
     * Render
     * @returns {*}
     */
    render() {
        return (
            <MyAccountReturnDetailsItems
              { ...this.props }
              { ...this.containerFunctions }
            />
        );
    }
}

export default MyAccountReturnDetailsItemsContainer;
