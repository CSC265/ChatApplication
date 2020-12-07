//server
//Note: function parameters MUST match between server-side and client-side


const path = require('path');
const express = require('express');
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
        socket.on('join-room', (data) => {
            users[socket.id] = data[1];
            console.log(data[1]);
            socket.join(data[0]);
            socket.emit('message', `Welcome to the ${data[2]} chatroom!`);
        });

        socket.on('username', (data2)=>{ 
            users[socket.id] = data2[0];
            io.emit('message', `${data2[0]} entered the chat`)
        })

        console.log(`Socket ${socket.id} connected`);
        socket.on('message', (msg) => {
            let username = users[socket.id];
            console.log(`${username}: ${msg}`);
            io.emit('message', `${username}: ${msg}`);
        });

    });
