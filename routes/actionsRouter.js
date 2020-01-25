const express = require("express");
const router = express.Router();
// Data
const Actions = require("../data/helpers/actionModel.js");

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

module.exports = router;
