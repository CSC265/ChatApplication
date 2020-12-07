//server
//Note: function parameters MUST match between server-side and client-side
//i.e. 'message' and 'another event'

const path = require('path');
const express = require('express')
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const port = 3000;
const prompt = require('prompt-sync')();

server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

let users = {};

io.on('connection', socket => {

        socket.on('username', (username)=>{
           users[socket.id] = username;
           io.emit('message', `${username} entered the chat`)

        })

        console.log(`Socket ${socket.id} connected`);
        socket.on('message', (msg) => {
            let username = users[socket.id];
            console.log(`${username}: ${msg}`);
            io.emit('message', `${username}: ${msg}`);
        });
    })
