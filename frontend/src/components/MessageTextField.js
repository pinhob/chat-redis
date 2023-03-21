import { useState } from "react";
import { socket } from "../connections";

const MessageTextField = () => {
  const [message, setMessage] = useState('');

  const handleSendMessage = (e) => {
    e.preventDefault();

    const currentTime = new Date();

    const newMessage = {
      message,
      from: 'technician',
      time: `${currentTime.getHours()}:${currentTime.getMinutes()}`
    }

    socket.emit('message', newMessage);
  };


  return (
    <form onSubmit={(e) => handleSendMessage(e)}>
      <label htmlFor="message">
        Mensagem:
        <input type="text" name="message" id="message" onChange={(e) => setMessage(e.target.value)} />
      </label>
      <button type="submit">Enviar</button>
    </form>
  )
}

export default MessageTextField;
