
const { Server } = require('socket.io');
const http = require('http');
const express = require('express');
const { off } = require('process');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: ["http://localhost:3000", "https://mernchat-app-dev.onrender.com"],
    methods: ["GET", "POST"]
  }
});

const userSocket = {}; // Mapping of user ID to socket ID

const emailToSocketIdMap=new Map();
const socketIdToEmailMap=new Map();
// Connection handler for socket.io
io.on('connection', (socket) => {
  console.log("A socket.io connection established:", socket.id);
  socket.on('JoinRooms',data=>{
    const {email,room}=data;
    emailToSocketIdMap.set(email,socket.id);
   socketIdToEmailMap.set(socket.id,email);
   io.to(room).emit('userJoined',{email,id:socket.id})
   socket.join(room);
   io.to(socket.id).emit('JoinRooms',data);
   
    
    console.log("check room data in back",data);
  })
  //typing......
  socket.on('typing', ({ userId }) => {
    console.log("check type",userId);
    const socketId = userSocket[userId];
    console.log("type socket",socketId);  
    if (socketId) {
      io.to(socketId).emit('typing');
    } else {
      console.log(`Socket ID not found for user ${userId}`);
    }
  });
  socket.on('stop typing', ({ userId }) => {
    const socketId = userSocket[userId];
    if (socketId) {
      io.to(socketId).emit('stop typing');
    } else {
      console.log(`Socket ID not found for user ${userId}`);
    }
  });
  
  socket.on('user:call',({to,offer})=>{
    console.log("checking at leaset here",offer);
    io.to(to).emit('incoming-call',{from:socket.id,offer})
  })
  socket.on('call:accepted',({to,answer})=>{
    io.to(to).emit('call:accepted',{from:socket.id,answer})


  })
  socket.on('peer:nego:needed',({to,offer})=>{
    io.to(to).emit("peer:nego:needed",{from:socket.id,offer})
  })
  socket.on('peer:nego:done',({to,ans})=>{
    io.to(to).emit("peer:nego:final",{from:socket.id,ans})
  })

  const userId = socket.handshake.query.userId;

  // Associate the socket ID with the user ID
  if (userId !== "undefined") {
    userSocket[userId] = socket.id;
  }

  

  // Emit 'getOnlineUsers' event to update online users list
  io.emit("getOnlineUsers", Object.keys(userSocket));

  // Event handler for 'disconnect' event
  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
    delete userSocket[userId];
    io.emit("getOnlineUsers", Object.keys(userSocket));

  });
});

// Export necessary variables for reuse in other modules
module.exports = { app, io, server,getReceiverSocketId: (receiveId) => userSocket[receiveId] };
