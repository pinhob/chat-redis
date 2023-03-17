import { useEffect } from "react";
import { socket } from "../connections";

const Attendant = () => {
  useEffect(() => {
    socket.connect();

    socket.on('connect', () => {
      console.log('Socket conectado', socket.id);
    });

    socket.emit('joinRoom', 'dani');

    return () => {
      socket.disconnect();
    }
  }, []);

  return (
    <h1>Attendant!</h1>
  )
};

export default Attendant;
