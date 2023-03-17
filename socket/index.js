import express from 'express';
import http from 'http';
import { Server } from "socket.io";
import { Redis } from "ioredis";

const app = express();
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

});

// server start
server.listen(3001, () => {
  console.log('Servidor iniciado na porta 3001.');
});