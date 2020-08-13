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

import React, { PureComponent, createRef } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { showNotification } from 'Store/Notification';
import { ReturnDispatcher } from '../../store/Return';
import MyAccountReturnDetailsChat from './MyAccountReturnDetailsChat.component';

/** @namespace ScandiPWA/RmaGraphQl/Component/MyAccountReturnDetailsChat/Container/mapDispatchToProps */
export const mapDispatchToProps = dispatch => ({
    showNotification: (type, message) => dispatch(showNotification(type, message)),
    sendComment: (requestId, comment) => ReturnDispatcher.sendComment(
        requestId,
        comment
    )
});

/** @namespace ScandiPWA/RmaGraphQl/Component/MyAccountReturnDetailsChat/Container */
export class MyAccountReturnDetailsChatContainer extends PureComponent {
    static propTypes = {
        requestId: PropTypes.string.isRequired,
        addCommentToState: PropTypes.func.isRequired,
        comments: PropTypes.array.isRequired,
        showNotification: PropTypes.func.isRequired,
        sendComment: PropTypes.func.isRequired
    };

    state = {
        isSendDisabled: false,
        isChatLoading: false
    };

    constructor(props) {
        super(props);

        this.commentAreaRef = createRef();
    }

    containerProps = () => ({
        commentAreaRef: this.commentAreaRef
    });

    containerFunctions = () => ({
        handleTextAreaChange: this.handleTextAreaChange.bind(this),
        handleSendMessageClick: this.handleSendMessageClick.bind(this)
    });

    handleTextAreaChange = ({ target: { value } }) => {
        const { isSendDisabled } = this.state;

        if (value && isSendDisabled) {
            this.setState({ isSendDisabled: false });
        }

        if (!value && !isSendDisabled) {
            this.setState({ isSendDisabled: true });
        }
    };

    onMessageSuccess = (comment) => {
        const { addCommentToState } = this.props;
        this.commentAreaRef.current.value = '';

        addCommentToState(comment);

        this.setState(() => ({ isChatLoading: false }));
    };

    handleSendMessageClick = async () => {
        const { requestId, sendComment } = this.props;
        const comment = this.commentAreaRef.current.value;

        this.setState(() => ({ isChatLoading: true }));

        await sendComment(requestId, comment)
            .then(
                /** @namespace ScandiPWA/RmaGraphQl/Component/MyAccountReturnDetailsChat/Container/sendCommentThen */
                ({ sendRmaComment: comment }) => this.onMessageSuccess(comment)
            )
            .catch(
                /** @namespace ScandiPWA/RmaGraphQl/Component/MyAccountReturnDetailsChat/Container/sendCommentThenCatch */
                e => showNotification('error', 'Error sending message!', e)
            );
    };

    render() {
        const { isChatLoading } = this.state;
        const { comments } = this.props;

        return (
            <MyAccountReturnDetailsChat
              { ...this.state }
              { ...this.props }
              { ...this.containerFunctions() }
              { ...this.containerProps() }
              comments={ comments }
              isChatLoading={ isChatLoading }
            />
        );
    }
}

export default connect(null, mapDispatchToProps)(MyAccountReturnDetailsChatContainer);
