import { io } from "socket.io-client";

const SOCKET_SERVER =
  process.env.REACT_APP_SOCKET_SERVER || "http://localhost:3001";

const socket = io(SOCKET_SERVER, {
  autoConnect: false,
});

export default socket;
