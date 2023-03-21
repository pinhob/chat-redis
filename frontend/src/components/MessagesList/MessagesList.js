const MessagesList = ({ messages }) => {
  return (
    <>
      <ol>

        {
          messages
            ? JSON.stringify(messages) && messages.map((message) => (
              <li key={message.time}>
                {message.from}: {message.message}
              </li>
            ))
            : <li>"Sem mensagens no momento"</li>
        }
      </ol>
    </>
  )
};

export default MessagesList;
