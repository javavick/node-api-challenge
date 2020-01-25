const express = require("express");
const router = express.Router();
// Data
const Actions = require("../data/helpers/actionModel.js");
// Middleware
const {
  validateAction,
  validateActionId,
  validateProjectId
} = require("../middleware/middleware.js");

// GET ("/actions")
router.get("/", (req, res) => {
  Actions.get()
    .then((actions) => res.status(200).json(actions))
    .catch(() =>
      res.status(500).json({
        error: "There was an error trying to retrieve the list of actions."
      })
    );
});

// GET ("/actions/:id")
router.get("/:id", validateActionId, (req, res) => {
  res.status(200).json(req.action);
});

// POST ("/actions")
router.post("/", validateProjectId, validateAction, (req, res) => {
  Actions.insert(req.body)
    .then((action) => res.status(201).json(action))
    .catch(() =>
      res.status(500).json({
        error:
          "There was an error when trying to add the action to the database."
      })
    );
});

// DELETE ("/actions/:id")
router.delete("/:id", validateActionId, (req, res) => {
  Actions.remove(req.params.id)
    .then((num) =>
      res.status(200).json({ message: `${num} record(s) deleted!` })
    )
    .catch(() =>
      res.status(500).json({
        error:
          "There was an error when trying to delete the action from the database."
      })
    );
});

// PUT ("/actions/:id")
router.put(
  "/:id",
  validateProjectId,
  validateAction,
  validateActionId,
  (req, res) => {
    Actions.update(req.params.id, req.body)
      .then((action) => res.status(200).json(action))
      .catch(() =>
        res.status(500).json({
          error: "There was an error when trying to update the project."
        })
      );
  }
);

module.exports = router;
