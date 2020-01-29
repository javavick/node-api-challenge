const express = require("express");
const projectsRouter = require("./routes/projectsRouter.js");
const actionsRouter = require("./routes/actionsRouter.js");
const server = express();

server.use(express.json());
server.use("/projects", projectsRouter);
server.use("/actions", actionsRouter);

server.listen(8000, () => console.log("*** API ON PORT: 8000 ***"));
