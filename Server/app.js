const express = require("express");
require("dotenv").config();
const cors = require("cors");
const dbConnection = require("./config/dbConnection");
const { notFound, errorHandler } = require("./middlewares/error");
const morgan = require("morgan");
// Add the following line to import the socket.io library
const http = require("http");
const path = require("path");

//init app
const app = express();
const port = process.env.PORT || 5000;

//Middlewares
if (process.env.NODE_ENV == "development") {
  app.use(morgan("dev"));
}
app.use(cors());
//test connetion
app.get("/", (req, res) => {
  res.send("The brave coders");
});
//Routes
app.use("/api/auth", require("./routes/auth.routes"));
app.use("/api/analyze", require("./routes/Analyze.routes"));
app.use("/api/user", require("./routes/user.routes"));
app.use("/api/storage", require("./routes/storage.routes"));
app.use("/api/result", require("./routes/results.routes"));
app.use("/api/payment", require("./routes/payment.routes"));
app.use("/api/massage", require("./routes/massage.routes"));
app.use("/api/guest", require("./routes/guest.routes"));
app.use("/api/advertisements", require("./routes/advertisements.routes"));

//Error handler middleware
app.use(notFound);
app.use(errorHandler);

//Connection to database
let server = null;
dbConnection()
  .then(() => {
    server = app.listen(port, () => console.log(`http://localhost:${port}`));
    //  console.log(server)
  })
  .catch((err) => console.log(err));

//Socket.io connection handling
// io.on("connection", (socket) => {
//   console.log("A user connected");

//   // Disconnect event handling
//   socket.on("disconnect", () => {
//     console.log("User disconnected");
//   });
// });
const socketIO = require("socket.io");
const io = socketIO(server);

io.on("connection", (socket) => {
  console.log("A user connected");

  // Event handler for when a new chat message is received
  socket.on("chat-message", (message) => {
    console.log("Received message:", message);
    // Broadcast the message to all connected clients
    io.emit("chat-message", message);
  });

  // Event handler for when a new feedback is received
  socket.on("feedback", (data) => {
    console.log("Received feedback:", data);
    // Broadcast the feedback to all connected clients
    io.emit("feedback", data);
  });

  // Disconnect event handling
  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});
