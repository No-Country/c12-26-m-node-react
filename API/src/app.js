const express = require("express");
const morgan = require("morgan");
const routes = require("../src/routes/index");

const cors = require("cors");

const server = express();
server.name = "LatinWallet API";

//server.use(express.json());
server.use(express.json({ // Configuracion para webhook stripe
    verify: function (req, res, buf) {
      let url = req.originalUrl;
      if (url.startsWith('/payment/stripe-web-hook')) {
        req.rawBody = buf.toString();
      }
    }
  }));
server.use(cors());
server.use(morgan("dev"));

server.use("/", routes);

module.exports = server;

