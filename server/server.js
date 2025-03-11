 // server/server.js
 const express = require('express');
 const http = require('http');
 const socketIo = require('socket.io');
 
 const app = express();
 const server = http.createServer(app);
 const io = socketIo(server);
 
 // Serve static files (Optional, if you want a front-end to serve from the same server)
 app.use(express.static('public'));
 
 // Handle socket connections
 io.on('connection', (socket) => {
   console.log('A user connected');
   
   // Listen for incoming messages
   socket.on('sendMessage', (message) => {
     // Broadcast message to all users except the sender
     socket.broadcast.emit('receiveMessage', message);
   });
   
   // Notify when a user disconnects
   socket.on('disconnect', () => {
     console.log('A user disconnected');
   });
 });
 
 server.listen(3000, () => {
   console.log('Server running on port 3000');
 });
 