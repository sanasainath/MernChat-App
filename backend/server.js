const { app, server } = require('./socket/socket');
const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cors=require('cors')

const signup = require('./router/signup');
const signin = require('./router/signin');
const messagechat = require('./router/messagechat');
const groupChat = require('./router/groupmessages');


app.use(express.json());
app.use(cors())
app.use(express.static(path.join(__dirname, '../mern-app/dddd'))); // Serve static files

app.use('/public/images', express.static(path.join(__dirname, 'public/images')));

app.use('/api', signup);
app.use('/api', signin);
app.use('/api', messagechat);
app.use('/api', groupChat);

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, '../mern-app/dddd/index.html'));
});

// MongoDB connection
mongoose.connect(process.env.CONN_STR, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => {
    console.log('MongoDB connected');

    // Start the server after successful connection
    server.listen(3001, () => {
      console.log("Server is running on port 3001");
    });
  })
  .catch(err => console.error('MongoDB connection error:', err));

// Route to check if the server is running
app.get('/', (req, res) => {
  res.status(200).json({
    message: "Server is running"
  });
});
