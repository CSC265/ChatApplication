//server
//Note: function parameters MUST match between server-side and client-side
//i.e. 'message' and 'another event'

const app = require('express')();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const port = 3000;
const prompt = require('prompt-sync')();

server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

let users = {};
// let username = prompt("Enter username: ");

io.on('connection', function (socket) {
        // userID = socket.id;
        // users[socket.id] = username;
        socket.on('username', (username)=>{
           let user = username;
           users[socket.id] = user;
        })
        
        username = users[socket.id];

        console.log(`Socket ${socket.id} connected`);
        socket.on('message', (msg) => {
            username = users[socket.id];
            console.log(`${username}: ${msg}`);
            io.emit('message', username);
            io.emit('message',msg);
        });
    })