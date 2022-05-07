import React, { useState, useEffect } from 'react';

function ChatBox({ socket, username, room }) {
  const [currentMessage, setCurrentMessage] = useState("");
  const [messageList, setMessageList] = useState([]);

  const sendMessage = async () => {
    if (currentMessage !== '') {
      const messageData = {
        author: username,
        room: room,
        message: currentMessage,
        time:
          new Date(Date.now()).getHours() +
          ':' +
          new Date(Date.now()).getMinutes(),
      };
      await socket.emit("send_message", messageData);
      setMessageList((messageList) => [...messageList, messageData]);
    }
  }

  useEffect(() => {
    socket.on("recieve_message", (data) => {
      setMessageList((messageList) => [...messageList, data]);
    })
  }, [socket])

  return (
    <div style={{ border: '1px solid black'}}>
      <div className="chat-header" >
        <p>Live Battle Chat</p>
      </div>
      <div className="chat-body" >
        {messageList.map((messageContent) => {
          return (
            <div className="message">
              <div className="message-content">
                <p>{messageContent.author} says "{messageContent.message}"</p>
              </div>
              <div className="message-meta">
                <p>at {messageContent.time}</p>
                <p></p>
              </div>
            </div>
          );
        })}
      </div>
      <div className="chat-footer" style={{ border: '1px solid red'}}>
        <input
          type="text"
          placeholder="Hey..."
          onChange={(event) => {
            setCurrentMessage(event.target.value)
          }}
        />
        <button onClick={() => sendMessage()}>&#9658;</button>
      </div>
    </div>
  )
}

export default ChatBox

