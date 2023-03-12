const db = require('../models/project.js');
const validate = require('../validation.js');

const projectControllers = {};

projectControllers.getAllProjets = (req, res, next) => {
  const queryText =
    'SELECT id,title,subtitle,body,role,team,date,position,card,image1,image2,image3,image4,video,clip ' +
    'FROM project p ' +
    'LEFT JOIN files f ' +
    'ON p.id = f.project_id ';
  db.query(queryText, [])
    .then((response) => {
      res.locals.projects = response.rows;
      next();
    })
    .catch((err) => {
      console.log(err);
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

projectControllers.addProject = async (req, res, next) => {
  try {
    // count project to know postion of added project
    const countQuery = 'SELECT count(*) AS count FROM project;';

    let position = await db.query(countQuery, []);
    position = position.rows[0].count + 1;
    //insert project into project table
    const queryProjectTable =
      'INSERT INTO project (title, subtitle, date, body, role, team, position) VALUES ($1,$2,$3,$4,$5,$6,$7) ' +
      'RETURNING id ';
    const paramsProject = [
      req.body.title,
      req.body.subtitle,
      req.body.date,
      req.body.body,
      req.body.role,
      req.body.team,
      position,
    ];

    // insert default file S3 link in files table
    const id = await db.query(queryProjectTable, paramsProject);
    const queryFilesTable =
      'INSERT INTO files (card, image1, image2, image3, image4, video, clip, "project_id") VALUES ($1,$1,$1,$1,$1,$1,$1, $2) \n';

    const paramsFiles = [
      'https://portfolio-m.s3.amazonaws.com/default.png',
      id.rows[0].id,
    ];
    await db.query(queryFilesTable, paramsFiles);
    next();
  } catch (err) {
    console.log(err);
    next({
      log: 'error in addProject middleware',
      status: 500,
      message: err,
    });
  }
};

projectControllers.deleteProject = async (req, res, next) => {
  try {
    const query1 = `DELETE FROM project p WHERE p.id = $1`;
    const query2 = `DELETE FROM files p WHERE "project_id" = $1`;
    const params = [req.params.projectId];
    await db.query(query2, params);
    await db.query(query1, params);
    return next;
  } catch (err) {
    console.log(err);
    return next({
      log: 'error in deleteProject middleware',
      status: 500,
      message: err,
    });
  }
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

projectControllers.addImage = async (req, res, next) => {
  const queryText = `UPDATE project SET $1 = $2 WHERE id = $3`;
  const params = [
    req.body.imageName,
    `https://portfolio-m.s3.amazonaws.com/${req.params.projectTitle}/${req.body.imageName}.jpg`,
    req.body.id,
  ];
  console.log(params);
  try {
    await db.query(queryText, params);
    next();
  } catch (err) {
    console.log(err);
    return next({
      log: 'error in addImage middleware',
      status: 500,
      message: err,
    });
  }
};

module.exports = projectControllers;
