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
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { customerType } from 'Type/Account';

import './MyAccountReturnDetailsChatMessages.style';

/** @namespace ScandiPWA/RmaGraphQl/Component/MyAccountReturnDetailsChatMessages/Component/mapStateToProps */
export const mapStateToProps = state => ({
    customer: state.MyAccountReducer.customer
});

/** @namespace ScandiPWA/RmaGraphQl/Component/MyAccountReturnDetailsChatMessages/Component */
export class MyAccountReturnDetailsChatMessages extends PureComponent {
    /**
     * Prop types
     * @type {*}
     */
    static propTypes = {
        customer: customerType.isRequired,
        comments: PropTypes.array.isRequired
    };

    componentDidUpdate() {
        this.scrollToBottom();
    }

    scrollToBottom() {
        const objDiv = document.getElementById('MyAccountReturnDetailsChatMessages-ChatWrapper');

        objDiv.scrollTop = objDiv.scrollHeight;
    }

    renderAdditionalContent(created_at) {
        return (
            <div
              block="MyAccountReturnDetailsChatMessages"
              elem="AdditionalContentWrapper"
            >
                <span
                  block="MyAccountReturnDetailsChatMessages"
                  elem="AdditionalContentDateWrapper"
                >
                    <span
                      block="MyAccountReturnDetailsChatMessages"
                      elem="AdditionalContentDatePlaceholder"
                    >
                        { created_at }
                    </span>
                    <span
                      block="MyAccountReturnDetailsChatMessages"
                      elem="AdditionalContentDate"
                    >
                        { created_at }
                    </span>
                </span>
            </div>
        );
    }

    renderTextBlockUsername(username, index, isRightSide) {
        return (
            <span
              block="MyAccountReturnDetailsChatMessages"
              elem="TextBlockMessengerName"
              mods={ { isRightSide } }
            >
                { username }
            </span>
        );
    }

    renderTextBlock = (messageData, index) => {
        const { customer: { firstname, lastname } } = this.props;

        const {
            is_admin,
            created_at,
            comment
        } = messageData;


        const isRightSide = !parseInt(is_admin, 10);
        const username = isRightSide ? `${ firstname } ${ lastname }` : __('Customer Service');

        return (
            <div
              key={ index }
              block="MyAccountReturnDetailsChatMessages"
              elem="TextBlockWrapper"
              mods={ { isRightSide } }
            >
                { this.renderTextBlockUsername(username, index, isRightSide) }
                <div
                  block="MyAccountReturnDetailsChatMessages"
                  elem="TextBlockMessageWrapper"
                  mods={ { isRightSide } }
                >
                    { comment && (
                        <p
                          block="MyAccountReturnDetailsChatMessages"
                          elem="TextBlockMessage"
                        >
                            { comment }
                        </p>
                    ) }
                    { this.renderAdditionalContent(created_at) }
                </div>
            </div>
        );
    };

    render() {
        const { comments } = this.props;

        return (
            <div
              id="MyAccountReturnDetailsChatMessages-ChatWrapper"
              block="MyAccountReturnDetailsChatMessages"
              elem="ChatWrapper"
            >
                { comments.length
                    ? comments.map(this.renderTextBlock)
                    : <span>{ __('No messages') }</span> }
            </div>
        );
    }
}

export default connect(mapStateToProps, {})(MyAccountReturnDetailsChatMessages);
