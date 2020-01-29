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
      res.status(500).json({
        error: "There was an error trying to retrieve the list of projects."
      })
    );
});

// GET ("/projects/:id")
router.get("/:id", validateProjectId, (req, res) => {
  res.status(200).json(req.project);
});

// GET ("/projects/:id/actions")
router.get("/:id/actions", validateProjectId, (req, res) => {
  Projects.getProjectActions(req.params.id)
    .then((actions) => {
      if (actions.length <= 0) {
        res
          .status(404)
          .json({
            message: "The specified project does not have any actions."
          });
      } else {
        res.status(200).json(actions);
      }
    })
    .catch(() =>
      res.status(500).json({
        error: "There was an error trying to retrieve the list of actions."
      })
    );
});

// POST ("/projects")
router.post("/", validateProject, (req, res) => {
  Projects.insert(req.body)
    .then((project) => res.status(201).json(project))
    .catch(() =>
      res.status(500).json({
        error:
          "There was an error when trying to add the project to the database."
      })
    );
});

// DELETE ("/projects/:id")
router.delete("/:id", validateProjectId, (req, res) => {
  Projects.remove(req.params.id)
    .then((num) =>
      res.status(200).json({ message: `${num} record(s) deleted!` })
    )
    .catch(() =>
      res.status(500).json({
        error:
          "There was an error when trying to delete the project from the database."
      })
    );
});

// PUT ("/projects/:id")
router.put("/:id", validateProject, validateProjectId, (req, res) => {
  Projects.update(req.params.id, req.body)
    .then((project) => res.status(200).json(project))
    .catch(() =>
      res.status(500).json({
        error: "There was an error when trying to update the project."
      })
    );
});

module.exports = router;
