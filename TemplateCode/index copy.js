//server
//Note: function parameters MUST match between server-side and client-side
//i.e. 'message' and 'another event'

const path = require('path');
const express = require('express');
const http = require('http');
const app = express();
const server = http.createServer(app);
const io = require('socket.io')(server);
const port = 3000 || process.env.PORT;
// const prompt = require('prompt-sync')();

// Directs to static folder
app.use(express.static(path.join(__dirname, 'public')));


// app.get('/', (req, res) => {
//     res.sendFile(__dirname + '/public/index.html');
// });

let users = {};

// When client connects
io.on('connection', socket => {
    console.log('user connected.');

    socket.emit('message', 'Welcome!')
        // socket.on('username', (username)=>{
        //    users[socket.id] = username;
        //    io.emit('message', `${username} entered the chat`)
        // })

        // console.log(`Socket ${socket.id} connected`);
        // socket.on('message', (msg) => {
        //     username = users[socket.id];
        //     console.log(`${username}: ${msg}`);
        //     io.emit('message', `${username}: ${msg}`);
        // });
    
    // Broadcasts user connection
    socket.broadcast.emit('message', 'user entered the chatroom.');

    socket.on('disconnect', () => {
        io.emit('message', 'user left the chatroom.')
    })

    socket.on('chatMessage', msg => {
        io.emit('message', msg);
    });
});

server.listen(port, () =>
    console.log(`Server is running on port ${port}`));
