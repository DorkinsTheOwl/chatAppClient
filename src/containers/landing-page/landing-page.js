import React, { Component } from 'react';
import connect from "react-redux/es/connect/connect";

import connectToSocket from '../utils/connect-to-socket';
import { addMessage, resetMessages, setErrorMessage, setSocket, updateUsers } from '../../actions';
import './landing-page.scss';

const initialState = {
    value: '',
    submitted: false,
    buttonName: 'Join Chat'
};

class LandingPage extends Component {
    constructor(props) {
        super(props);
        this.state = initialState;

        // reset messages, remove socket from state, remove userName from sessionStorage
        // for cases when user uses back in browser
        this.props.resetMessages();
        this.props.setSocket(null);
        this.props.setErrorMessage(null);
        sessionStorage.removeItem('userName');
    }

    handleChange(event) {
        this.setState({ value: event.target.value });
    }

    handleForm(e) {
        e.preventDefault();
        this.props.setErrorMessage('');
        this.setState({
            submitted: true,
            buttonName: 'Trying to connect'
        });
        const params = { name: this.state.value };
        const functionsToPass = {
            updateUsers: this.props.updateUsers,
            addMessage: this.props.addMessage,
            setErrorMessage: this.props.setErrorMessage,
            redirect: this.props.history.push
        };

        connectToSocket(params, functionsToPass).then(socket => {
            this.props.setSocket(socket);
            this.props.history.push('/chat');
        }, errorMessage => {
            this.setState({ ...initialState, value: this.state.value });
            this.props.setErrorMessage(errorMessage);
        });
    }

    render() {
        return (
            <div className="landing-page main-container">
                <div className="centered-form">
                    <form onSubmit={this.handleForm.bind(this)}>
                        <div className="form-title">
                            <h3>Mos Eisley Cantina</h3>
                        </div>
                        <div className="form-group">
                            <label htmlFor="name">Enter your name</label>
                            <input type="text"
                                   autoFocus
                                   autoComplete="off"
                                   value={this.state.value}
                                   onChange={this.handleChange.bind(this)}
                                   className="form-control"
                                   id="name"
                                   minLength={2}
                                   required/>
                        </div>
                        <button type="submit"
                                disabled={this.state.submitted}
                                className="btn btn-primary w-100">{this.state.buttonName}
                        </button>
                    </form>
                    <div className="alert alert-danger mt-3" hidden={!this.props.errorMessage}>
                        {this.props.errorMessage}
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        errorMessage: state.errorMessage
    }
};

export default connect(mapStateToProps, {
    updateUsers,
    setSocket,
    addMessage,
    resetMessages,
    setErrorMessage
})(LandingPage);