import { useEffect } from "react";
import { socket } from '../connections';

const Technician = () => {
  useEffect(() => {
    socket.connect();

    socket.on('connect', () => {
      console.log('Socket conectado', socket.id);
    });

    socket.emit('createRoom', 'dani');

    return () => {
      socket.disconnect();
    }
  }, []);

  useEffect(() => {
    socket.on('newUser', (data) => {
      console.log(data);
    });
  }, []);

  return (
    <h1>Technician!</h1>
  )
};

export default Technician;
