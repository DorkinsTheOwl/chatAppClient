import React, { Component } from 'react';

class MessageForm extends Component {

    constructor(props) {
        super(props);

        this.state = {
            message: '',
        };
    }

    handleChange(event) {
        this.setState({ message: event.target.value });
    }

    clearState() {
        this.setState({ message: '' })
    }

    render() {
        return (
            <form className="message-form"
                  onSubmit={e => this.props.sendMessage(e, this.state.message, this.clearState.bind(this))}>
                <input name="message"
                       type="text"
                       placeholder="Message"
                       autoFocus
                       value={this.state.message}
                       onChange={this.handleChange.bind(this)}
                       autoComplete="off"/>
                <button type="submit">Send</button>
            </form>
        );
    }
}

export default MessageForm;