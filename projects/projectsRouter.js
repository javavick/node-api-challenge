const express = require("express");
const router = express.Router();
// Data
const Projects = require("../data/helpers/projectModel.js");
// Middleware
const {
  validateProject,
  validateProjectId
} = require("../middleware/middleware.js");

// GET ("/projects")
router.get("/", (req, res) => {
  Projects.get()
    .then((projects) => res.status(200).json(projects))
    .catch(() =>
      res.status(500).json({ error: "The projects could not be retrieved." })
    );
});

// GET ("/projects/:id")
router.get("/:id", validateProjectId, (req, res) => {
  res.status(200).json(req.project);
});

// POST ("/projects")
router.post("/", validateProject, (req, res) => {
  Projects.insert(req.body)
    .then((project) => res.status(200).json(project))
    .catch(() =>
      res.status(500).json({
        error:
          "There was an error when trying to add the project to the database."
      })
    );
});

// DELETE ("/projects")
router.delete("/:id", validateProjectId, (req, res) => {
  Projects.remove(req.params.id)
    .then((num) =>
      res.status(200).json({ message: `${num} record(s) deleted!` })
    )
    .catch(() =>
      res
        .status(500)
        .json({
          error:
            "There was an error when trying to delete the project from the database."
        })
    );
});

module.exports = router;
