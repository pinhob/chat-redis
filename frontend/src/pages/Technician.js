import { useEffect } from "react";
import { MessageTextField } from "../components";
import { socket } from '../connections';

const Technician = () => {
  useEffect(() => {
    socket.connect();

    socket.on('connect', () => {
      console.log('Técnico conectado', socket.id);
    });

    socket.on('message', (message) => {
      console.log(message);
    });

    socket.emit('createRoom', 'dani');

    return () => {
      socket.disconnect();
    }
  }, []);

  return (
    <>
      <h1>Technician!</h1>
      <MessageTextField />
    </>
  )
};

export default Technician;
