import { useEffect } from "react";
import { MessageTextField } from "../components";
import { socket } from "../connections";

const Attendant = () => {
  useEffect(() => {
    socket.connect();

    socket.on('connect', () => {
      console.log('Atendente conectado', socket.id);
    });

    socket.on('message', (message) => {
      console.log("Atendente recebeu: ", message);
    });

    socket.emit('joinRoom', 'dani');

    return () => {
      socket.disconnect();
    }
  }, []);

  return (
    <>
      <h1>Attendant!</h1>
      {/* <MessageTextField /> */}
    </>
  )
};

export default Attendant;
