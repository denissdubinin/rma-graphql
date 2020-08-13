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

import PropTypes from 'prop-types';

import MyAccountMyReturns from '../../component/MyAccountMyReturns/MyAccountMyReturns.container';

export const MY_RETURNS = 'my-returns';

export class MyAccountComponentPlugin {
    /**
     * Render map
     * @param originalMember
     * @returns {*}
     */
    aroundRenderMap = originalMember => ({
        ...originalMember,
        [MY_RETURNS]: MyAccountMyReturns
    });

    /**
     * PropTypes
     * TODO: Stopped working since SPWAv3beta4
     * @param originalMember
     * @returns {*}
     */
    aroundPropTypes = originalMember => ({
        ...originalMember,
        activeTab: PropTypes.oneOfType([
            originalMember.activeTab,
            PropTypes.oneOf([MY_RETURNS])
        ])
    });
}


export const { aroundRenderMap, aroundPropTypes } = new MyAccountComponentPlugin();


export default {
    'Route/MyAccount/Component': {
        'member-property': {
            renderMap: [
                {
                    position: 100,
                    implementation: aroundRenderMap
                }
            ]
        },
        'static-member': {
            propTypes: [
                {
                    position: 100,
                    implementation: aroundPropTypes
                }
            ]
        }
    },
    'Component/MyAccountTabList/Component': {
        'static-member': {
            propTypes: [
                {
                    position: 100,
                    implementation: aroundPropTypes
                }
            ]
        }
    }
};
