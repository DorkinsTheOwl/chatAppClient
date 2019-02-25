import { updateUsers } from "../actions";

export default (state = [], action) => {
    switch (action.type) {
        case updateUsers.name:
            return [
                ...action.payload
            ];
        default:
            return state;
    }
}