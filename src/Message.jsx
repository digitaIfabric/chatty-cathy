import React, {Component} from 'react';

class Message extends Component {
  render() {
    console.log("render message")
        let myColor = this.props.color;
        return (
          <div className="message">
            <span className="message-username" style={{color:myColor}}>{this.props.username}</span>
            <span className="message-content">{this.props.content}</span>
          </div>
        )
    }
}
export default Message;