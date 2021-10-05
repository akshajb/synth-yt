import express from "express";
import { transcribeController } from "./controllers/transcribe.controller";
const { createServer } = require("http");
const cors = require("cors");

const app = express();
const server = createServer(app);

const io = require("./socket.js").init(server);

const mockDatabase = [];

app.use(cors({ origin: "*" }));

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.post("/transcribe", transcribeController);

io.on("connection", (socket) => {
  console.log(`connected to ${socket.id}`);
  socket.on("sendUsername", (data) => {
    const user = mockDatabase.filter((user) => {
      user.username == data;
    })[0];
    if (user) {
      user.socketId = socket.id;
    } else {
      mockDatabase.push({
        username: data,
        socketId: socket.id,
      });
    }
  });
});

const PORT = process.env.PORT || 4200;
server.listen(PORT, () => {
  console.log("server up and running");
});

export { mockDatabase };
