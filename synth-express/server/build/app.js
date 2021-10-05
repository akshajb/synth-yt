"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _express = _interopRequireDefault(require("express"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

var app = (0, _express["default"])();
app.use(_bodyParser["default"].json());
app.use(_bodyParser["default"].urlencoded({
  extended: false
}));
app.get("/", function (req, res) {
  res.status(200).json({
    message: "I am using babel in NodeJS",
    status: "success"
  });
});
var PORT = process.env.PORT || 4200;
app.listen(PORT, function () {
  console.log("server up and running");
});
//# sourceMappingURL=app.js.map