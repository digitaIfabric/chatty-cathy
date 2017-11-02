Chatty - Cathy
=====================

Small real time web chat application like Slack built with popular libraries such as React, Babel and WebPack.

### Functionality
* Client-side SPA (single-page app) built with ReactJS
* Contains a chat log displaying messages and notifications
* Contains an input field to change your name and an input field to send a message
* The client-side app communicates with a server via WebSockets for multi-user real-time updates
* No persistent database is involved; the focus is on the client-side experience


### Usage

```
git clone git@github.com:digitalfabric92/chatty-cathy.git
cd chatty-cathy
```

Install the dependencies and start the react server

```
npm install
npm start
open http://localhost:3000
```

From the ./server directory, Install the WebSocket server dependencies and start the WS server

```
npm install
npm start
open http://localhost:3001
```

### Dependencies

* React
* Webpack
* [file-loader](https://github.com/webpack-contrib/file-loader)
* [babel-loader](https://github.com/babel/babel-loader)
* [webpack-dev-server](https://github.com/webpack/webpack-dev-server)


### Server Dependencies

* [UUID](https://www.npmjs.com/package/uuid)
* [randomcolor](https://www.npmjs.com/package/randomcolor)

### Screenshots

![screenshot0](https://github.com/digitalfabric92/chatty-cathy/blob/master/build/screenshot0.png?raw=true)
![screenshot1](https://github.com/digitalfabric92/chatty-cathy/blob/master/build/screenshot1.png?raw=true)
