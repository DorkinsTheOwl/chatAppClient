/**
 * @description updates user list in state received from server
 * @param {object} payload - user object containing socket id and user name
 * */
export const updateUsers = payload => {
    return {
        type: updateUsers.name,
        payload
    }
};

/**
 * @description sets socket to passed in value
 * @param {object | null} payload - socket object if we want to store socket or null if we want to clear
 * */
export const setSocket = payload => {
    return {
        type: setSocket.name,
        payload
    }
};

/**
 * @description updates chat messages with recently received message
 * @param {object} payload - message object containing sender, text and when message was created
 * */
export const addMessage = payload => {
    return {
        type: addMessage.name,
        payload
    }
};

/**
 * @description resets messages in state, used when leaving chat room
 * */
export const resetMessages = () => {
    return {
        type: resetMessages.name
    }
};

/**
 * @description sets error message in landing page
 * @param {string} payload - message text
 * */
export const setErrorMessage = payload => {
    return {
        type: setErrorMessage.name,
        payload
    }
};