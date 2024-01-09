const express = require("express");
require("dotenv").config();
const cors = require("cors");
const dbConnection = require("./config/dbConnection");
const { notFound, errorHandler } = require("./middlewares/error");
const morgan = require("morgan");
//
// const Sockit = require("socket.io");
// const { Server } = require("socket.io");
// const http = require('http');

//init app
const app = express();
const port = process.env.PORT || 5000;
//Middlewares
if (process.env.NODE_ENV == "development") {
  app.use(morgan("dev"));
}
app.use(express.json());
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
dbConnection()
  .then(() => {
    app.listen(port, () => console.log(`http://localhost:${port}`));

  })
  .catch((err) => console.log(err));
//Sockit io
// try {
//   // const io = Sockit(app);
//   const io = new Server();
//   io.on('connection', (socket) => {
//     socket.emit("hello");
//     console.log(socket.id);
//     console.log("done");
//     socket.on("ttt",(arg)=>{
//       console.log(arg);

//     })
//   })
//   console.log("zzzzzzzzzz");

// } catch (error) { // intercept the error in catch block
//   console.log("rrrrrrrrr");

//   console.log("not done");

// }