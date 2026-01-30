const express = require("express");
const app = express();
const ws = require("ws");

app.listen(3000, () => console.log("Express is running on port 3000"));
const wss = new ws.Server({ port: 5000 });

wss.on("connection", (client, req) => {
  const clients = wss.clients.size;

  console.log("There are a total of clients connected: ", clients);

  client.send("Welcome!");
});

console.log("WebSocket is running on port 5000");
