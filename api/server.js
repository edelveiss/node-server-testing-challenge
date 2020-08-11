const express = require("express");
const helmet = require("helmet");

const carsRouter = require("../cars/car-router.js");

const server = express();

server.use(helmet());
server.use(express.json());

server.use("/api/cars", carsRouter);
//API test
server.get("/", (req, res) => {
  res.status(200).send(`
            <h2>Lambda Cars API</h>
            <p>Welcome to the Lambda Cars API</p>
          `);
});

module.exports = server;
