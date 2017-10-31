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
    console.log("componentDidMount <App />");
    setTimeout(() => {
      console.log("Simulating incoming message");
      // Add a new message to the list of messages in the data store
      const newMessage = {id: 789, username: "Michelle", content: "Hello there!"};
      const messages = this.state.messages.concat(newMessage)
      // Update the state of the app component.
      // Calling setState will trigger a call to render() in App and all child components.
      this.setState({messages: messages});
    }, 500);
  }

  handleKeyDown(e) {
    if(e.key === "Enter"){
      e.preventDefault()
      const newChatBarMessage ={ username: this.state.currentUser.name, content: e.target.value, id: Math.floor(Math.random() * 20)}
      console.log("KeyDown event tracked");
      console.log("Results: ", this.state.currentUser.name, e.target.value);
      // Send message to this.state Message
      const messages = this.state.messages.concat(newChatBarMessage);
      this.setState({messages: messages});
      // Reset the value to an empty string for next message
      e.target.value = '';
    }
  }

  render() {
    // console.log("Rendering <App />")
    return (
      <div>
        <nav className="navbar">
          <a href="/" className="navbar-brand">Chatty-Cathy</a>
        </nav>
        <MessageList messages = {this.state.messages}/>
        <ChatBar name = {this.state.currentUser.name} handleKeyDown = {this.handleKeyDown.bind(this)}/>
      </div>
    );
  }


}


export default App;