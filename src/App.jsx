import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';
// import Image from './chatty-cathy.png';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      currentUser: {name: "Bob"}, // optional. if currentUser is not defined, it means the user is Anonymous
      messages: [
        {
          username: "Bob",
          content: "Has anyone seen my marbles?",
          id: "123"
        },
        {
          username: "Anonymous",
          content: "No, I think you lost them. You lost your marbles Bob. You lost them for good.",
          id: "456"
        }
      ]
    }
  }

  componentDidMount() {
    this.socket = new WebSocket('ws://localhost:3001');
    console.log('Connected to WebSocket 1st log');

    this.socket.onopen = (e) => {
      console.log('Connected to WebSocket 2nd log');
      this.setState({socket:this.socket});
    }

    this.socket.onmessage = (e) => {
      //console.log(event);
      let newMsg = JSON.parse(event.data)
      console.log(newMsg);
      const messages = this.state.messages.concat(newMsg);
      this.setState({messages: messages});
    }
  }

  handleUserChange(e) {
    console.log("UserChange event tracked");
    const User = e.target.value;
    console.log("Username is: ", User);
    this.setState({currentUser: {name: User}});
    }

  handleKeyDown(e) {
    if(e.key === "Enter"){
      e.preventDefault()
      const newChatBarMessage ={ username: this.state.currentUser.name, content: e.target.value}
      console.log("KeyDown event tracked");
      this.state.socket.send(JSON.stringify(newChatBarMessage));
      // Send message to this.state Message
      // Reset the value to an empty string for next message
      e.target.value = '';
    }
  }

  //DISPLAY THE INCOMING MESSAGE ON THE CLIENT

  render() {
    // console.log("Rendering <App />")
    return (
      <div>
        <nav className="navbar">
          <a href="/" className="navbar-brand">Chatty-Cathy</a>
        </nav>
        <MessageList messages = {this.state.messages}/>
        <ChatBar name = {this.state.currentUser.name} handleKeyDown = {this.handleKeyDown.bind(this)} handleUserChange = {this.handleUserChange.bind(this)}/>
      </div>
    );
  }
}
export default App;