import { addMessage, resetMessages } from "../actions";

export default (state = [], action) => {
    switch (action.type) {
        case addMessage.name:
            return [
                ...state,
                action.payload
            ];
        case resetMessages.name:
            return [];
        default:
            return state;
    }
}