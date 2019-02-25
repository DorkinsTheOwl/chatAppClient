##### Sidenote
Did not create tests as I have no proper experience in testing react containers and/or 
components. Did not test actions or reducers as they are very simple.

# Client
1. Has two pages ​​ landing page (shown when not connected to the server) and chat
(shown only when connected to the server).
2. Landing page has a box to enter nickname, a button to connect, and also displays
feedback like 'Failed to connect. Nickname already taken.', 'Server unavailable.' or
'Disconnected by the server due to inactivity.'.
3. Chat page displays messages from the server together with the sender's nickname (but
no messages from before the user's current session started), a box to enter a message,
a button to send it, and a button to disconnect from the server.
4. Does not have any inactivity timeouts.
5. Should display landing page if it's disconnected from the server.

# UI/UX
### Things I added for better user experience
- App will try to establish connection 3 times every 3 seconds and in case of failure will 
display appropriate error message
- If user is on chat page and just reloads the page, he will rejoin the chat
- If user is within last 4 messages (including new one) window will automatically scroll to newest message
- If user is higher than last 4 message a clickable popup will appear that lets user know
that new messages are available. Upon clicking popup user will be scrolled to bottom.
If user scrolls to bottom manually popup will disappear.
- User will be able to see his name in client list - pointed out by (You)
- Messages have timestamps