/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-shadow */
/* eslint-disable react/prop-types */
import React, {
  useState, useEffect, useContext,
} from 'react';
import ScrollToBottom from 'react-scroll-to-bottom';
import moment from 'moment';
import UserContext from '../UserContext';
// import RoomContext from '../RoomContext';

function ChatBox({
  socket, room, chatRooms, setChatRooms, logList, setLogList,
}) {
  const [currentMessage, setCurrentMessage] = useState('');
  const [messageList, setMessageList] = useState([]);
  const { currentUser } = useContext(UserContext);

  const username = currentUser.displayName;

  const sendMessage = async () => {
    if (currentMessage !== '') {
      const messageData = {
        author: username,
        room,
        message: currentMessage,
        time:
          moment().format('h:mm a'),
      };
      await socket.emit('send_message', messageData);
      // setMessageList([...messageList, messageData]);
    }
  };

  const handleKeypress = (e) => {
    if (e.keyCode === 13) {
      sendMessage();
      setCurrentMessage('');
    }
  };

  useEffect(() => {
    socket.on('recieve_message', (data) => {
      setMessageList((messageList) => [...messageList, data]);
    });
  }, [socket]);

  return (
    <div style={{ border: '0px' }}>
      <div className="chat-header">
        <div className="chat-header-title">Live Battle Chat</div>
      </div>
      <div className="chat-body">
        <ScrollToBottom className="message-container">
          {messageList.map((messageContent) => (
            <div className="message" id={username === messageContent.author ? 'you' : 'other'}>
              <div className="message-content">
                <p>
                  {messageContent.message}
                </p>
              </div>
              <div className="message-meta">
                <p>
                  {' '}
                  by
                  {' '}
                  {' '}
                  <span className="message-author">{messageContent.author}</span>
                  {' '}
                  {' '}
                  at
                  {' '}
                  {' '}
                  <span className="message-time">{messageContent.time}</span>
                </p>
                <p />
              </div>
            </div>
          ))}
        </ScrollToBottom>
      </div>
      <div className="chat-footer">
        <div className="form__group field">
          <input
            type="input"
            className="form__field"
            placeholder="Enter a message..."
            name="msg"
            id="msg"
            required
            autocomplete='off'
            value={currentMessage}
            onKeyDown={(event) => handleKeypress(event)}
            onChange={(event) => {
              setCurrentMessage(event.target.value);
            }}
            onBlur={() => { setCurrentMessage(''); }}
          />
          <label htmlFor="msg" className="form__label">Message</label>
        </div>
      </div>
      <div className="seperator" />
    </div>
  );
}

export default ChatBox;
