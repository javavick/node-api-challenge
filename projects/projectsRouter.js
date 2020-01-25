const express = require("express");
const Projects = require("../data/helpers/projectModel.js");

const router = express.Router();

// GET ("/projects")
router.get("/", (req, res) => {
  Projects.get()
    .then((projects) => res.status(200).json(projects))
    .catch(() =>
      res.status(500).json({ error: "The data could not be retrieved." })
    );
});

module.exports = router;
