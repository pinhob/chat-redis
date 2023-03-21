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

  //  handle rooms events
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
    // pub.publish(room, `${socket.id} entrou`);
  });

  // handle messages events
  socket.on("sendMessage", (message) => {
    console.log("object:", message);

    // explanation to why convert the object to string: https://stackoverflow.com/a/64087456
    const serializedMessage = JSON.stringify(message);
    pub.publish("dani", serializedMessage);
  })

  // handle redis receveid sub messages
  sub.on("message", (channel, serializedMessage) => {
    const message = JSON.parse(serializedMessage);
    console.log(`mensagem: ${message} publicada no canal ${channel}`);
    console.log(`---`)
    socket.broadcast.emit("message", message);
  });
});

// server start
server.listen(3001, () => {
  console.log('Servidor iniciado na porta 3001.');
});