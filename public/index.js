const ws = new WebSocket("ws://localhost:5000"); // Initiates a WebSocket instance, which will be recognized by the server as a client
const form = document.getElementById("chatInput");
const chat = document.getElementById("chat");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const formData = new FormData(form);
  const msg = formData.get("message");
  ws.send(msg);

  form.reset();
});

ws.onmessage = (msg) => {
  sendMessage(msg.data);
};

function sendMessage(text) {
  const newDiv = document.createElement("div");
  newDiv.textContent = text;
  chat.appendChild(newDiv);
}
