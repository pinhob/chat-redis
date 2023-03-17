import express from 'express';
import http from 'http';
import cors from 'cors';
import { Server } from "socket.io";
import { Redis } from "ioredis";

const app = express();
app.use(cors());
const server = http.createServer(app);

const sub = new Redis();
const pub = new Redis();

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

io.on('connection', (socket) => {
  console.log(`Socket conectado: ${socket.id}`);


  // create a room when the event "createRoom" is recevied and create a channel in redis
  socket.on('createRoom', (room) => {
    console.log(`Criando sala: ${room}`);
    socket.join(room);
  });

  socket.on('joinRoom', (room) => {
    console.log(`Entrando na sala: ${room}`);
    socket.join(room);
    socket.broadcast.to(room).emit('newUser', 'Novo usuário conectado');
  });
});

// server start
server.listen(3001, () => {
  console.log('Servidor iniciado na porta 3001.');
});