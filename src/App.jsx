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
    console.log('Connected to WebSocket1');
    this.socket.onopen = (e) => {
      console.log('Connected to WebSocket2');
      this.socket.send("Here's some text that the server is urgently awaiting!");

    }


    // USE JSON.parse()
    // let newMsg = JSON.parse(event.data);


    // https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API/Writing_WebSocket_client_applications

    // Send text to all users through the server
    // function sendText() {
    //   // Construct a msg object containing the data the server needs to process the message from the chat client.
    //   var msg = {
    //     type: "message",
    //     text: document.getElementById("text").value,
    //     id:   clientID,
    //     date: Date.now()
    //   };
    //
    //   // Send the msg object as a JSON-formatted string.
    //   exampleSocket.send(JSON.stringify(msg));
    //
    //   // Blank the text input element, ready to receive the next line of text from the user.
    //   document.getElementById("text").value = "";
    // }

    // exampleSocket.onmessage = function(event) {
    //   var f = document.getElementById("chatbox").contentDocument;
    //   var text = "";
    //   var msg = JSON.parse(event.data);
    //   var time = new Date(msg.date);
    //   var timeStr = time.toLocaleTimeString();
    //
    //   switch(msg.type) {
    //     case "id":
    //       clientID = msg.id;
    //       setUsername();
    //       break;
    //     case "username":
    //       text = "<b>User <em>" + msg.name + "</em> signed in at " + timeStr + "</b><br>";
    //       break;
    //     case "message":
    //       text = "(" + timeStr + ") <b>" + msg.name + "</b>: " + msg.text + "<br>";
    //       break;
    //     case "rejectusername":
    //       text = "<b>Your username has been set to <em>" + msg.name + "</em> because the name you chose is in use.</b><br>"
    //       break;
    //     case "userlist":
    //       var ul = "";
    //       for (i=0; i < msg.users.length; i++) {
    //         ul += msg.users[i] + "<br>";
    //       }
    //       document.getElementById("userlistbox").innerHTML = ul;
    //       break;
    //   }
    //
    //   if (text.length) {
    //     f.write(text);
    //     document.getElementById("chatbox").contentWindow.scrollByPages(1);
    //   }
    // };
    // exampleSocket.close();



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


  handleUserChange(e) {
    console.log("UserChange event tracked");
    const User = e.target.value;
    console.log("Username is: ", User);
    this.setState({currentUser: {name: User}});
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
        <ChatBar name = {this.state.currentUser.name} handleKeyDown = {this.handleKeyDown.bind(this)} handleUserChange = {this.handleUserChange.bind(this)}/>
      </div>
    );
  }
}
export default App;