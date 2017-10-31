import React, {Component} from 'react';
import Message from './Message.jsx';

class Messages extends Component {
  render() {
    const messageList = this.props.messages; // regular assignment array of messages
    // const {messages} = this.props; // es6 assignment of messages

    console.log("Rendering <MessageList />")
    return (

      <main className="messages">

        {messageList.map((message) => {
        return (<Message key = {message.id} username = {message.username} content = {message.content} />)
        })}

        <div className="message system">
          Anonymous1 changed their name to nomnom.
        </div>
      </main>
    );
  }
}
export default Messages;