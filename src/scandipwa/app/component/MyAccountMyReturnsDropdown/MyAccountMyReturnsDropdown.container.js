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

import { ordersType } from 'Type/Account';
import MyAccountMyReturnsDropdown from './MyAccountMyReturnsDropdown.component';

/** @namespace ScandiPWA/RmaGraphQl/Component/MyAccountMyReturnsDropdown/Container */
export class MyAccountMyReturnsDropdownContainer extends PureComponent {
    static propTypes = {
        orderList: ordersType.isRequired
    };

    containerProps = () => ({
        selectOptions: this._getSelectOptions()
    });

    _getSelectOptions() {
        const { orderList } = this.props;

        return orderList.reduce(
            (list, order) => {
                const {
                    base_order_info: {
                        id,
                        increment_id,
                        created_at,
                        status_can_be_returned
                    }
                } = order;

                if (!status_can_be_returned) {
                    return list;
                }

                list.push({
                    id,
                    value: id,
                    label: `Order #${ increment_id } - ${ created_at }`
                });

                return list;
            }, []
        );
    }

    render() {
        return (
            <MyAccountMyReturnsDropdown
              { ...this.props }
              { ...this.containerProps() }
            />
        );
    }
}

export default MyAccountMyReturnsDropdownContainer;
