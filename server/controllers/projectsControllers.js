const db = require('../models/project.js');
const validate = require('../validation.js');

const projectControllers = {};

projectControllers.getAllProjets = (req, res, next) => {
  const queryText = 'SELECT * FROM project ORDER BY position ASC';
  db.query(queryText, [])
    .then((response) => {
      res.locals.projects = response.rows;
      next();
    })
    .catch((err) => {
      next({
        log: 'error in getAllProject middleware',
        status: 500,
        message: err,
      });
    });
};

projectControllers.getProject = (req, res, next) => {
  const queryText = 'SELECT * FROM project WHERE title = $1';
  const params = [req.params.projectTitle];
  db.query(queryText, params)
    .then((response) => {
      res.locals.project = response.rows[0];
      next();
    })
    .catch((err) => {
      next({
        log: 'error in getProject middleware',
        status: 500,
        message: err,
      });
    });
};

projectControllers.editProject = (req, res, next) => {
  let project = validate(req.body);
  if (typeof project === 'string') {
    next({
      log: 'missing field',
      status: 500,
      message: { err: project },
    });
  }
  const { projectId, title, subtitle, date, body, role, team } = req.body;
  const queryText =
    'UPDATE project SET title = $1, subtitle = $2, date =$3, body = $4, role = $5, team = $6 ' +
    'RETURNING id ';
  const params = [title, subtitle, date, body, role, team].map((el) =>
    el === undefined ? null : el
  );
  db.query(queryText, params)
    .then((response) => {
      res.locals.id = response.rows[0].id;
      res.locals.message = 'project updated successfully';
      next();
    })
    .catch((err) => {
      next({
        log: 'error in edit middleware',
        status: 500,
        message: err,
      });
    });
};

projectControllers.addProject = (req, res, next) => {
  let project = validate(req.body);
  if (typeof project === 'string') {
    next({
      log: 'missing field',
      status: 500,
      message: { err: project },
    });
  }
  const queryText =
    'INSERT INTO project (title, subtitle, date, body, role, team, position) VALUES ($1,$2,$3,$4,$5,$6, $7) \n' +
    'RETURNING id ';
  const params = [
    project.title,
    project.subtitle,
    project.date,
    project.body,
    project.role,
    project.team,
    project.position,
  ];
  db.query(queryText, params)
    .then((response) => {
      res.locals.projectId = response.rows[0].id;
      res.locals.message = 'project added successfully to db';
      next();
    })
    .catch((err) => {
      next({
        log: 'error in addProject middleware',
        status: 500,
        message: err,
      });
    });
};

projectControllers.deleteProject = (req, res, next) => {
  console.log(req.params, req.body);
  const queryText = `DELETE FROM project p WHERE p.id = $1`;
  const params = [req.params.projectId];
  db.query(queryText, params)
    .then((res) => {
      next();
    })
    .catch((err) => {
      next({
        log: 'error in deleteProject middleware',
        status: 500,
        message: err,
      });
    });
};

projectControllers.reorder = async (req, res, next) => {
  const { oldPos, newPos, id } = req.body;
  const direction = newPos > oldPos ? 'down' : 'up';
  const query1 = `UPDATE project  SET    position = 0  WHERE  position = $1 AND id = $2 `;
  try {
    await db.query(query1, [oldPos, id]);
    if (direction === 'down') {
      const query2 = `UPDATE project  SET    position = ( position - 1 )  WHERE  position > $1  AND position <= $2  `;
      await db.query(query2, [oldPos, newPos]);
    } else {
      const query2 = `UPDATE project SET    position = ( position + 1 ) WHERE  position >= $2 AND position < $1   `;
      await db.query(query2, [oldPos, newPos]);
    }
    const query3 = `UPDATE project  SET  position = $1 WHERE  position = 0 AND id = $2  `;
    await db.query(query3, [newPos, id]);
    next();
  } catch (err) {
    console.log(err);
  }
};

module.exports = projectControllers;
