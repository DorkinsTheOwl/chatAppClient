import { setSocket } from "../actions";

export default (state = null, action) => {
    switch (action.type) {
        case setSocket.name:
            return action.payload;
        default:
            return state;
    }
}