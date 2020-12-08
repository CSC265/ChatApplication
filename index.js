//server
//Note: function parameters MUST match between server-side and client-side


const path = require('path');
const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const port = 3001;
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
            users[socket.id] = [data[0],data[1],data[2]];
            socket.join(data[0])
            

            socket.emit('message', `Welcome to the ${users[socket.id][0]} chatroom!`);
            socket.to(users[socket.id][0]).emit('message', `${users[socket.id][1]} entered the chat`);
        });

        console.log(`Socket ${socket.id} connected`);
        socket.on('message', (data) => {
            io.to(data[0]).emit('message', `${data[1]}: ${data[2]}`);
        });

    });
