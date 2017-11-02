import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';
import Image from '../build/chatty-cathy.png';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      currentUser: {name: "Anonymous"}, // optional. if currentUser is not defined, it means the user is Anonymous
      messages: [],
      clientCount: 0
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
      let messages = this.state.messages.concat(newMsg)
      console.log("the newMsg array: ",newMsg.type);
      switch (newMsg.type) {
        case 'incomingMessage':
          // Handle incoming message
          console.log("The color is", newMsg.color);
          this.setState({messages: messages})
          break
        case 'incomingNotification':
          // Handle incoming notification
          this.setState({messages: messages})
          break
        case 'userCount':
          // Handle incoming user count
          this.setState({clientCount: newMsg.count})//TODO value extracted out of newMsg})
          break
        default:
          this.setState({messages: messages})
      }
    }
  }

  handleUserChange(e) {
    console.log("UserChange event tracked");
    const newUser = e.target.value;
    console.log("Username is: ", newUser);
    if (newUser !== this.state.currentUser.name) {
    const newMessage = {
      type: 'postNotification',
      username: this.state.username,
      content: `${this.state.currentUser.name} has changed their name to ${newUser}`
    }
      // Send message
      this.state.socket.send(JSON.stringify(newMessage));
      this.setState({currentUser: {name: newUser}});
    } else {
      console.log("newUser == New state");
    } }

  handleKeyDown(e) {
    if(e.key === "Enter"){
      e.preventDefault()
      const newChatBarMessage = {type: 'postMessage', username: this.state.currentUser.name, content: e.target.value}
      console.log("KeyDown event tracked");
      this.state.socket.send(JSON.stringify(newChatBarMessage));
      //

      // socket.io 90%
      // Send message to this.state Message
      // Reset the value to an empty string for next message
      e.target.value = '';
    }
  }

  render() {
    // console.log("Rendering <App />")
    return (
      <div>
        <nav className="navbar">
          <img className="navbar-image" src={Image} />
          <a href="/" className="navbar-brand">Chatty-Cathy</a>
          <div className="current-users">
            {this.state.clientCount} user(s) online
          </div>
        </nav>
        <MessageList messages = {this.state.messages} />
        <ChatBar name = {this.state.currentUser.name} handleKeyDown = {this.handleKeyDown.bind(this)} handleUserChange = {this.handleUserChange.bind(this)}/>
      </div>
    );
  }
}
export default App;
