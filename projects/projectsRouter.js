const express = require("express");
const Projects = require("../data/helpers/projectModel.js");

const router = express.Router();

// GET ("/projects")
router.get("/", (req, res) => {
  Projects.get()
    .then((projects) => res.status(200).json(projects))
    .catch(() =>
      res.status(500).json({ error: "The projects could not be retrieved." })
    );
});

// GET ("/projects/:id")
router.get("/:id", (req, res) => {
  Projects.get(req.params.id)
    .then((project) => {
      if (!project) {
        res
          .status(404)
          .json({ message: "The specified project does not exist." });
      } else {
        res.status(200).json(project);
      }
    })
    .catch(() =>
      res
        .status(500)
        .json({ error: "The specified project could not be retrieved." })
    );
});

module.exports = router;
