const Projects = require("../data/helpers/projectModel.js");
const Actions = require("../data/helpers/actionModel.js");

// PROJECTS
const validateProject = (req, res, next) => {
  if (!req.body.name || !req.body.description) {
    res
      .status(400)
      .json({ message: "Missing required name or description field." });
  } else {
    next();
  }
};

const validateProjectId = (req, res, next) => {
  Projects.get(req.params.id)
    .then((project) => {
      if (!project) {
        res
          .status(404)
          .json({ message: "The specified project does not exist." });
      } else {
        req.project = project;
        next();
      }
    })
    .catch(() =>
      res
        .status(500)
        .json({ error: "The specified project could not be retrieved." })
    );
};

// ACTIONS
const validateAction = (req, res, next) => {
  if (!req.body.project_id || !req.body.description || !req.body.notes) {
    res.status(400).json({
      message: "Missing required notes, description, or project_id field."
    });
  } else if (req.body.description.length > 128) {
    res
      .status(400)
      .json({ message: "Description must be 128 characters or less." });
  } else {
    next();
  }
};

const validateActionId = (req, res, next) => {
  Actions.get(req.params.id)
    .then((action) => {
      if (!action) {
        res
          .status(404)
          .json({ message: "The specified action does not exist." });
      } else {
        req.action = action;
        next();
      }
    })
    .catch(() =>
      res
        .status(500)
        .json({ error: "The specified action could not be retrieved." })
    );
};

module.exports = {
  validateProject,
  validateProjectId,
  validateAction,
  validateActionId
};
