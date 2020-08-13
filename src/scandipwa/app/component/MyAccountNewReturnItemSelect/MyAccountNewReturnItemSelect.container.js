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

import DataContainer from 'Util/Request/DataContainer';
import MyAccountNewReturnItemSelect from './MyAccountNewReturnItemSelect.component';

/** @namespace ScandiPWA/RmaGraphQl/Component/MyAccountNewReturnItemSelect/Container */
export class MyAccountNewReturnItemSelectContainer extends DataContainer {
    containerFunctions = {
        getCurrentProduct: this.getCurrentProduct.bind(this)
    };

    getCurrentProduct() {
        const { item: { product } } = this.props;
        const variantIndex = this._getVariantIndex();

        return variantIndex < 0
            ? product
            : product.variants[variantIndex];
    }

    render() {
        return (
            <MyAccountNewReturnItemSelect
              { ...this.props }
              { ...this.containerFunctions }
            />
        );
    }
}

export default MyAccountNewReturnItemSelectContainer;
