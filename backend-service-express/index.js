const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const cors = require("cors"); // Import CORS

const app = express();
const server = http.createServer(app);

// Enabling CORS for all origins
const corsOptions = {
  origin: "http://localhost:4200",
  methods: ["GET", "POST"],
  allowedHeaders: ["Content-Type"],
  credentials: true,
};

// Applying CORS middleware
app.use(cors(corsOptions));

const io = socketIo(server, {
  cors: {
    origin: "http://localhost:4200",
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type"],
    credentials: true,
  },
});

const users = [];

// Handle new socket connections
io.on("connection", (socket) => {
  console.log("A user connected");

  // Registering user by userId
  socket.on("register", (userId) => {
    console.log(`User ${userId} registered`);
    users[userId] = socket; // Registering the socket for the user
  });

  // Handling disconnections
  socket.on("disconnect", () => {
    console.log("User disconnected");
    for (let userId in users) {
      if (users[userId] === socket) {
        delete users[userId];
      }
    }
  });
});

// Endpoint to receive notifications from Spring Boot
app.post("/send-notification", express.json(), (req, res) => {
  const { message, userId } = req.body;
  console.log(`Received notification for user ${userId}: ${message}`);

  // Sending the notification to the specific user via their socket
  if (users[userId]) {
    users[userId].emit("notification", { message });
    console.log(`Notification sent to user ${userId}`);
  } else {
    console.log(`User ${userId} is not connected`);
  }

  res.status(200).send("Notification sent");
});

// Starting the server
server.listen(3000, () => {
  console.log("Server listening on port 3000");
});
