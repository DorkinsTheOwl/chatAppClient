import { setErrorMessage } from "../actions";

export default (state = null, action) => {
    switch (action.type) {
        case setErrorMessage.name:
            return action.payload;
        default:
            return state;
    }
}