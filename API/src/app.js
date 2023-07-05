const express = require("express");
const morgan = require("morgan");
const routes = require("../src/routes/index");
const authRoutes= require('./routes/auth.routes')
const cors = require("cors");

const server = express();
server.name = "LatinWallet API";

server.use(express.json());
server.use(cors());
server.use(morgan("dev"));

server.use("/", routes);
server.use('/api/auth', authRoutes) // Ruta signUp y signIn

module.exports = server;
