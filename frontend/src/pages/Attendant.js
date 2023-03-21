import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { MessagesList, MessageTextField } from "../components";
import { socket } from "../connections";


const Attendant = () => {
  const [messages, setMessages] = useState([]);
  const { state: user } = useLocation();

  useEffect(() => {
    socket.connect();

    socket.on('connect', () => {
      console.log('Atendente conectado', socket.id);
    });

    socket.on('message', (newMessage) => {
      console.log("Atendente recebeu: ", newMessage);
      setMessages((prevMsgs) => [...prevMsgs, newMessage]);
      console.log("msgs", messages)
    });

    socket.emit('joinRoom', 'dani');

    return () => {
      socket.disconnect();
    }
  }, []);

  return (
    <>
      <h1>Attendant!</h1>
      <MessagesList messages={messages} />
      <MessageTextField user={user} />
    </>
  )
};

export default Attendant;
