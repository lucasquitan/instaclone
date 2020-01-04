const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');

const app = express();

// Divide o servidor permitindo http e web socket
const server = require('http').Server(app);
const io = require('socket.io')(server);

// Conexao com o mongoose
mongoose.connect('mongodb+srv://semana:semana@cluster0-0s4xz.mongodb.net/test?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Socket.io
app.use((req, res, next) => {
  req.io = io;

  next();
});

// Liberacao para que outros IPs possam acessar a app
app.use(cors()); 

// Rota para acessar arquivos estaticos 
app.use('/files', express.static(path.resolve(__dirname, '..', 'uploads', 'resized')));

// Declaracao das rotas
app.use(require('./routes'));

server.listen(3333);
