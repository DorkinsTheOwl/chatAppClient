import io from 'socket.io-client';

/**
 * @description
 * Function that tries to connects to a socket and returns either resolved or rejected promise.
 * On successful connection set up handlers for updateUserList, newMessage and disconnect.
 * Sets session storage for cases when user reloads while in chat room.
 *
 * Tries to connect immediately and every 3 seconds if initial connection failed.
 * After 3rd unsuccessful connection rejects with an error message.
 *
 * On unsuccessful join to the chat room reject promise with error message
 *
 * @param {object} params - currently just object with userName
 * @param {function} updateUsers - function to update users in state
 * @param {function} addMessage - function to update messages in state
 * @param {function} setErrorMessage - function to set error message in state
 * @param {function} redirect - this.props.history.push function to change route
 * @returns {Promise}
 * **/

export default (params, { updateUsers, addMessage, setErrorMessage, redirect }) => {
    const socket = io('http://localhost:3000');

    return new Promise((resolve, reject) => {
        let tries = 0;

        const connectToSocket = (interval) => {
            if (tries >= 2 && !!interval) {
                clearInterval(interval);
                socket.close();
                reject('Cannot make a connection to the server. Please try again later.');
            }
            socket.emit('join', params, err => {
                clearInterval(interval);

                if (!!err) {
                    reject(err);
                    socket.close();
                } else {
                    socket.on('updateUserList', users => updateUsers(users));
                    socket.on('newMessage', msg => addMessage(msg));

                    // session storage used for reload functionality in chat-room.js
                    sessionStorage.setItem('userName', params.name);

                    resolve(socket);
                }
            });

            socket.on('disconnect', reason => {
                redirect('/');
                if (reason === 'io server disconnect') {
                    setErrorMessage('Disconnected by the server due to inactivity.');
                }

                if (reason === 'transport close') {
                    setErrorMessage('Server shut down');
                }
            });
        };

        const tryingToConnect = setInterval(() => {
            connectToSocket(tryingToConnect);
            tries++;
        }, 3000);

        connectToSocket(tryingToConnect);
    });
};