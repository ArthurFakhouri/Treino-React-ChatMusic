const express = require('express');
const app = express();
const { Server } = require('socket.io');
const http = require('http');
const cors = require('cors');

app.use(cors());
app.use(express.json());

const server = http.createServer(app);

server.listen(3001, () => {
    console.log('Running Server');
});

io = new Server(server, {
    cors: {
        origin: "http://localhost:3000"
    }
});

io.on('connection', (socket) => {
    console.log(socket.id);

    socket.on('user_connected', (data) => {
        socket.join('sala01');
        socket.broadcast.emit('msgFromServer', { text: `${data.user} ingressou no bate-papo!` });
    });

    socket.on('msgFromUser', (data) => {
        socket.emit('msgToUser', {user: data.user, text: data.text});
        socket.broadcast.emit('msgToUser', { user: data.user, text: data.text });
    });

    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
});