import React, {Component} from 'react';
class Messages extends Component {
  render() {
    console.log("Rendering <MessageList/>")
    return (
      <main className="messages">

        <div className="message system">
          Anonymous1 changed their name to nomnom.
        </div>
      </main>
    );
  }
}
export default Messages;