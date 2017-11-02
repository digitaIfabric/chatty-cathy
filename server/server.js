// server.js
const express = require('express');
const SocketServer = require('ws');
const uuid4 = require ('uuid/v4');
const randomColor = require('randomcolor');
//var color = randomColor();

// Set the port to 3001
const PORT = 3001;

// Create a new express server
const server = express()
// Make the express server serve static assets (html, javascript, css) from the /public folder
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));

// Create the WebSockets server
const wss = new SocketServer.Server({ server });


// Broadcast to all.
wss.broadcast = function broadcast(data) {
  wss.clients.forEach(function each(client) {
    if (client.readyState === SocketServer.OPEN) {
      client.send(data);
    }
  });
};

// Set up a callback that will run when a client connects to the server
// When a client connects they are assigned a socket, represented by
// the ws parameter in the callback.
wss.on('connection', (ws) => {

  // client.onmessage = (event) => {
  // let msg = JSON.parse(event.data)
  // msg.uuid = uuid4()

  //console.log('Client connected');
  ws.on('message', (message) => {
    let msg = JSON.parse(message);
    //console.log("The msg:", msg);
    // postMessage, postNotification;
    // server receives message above and then broadcasts this to all clients
    // {"type": "incomingMessage", "id": "0b2635a4-82b0-4e49-803e-2b901be71cf6", "username": "Bob", "content": "Hi"}
    console.log("USER ", msg.username, " said ", msg.content);
    switch(msg.type) {
      case "postMessage":
        msg.type = 'incomingMessage';
        break
      case "postNotification":
        msg.type = 'incomingNotification';
        // msg.color = randomColor();
        break
      default:
        console.log("Message.type is: ", msg.type)
    }
    msg.id = uuid4();
    msg.color = randomColor();
    console.log(msg.color);
    console.log("Message with type: ", msg);
    wss.broadcast(JSON.stringify(msg));

});

  // Set up a callback for when a client closes the socket. This usually means they closed their browser.
  ws.on('close', () => console.log('Client disconnected'));
});


