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

import { MY_RETURN, NEW_RETURN, RETURN_DETAILS } from '../Rma/Rma';

/**
 * Get active page code
 * @param pathname
 * @returns {string}
 * @namespace ScandiPWA/RmaGraphQl/Util/Url/getActivePage
 */
export const getActivePage = (pathname) => {
    const pathNameIndex = 3;
    const url = pathname.split('/')[pathNameIndex];

    if (!url) {
        return MY_RETURN;
    }
    if (url.split('&')[0] === 'new-return') {
        return NEW_RETURN;
    }

    return RETURN_DETAILS;
};

export default getActivePage;
