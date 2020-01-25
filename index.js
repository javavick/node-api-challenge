const express = require("express");
const projectsRouter = require("./projects/projectsRouter.js");
const server = express();

server.use(express.json());
server.use("/projects", projectsRouter);

server.listen(8000, () => console.log("*** API ON PORT: 8000 ***"));
