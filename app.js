const express = require('express');
const app = express();
const PORT = process.env.PORT || 4000;
const server = app.listen(PORT, () => {
    console.log('Server is Started', PORT);
});
const io = require('socket.io')(server);
const connectedUsers = new Set();
io.on('connection', (socket) => {
    console.log('Connected Successfully', socket.id);
    connectedUsers.add(socket.id);
    io.emit('connected-users',connectedUsers.size);
    socket.on('disconnect', () => {
        console.log('Disonnected', socket.id);
        connectedUsers.delete(socket.id);
        io.emit('connected-users',connectedUsers.size);
    });
    socket.on('message', (data) => {
        console.log(data);
        socket.broadcast.emit('message-receive',data);
    })
});
app.get('/', (_, res) => {
    res.send('<h1>Socket Chat Server</h1>');
  });