const Projects = require("../data/helpers/projectModel.js");

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

module.exports = { validateProject, validateProjectId };