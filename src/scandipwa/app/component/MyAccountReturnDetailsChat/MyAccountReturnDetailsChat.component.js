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
import PropTypes from 'prop-types';

import Loader from 'Component/Loader';
import MyAccountReturnDetailsChatMessages from '../MyAccountReturnDetailsChatMessages';

import './MyAccountReturnDetailsChat.style';

export const ENTER_KEY_CODE = 13;

/** @namespace ScandiPWA/RmaGraphQl/Component/MyAccountReturnDetailsChat/Component */
export class MyAccountReturnDetailsChat extends PureComponent {
    static propTypes = {
        commentAreaRef: PropTypes.oneOfType([
            PropTypes.func,
            PropTypes.shape({ current: PropTypes.instanceOf(Element) })
        ]).isRequired,
        handleTextAreaChange: PropTypes.func.isRequired,
        handleSendMessageClick: PropTypes.func.isRequired,
        comments: PropTypes.array.isRequired,
        isChatLoading: PropTypes.bool.isRequired,
        isSendDisabled: PropTypes.bool.isRequired
    };

    onKeyEnterDown = (event) => {
        const { handleSendMessageClick } = this.props;

        if (event.keyCode === ENTER_KEY_CODE) {
            handleSendMessageClick();
        }
    };

    renderInputTextArea() {
        const {
            commentAreaRef,
            handleTextAreaChange
        } = this.props;

        return (
            <input
              mix={ {
                  block: 'MyAccountReturnDetailsChat',
                  elem: 'InputSectionTextArea'
              } }
              placeholder={ __('Message') }
              onChange={ handleTextAreaChange }
              onKeyDown={ this.onKeyEnterDown }
              ref={ commentAreaRef }
            />
        );
    }

    renderInputSection() {
        const {
            isSendDisabled,
            handleSendMessageClick
        } = this.props;

        return (
            <div
              block="MyAccountReturnDetailsChat"
              elem="InputSectionWrapper"
            >
                { this.renderInputTextArea() }
                <button
                  block="Button"
                  onClick={ handleSendMessageClick }
                  disabled={ isSendDisabled }
                >
                    { __('Send') }
                </button>
            </div>
        );
    }

    renderContent() {
        const { comments, isChatLoading } = this.props;

        return (
            <div
              block="MyAccountReturnDetailsChat"
              elem="ContentWrapper"
            >
                <Loader isLoading={ isChatLoading } />
                <MyAccountReturnDetailsChatMessages
                  comments={ comments }
                />
                { this.renderInputSection() }
            </div>
        );
    }

    renderChat() {
        return (
            <>
                <h4
                  block="MyAccountReturnDetailsChat"
                  elem="Title"
                >
                    { __('Leave message') }
                </h4>
                { this.renderContent() }
            </>
        );
    }

    render() {
        return (
            <div block="MyAccountReturnDetailsChat">
                { this.renderChat() }
            </div>
        );
    }
}

export default MyAccountReturnDetailsChat;
