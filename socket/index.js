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


  // TODO: adicionar pub/sub do redis para a troca de mensagens entre os usuários
  socket.on('createRoom', (room) => {
    socket.join(room);
    sub.subscribe(room, (err, count) => {
      if (err) throw new Error('Erro na criação da sala. Evento createRoom');
      console.log(`Criada sala ${room}.`);
    });
  });

  socket.on('joinRoom', (room) => {
    socket.join(room);
    sub.subscribe(room);
    pub.publish(room, `${socket.id} entrou`);
  });

  sub.on("message", (channel, message) => {
    console.log(`mensagem: ${message} publicada no canal ${channel}`);
    console.log(`---`)
    socket.broadcast.emit("message", message);
  });

  socket.on("message", (message) => {
    console.log("object:", message);
    pub.publish("dani", message.message);
  })
});

// server start
server.listen(3001, () => {
  console.log('Servidor iniciado na porta 3001.');
});