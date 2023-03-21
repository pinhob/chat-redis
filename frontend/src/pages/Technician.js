import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { MessagesList, MessageTextField } from "../components";
import { socket } from '../connections';

const Technician = () => {
  const [messages, setMessages] = useState([]);
  const { state: user } = useLocation();


  useEffect(() => {
    socket.connect();

    socket.on('connect', () => {
      console.log('Técnico conectado', socket.id);
    });

    socket.on('message', (newMessage) => {
      console.log("Técnico recebeu: ", newMessage);
      setMessages((prevMsgs) => [...prevMsgs, newMessage]);
    });

    socket.emit('createRoom', 'dani');

    return () => {
      socket.disconnect();
    }
  }, []);

  return (
    <>
      <h1>Technician!</h1>
      <MessagesList messages={messages} />
      <MessageTextField user={user} />
    </>
  )
};

export default Technician;
