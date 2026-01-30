const express = require("express");
const app = express();
const ws = require("ws");
const url = require("url");

app.set("view engine", "ejs");

app.use(express.static("public"));

app.get("/", (_, res) => {
  res.render("index");
});

app.listen(3000, () => console.log("Express is running on port 3000"));

const wss = new ws.Server({ port: 5000 });

// Activating event lister on websocket server to listen on connections
wss.on("connection", (client, req) => {
  const userQuery = req.url; // We can access the request object from here and pass it query parameters when connecting from the client
  const user = url.parse(userQuery, true).query.user;

  const clients = wss.clients; // The clients represents a big object of every connected client
  const totalConnected = wss.clients.size; // Gets the total of connections available

  console.log("There are a total of clients connected: ", totalConnected);

  client.send(JSON.stringify({ msg: `Welcome to the chat ${user}, be polite!` })); // Sends a welcome message to the connected client right away

  // Listens on WebSocket messages
  client.on("message", (data) => {
    if (!data) return; // Early return if data is empty

    const msg = data.toString(); // converts the received message to human readable string format (buffer orginally)

    // Sends back the received message to every client connected
    clients.forEach((c) => {
      c.send(
        JSON.stringify({
          user,
          msg,
        }),
      );
    });

    // Console logs the received message
    console.log("WebSocket received a message: ", msg);
  });
});

console.log("WebSocket is running on port 5000");
