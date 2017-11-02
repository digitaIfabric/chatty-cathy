import React, {Component} from 'react';
import Message from './Message.jsx';

class Messages extends Component {
  render() {
    let messageList = this.props.messages; // regular assignment array of messages
    // const {messages} = this.props; // es6 assignment of messages
    return (

      <main className="messages">

        {messageList.map((message) => {
          if (message.type === 'incomingMessage' ) {
            // conditional rendering
            return <Message key={message.id} username={message.username} content={message.content} color={message.color}/>
          }
          else if (message.type === 'incomingNotification' ) {
            return (<div className="message system"> {message.content} </div> );
          }
        })}

      </main>
    );
  }
}
export default Messages;