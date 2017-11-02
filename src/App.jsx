import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';
// import Image from './chatty-cathy.png';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      currentUser: {name: "Anonymous"}, // optional. if currentUser is not defined, it means the user is Anonymous
      messages: []
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
      // Send message to this.state Message
      // Reset the value to an empty string for next message
      e.target.value = '';
    }
  }

  handleNotif(num) {
    //this.setState({})
  }

  //DISPLAY THE INCOMING MESSAGE ON THE CLIENT

  render() {
    // console.log("Rendering <App />")
    return (
      <div>
        <nav className="navbar">
          <a href="/" className="navbar-brand">Chatty-Cathy</a>
        </nav>
        <MessageList messages = {this.state.messages} />
        <ChatBar name = {this.state.currentUser.name} handleKeyDown = {this.handleKeyDown.bind(this)} handleUserChange = {this.handleUserChange.bind(this)}/>
      </div>
    );
  }
}
export default App;




















// import React, {Component} from 'react';
// import MessageList from './MessageList.jsx';
// import ChatBar from './ChatBar.jsx'
// import NavBar from './NavBar.jsx'
//
// class App extends Component {
//   constructor(props) {
//     super(props)
//     this.state = {
//       currentUser: {name: "Anonymous"}, // optional. if currentUser is not defined, it means the user is Anonymous
//       messages: []
//     }
//   }
//
//
//   componentDidMount() {
//     this.socket = new WebSocket('ws://localhost:3001')
//     this.socket.onopen = (e) => {
//       console.log('connected to websocket')
//     }
//     this.socket.onmessage = (e) => {
//       const messages = this.state.messages.concat(JSON.parse(event.data))
//       this.setState({messages: messages})
//     }
//   }
//
//   sendMessage(msg) {
//     this.socket.send(JSON.stringify(msg))
//   }
//
//   changeUser(e) {
//     if(e.key == "Enter"){
//       const newUser = e.target.value
//       const newMessage = { type: 'postNotification', content: `${this.state.currentUser.name} has changed their name to ${newUser}`}
//       this.sendMessage(newMessage)
//       this.setState({currentUser: {name: newUser}})
//     }
//   }
//
//   handleChange(e) {
//     if(e.key == "Enter"){
//       e.preventDefault
//       const newMessage ={ type: 'postMessage', username: this.state.currentUser.name, content: e.target.value }
//       this.sendMessage(newMessage)
//       e.target.value = ''
//     }
//   }
//
//   render() {
//     console.log("Rendering <App/>");
//     return (
//       <div>
//         <NavBar />
//         <MessageList messages = {this.state.messages} />
//         <ChatBar name = {this.state.currentUser.name} handleChange = {this.handleChange.bind(this)} changeUser = {this.changeUser.bind(this)} />
//       </div>
//     );
//   }
// }
// export default App;