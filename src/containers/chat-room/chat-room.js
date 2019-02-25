import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addMessage, setErrorMessage, setSocket, updateUsers } from "../../actions";
import * as moment from 'moment';
import './chat-room.scss';
import connectToSocket from "../utils/connect-to-socket";
import MessageForm from "./message-form/message-form";

class ChatRoom extends Component {

    constructor(props) {
        super(props);
        const name = sessionStorage.getItem('userName');

        this.state = {
            showPopup: false,
            userName: name
        };


        const functionsToPass = {
            updateUsers: this.props.updateUsers,
            addMessage: this.props.addMessage,
            setErrorMessage: this.props.setErrorMessage,
            redirect: this.props.history.push
        };

        if (!!name && !this.props.socket) {
            // this is for page reload when using chat,
            // if we have name saved in sessionStorage and no socket, try to connect to socket and set up handlers
            connectToSocket({ name }, functionsToPass).then(socket => {
                this.props.setSocket(socket);
            });
        } else if (!name && !this.props.socket) {
            // if there is no name in sessionStorage and no socket in state go back to landing page
            // this could happen when trying to open /chat directly in new window
            this.props.history.push('/');
        }
    }

    componentDidMount() {
        this.messageWindow.addEventListener('scroll', e => {
            const { offsetHeight, scrollHeight } = this.messageWindow;
            const difference = e.target.scrollTop + offsetHeight - scrollHeight;
            // if user is approximately within last message, hide popup about new messages
            if (difference > -50) {
                this.popup.hidden = true;
            }
        }, { passive: true })
    }

    renderUsers(users) {
        return users.map(user => {
            let nameToDisplay = user.name;
            if (nameToDisplay === this.state.userName) {
                nameToDisplay = `${user.name} (You)`
            }
            return <div className="user" key={user.id}>{nameToDisplay}</div>
        })
    }

    scrollToBottom(immediate = false) {
        // purpose of this is to scroll to latest message
        setTimeout(() => { // using setTimeout to place this function at the end of call stack
            if (!!this.messageWindow && !!this.messageElement) {
                const { scrollHeight, offsetHeight, scrollTop } = this.messageWindow;
                const messageHeight = this.messageElement.offsetHeight;

                if (immediate) {
                    // scroll to newest message if user clicked on popup
                    this.messageWindow.scrollTo({ top: scrollHeight + messageHeight });
                    this.popup.hidden = true;
                } else if (offsetHeight + scrollTop + (messageHeight * 4) >= scrollHeight) {
                    // scroll if user scrolled top within last 4 messages (including new one)
                    this.messageWindow.scrollTo({ top: scrollHeight + messageHeight });
                    this.popup.hidden = true;
                } else {
                    // on rendering new message this will be called and popup will be displayed
                    this.popup.hidden = false;
                }
            }
        });
    }

    renderMessages(messages) {
        this.scrollToBottom();
        return messages.map(({ from, text, createdAt }) => {
            const formattedTime = moment(createdAt).format('HH:MM:ss');
            return (
                <div className="message"
                     ref={el => this.messageElement = el}
                     key={Math.random()}>
                    <div className="message-title">
                        <div className="message-sender">{from}</div>
                        <span>{formattedTime}</span>
                    </div>
                    <div className="message-body">{text}</div>
                </div>
            )
        });
    }

    sendMessage(e, text, clearFormState) {
        e.preventDefault();

        if (!!text.trim()) {
            this.props.socket.emit('createMessage', { text }, () => {
                clearFormState();
            });
        }
    }

    disconnectFromServer() {
        this.props.socket.close();
    }

    render() {
        return (
            <div className="chat-page main-container">
                <button type="button"
                        onClick={this.disconnectFromServer.bind(this)}
                        className="disconnect-btn">Disconnect
                </button>

                <div className="chat-sidebar">
                    <div className="title">People</div>
                    {this.renderUsers(this.props.users)}
                </div>

                <div className="chat-main">
                    <div className="chat-window">
                        <div className="chat-messages" ref={chatWindow => this.messageWindow = chatWindow}>
                            {this.renderMessages(this.props.messages)}
                        </div>

                        <div className="chat-popup">
                            <button className="popup-button"
                                    hidden={true}
                                    ref={popup => this.popup = popup}
                                    onClick={() => this.scrollToBottom(true)}>
                                New message(s) available, click to go to message
                            </button>
                        </div>
                    </div>

                    <div className="chat-footer">
                        <MessageForm sendMessage={this.sendMessage.bind(this)}/>
                    </div>
                </div>
            </div>
        );
    }

    componentWillUnmount() {
        // close socket upon leaving component
        // as of current implementation no need to set socket to null in state
        // socket will be set to null in constructor of landing-page
        if (!!this.props.socket) {
            this.props.socket.close();
        }
    }
}

const mapStateToProps = state => {
    return {
        users: state.userList,
        socket: state.socket,
        messages: state.messages
    }
};

export default connect(mapStateToProps, {
    updateUsers,
    setSocket,
    addMessage,
    setErrorMessage
})(ChatRoom);