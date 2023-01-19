const db = require("../models/project.js");
const validate = require("../validation.js");

const projectControllers = {};

projectControllers.getAllProjets = (req, res, next) => {
  const queryText = "SELECT * FROM project";
  db.query(queryText, [])
    .then((response) => {
      res.locals.projects = response.rows;
      next();
    })
    .catch((err) => {
      next({
        log: "error in getAllProject middleware",
        status: 500,
        message: err,
      });
    });
};

projectControllers.getProject = (req, res, next) => {
  const queryText = "SELECT * FROM project WHERE title = $1";
  const params = [req.params.projectTitle];
  db.query(queryText, params)
    .then((response) => {
      res.locals.project = response.rows[0];
      next();
    })
    .catch((err) => {
      next({
        log: "error in getProject middleware",
        status: 500,
        message: err,
      });
    });
};

projectControllers.editProject = (req, res, next) => {
  let project = validate(req.body);
  if (typeof project === "string") {
    next({
      log: "missing field",
      status: 500,
      message: { err: project },
    });
  }
  const { projectId, title, subtitle, date, body, role, team } = req.body;
  const queryText =
    "UPDATE project SET title = $1, subtitle = $2, date =$3, body = $4, role = $5, team = $6;";
  const params = [title, subtitle, date, body, role, team].map((el) =>
    el === undefined ? null : el
  );
  db.query(queryText, params)
    .then((response) => {
      res.locals.message = "project updated successfully";
      next();
    })
    .catch((err) => {
      next({
        log: "error in edit middleware",
        status: 500,
        message: err,
      });
    });
};

projectControllers.addProject = (req, res, next) => {
  let project = validate(req.body);
  if (typeof project === "string") {
    next({
      log: "missing field",
      status: 500,
      message: { err: project },
    });
  }
  const queryText =
    "INSERT INTO project (title, subtitle, date, body, role, team) VALUES ($1,$2,$3,$4,$5,$6) \n" +
    "RETURNING id ";
  const params = [
    project.title,
    project.subtitle,
    project.date,
    project.body,
    project.role,
    project.team,
  ];
  db.query(queryText, params)
    .then((response) => {
      res.locals.projectId = response.rows[0].id;
      res.locals.message = "project added successfully to db";
      next();
    })
    .catch((err) => {
      next({
        log: "error in addProject middleware",
        status: 500,
        message: err,
      });
    });
};

projectControllers.deleteProject = (req, res, next) => {
  const queryText = "DELETE FROM project WHERE title = $1";
  const params = [req.params.projectTitle];
  db.query(queryText, params)
    .then((response) => {
      res.locals.message = `project ${req.params.projectTitle} deleted`;
      next();
    })
    .catch((err) => {
      next({
        log: "error in deleteProject middleware",
        status: 500,
        message: err,
      });
    });
};

projectControllers.uploadFile = (req, res, next) => {
  const queryText = "DELETE FROM project WHERE title = $1";
  const params = [req.params.projectTitle];
  db.query(queryText, params)
    .then((response) => {
      res.locals.message = `project ${req.params.projectTitle} deleted`;
      next();
    })
    .catch((err) => {
      next({
        log: "error in deleteProject middleware",
        status: 500,
        message: err,
      });
    });
};

projectControllers.addBlankImage = (req, res, next) => {
  let id = res.locals.projectId;
  const queryText =
    "INSERT INTO image (project_id, name, url) VALUES ($1,'frontImage',$2), ($1,'image1',$2),($1,'image2',$2),($1,'image3',$2),($1,'image4',$2)";
  const params = [
    id,
    "https://portfolio-marvin-zana.s3.amazonaws.com/default.png",
  ];
  console.log(queryText);
  db.query(queryText, params)
    .then((response) => {
      next();
    })
    .catch((err) => {
      next({
        log: "error in addBlankImage middleware",
        status: 500,
        message: err,
      });
    });
};
module.exports = projectControllers;
