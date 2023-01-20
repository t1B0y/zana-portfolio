const db = require("../models/project.js");
const validate = require("../validation.js");
const fs = require("fs");
const AWS = require("aws-sdk");

const s3 = new AWS.S3({
  accessKeyId: "AKIAULV76D667P5FRC7R",
  secretAccessKey: "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",
  region: "us-east-1",
});

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
    "UPDATE project SET title = $1, subtitle = $2, date =$3, body = $4, role = $5, team = $6 " +
    "RETURNING id ";
  const params = [title, subtitle, date, body, role, team].map((el) =>
    el === undefined ? null : el
  );
  db.query(queryText, params)
    .then((response) => {
      res.locals.id = response.rows[0].id;
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
  const queryText1 = `DELETE FROM image i WHERE i.project_id = $1 ;`;
  const queryText2 = `DELETE FROM project p WHERE p.id = $1`;
  const params = [req.params.projectTitle];
  console.log(params);
  db.query(queryText1, params)
    .then((response) => {
      db.query(queryText2, params)
        .then((res) => {
          next();
        })
        .catch((err) => {
          next({
            log: "error in deleteProject middleware",
            status: 500,
            message: err,
          });
        });
    })
    .catch((err) => {
      console.log;
      next({
        log: "error in deleteProject middleware",
        status: 500,
        message: err,
      });
    });
};

projectControllers.uploadFile = async (req, res, next) => {
  if (req.file == null) {
    return res.status(400).json({ message: "Please choose the file" });
  }
  const file = req.file;
  const extension = /[^.]+$/.exec(file.originalname)[0];
  file.originalname = `${req.query.title}_${req.query.image}.${extension}`;
  const fileStream = fs.createReadStream(file.path);
  const params = {
    Bucket: "portfolio-marvin-zana",
    Key: file.originalname,
    Body: fileStream,
  };
  await s3.upload(params, function (err, data) {
    if (err) {
      next({
        log: "error while upload image to s3",
        status: 500,
        message: err,
      });
    }
  });
  res.locals.fileInfo = {
    project: req.query.title,
    name: req.query.image,
    url: `https://portfolio-marvin-zana.s3.amazonaws.com/${file.originalname}`,
  };
  console.log("file uloaded to s3");
  next();
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

projectControllers.addUrlToDb = (req, res, next) => {
  const { name, url } = res.locals.fileInfo;
  const queryText = `UPDATE image SET url = $2 WHERE image.name = $1 AND image.project_id = $3`;
  const params = [name, url, req.query.projectId];
  console.log(params);
  db.query(queryText, params)
    .then((response) => {
      next();
    })
    .catch((err) => {
      next({
        log: "error in addUrlToDb middleware",
        status: 500,
        message: err,
      });
    });
};

projectControllers.getImages = (req, res, next) => {
  const id = req.params.projectId;
  const queryText = `SELECT url, name FROM image WHERE image.project_id = $1`;
  const params = [id];
  db.query(queryText, params)
    .then((response) => {
      res.locals.images = response.rows;
      next();
    })
    .catch((err) => {
      next({
        log: "error in getImages middleware",
        status: 500,
        message: err,
      });
    });
};

module.exports = projectControllers;
