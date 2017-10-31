import React, {Component} from 'react';

  class Chatbar extends Component {
    render() {
          console.log("Rendering <ChatBar />")
          return (
              <div className="chatbar">
                <input className="chatbar-username" defaultValue={this.props.name} />
                <input className="chatbar-message" placeholder="Write a message" onKeyDown={this.props.handleKeyDown} />
              </div>
            );
        }
  }
export default Chatbar;