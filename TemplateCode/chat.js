const chatform = document.getElementById('chat-form')
const socket = io();

// When message event is received from server, execute statements.
socket.on('message', message => {
    console.log(message)
    outputMessage(message);
});

chatform.addEventListener('submit', e => {
    //prevent default behavior of submitting to a file
    e.preventDefault();

    let msg = e.target.elements.msg.value;

    // Emit chatMessage to the server
    socket.emit('chatMessage', msg);
});

function outputMessage(message) {
    const div = document.createElement('div');
    div.classList.add('message');
}