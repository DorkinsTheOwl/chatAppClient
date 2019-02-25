import { combineReducers } from 'redux';
import socketReducer from './reducer-socket';
import userListReducer from './reducer-users';
import messagesReducer from './reducer-messages';
import errorMessageReducer from './reducer-errors';

const rootReducer = combineReducers({
    userList: userListReducer,
    socket: socketReducer,
    messages: messagesReducer,
    errorMessage: errorMessageReducer
});

export default rootReducer;
