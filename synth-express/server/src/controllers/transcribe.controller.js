import { transcribeYoutube } from "../models/transcribe.model";
import { mockDatabase } from "../app";

exports.transcribeController = (req, res) => {
  console.log(req.body);
  const url = req.body.url;
  const username = req.body.username;
  const io = require("../socket.js").get();
  if (url) {
    transcribeYoutube(url)
      .then((result) => {
        console.log(mockDatabase);
        const text = result.map((sub) => sub.text).join("");
        const user = mockDatabase.filter((user) => user.username === username)[
          mockDatabase.length - 1
        ];

        if (user) {
          console.log(user);
          io.to(user.socketId).emit("subtitle", text);
        }
        res.status(200).json({
          video_url: url,
          subtitleContent: text,
        });
      })
      .catch((err) => {
        res.status(401).json({
          error: err.message,
        });
      });
  } else {
    res.status(401).json({
      error: "Missing attribute url",
    });
  }
};
