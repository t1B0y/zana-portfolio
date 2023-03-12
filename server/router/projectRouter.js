const express = require('express');

const {
  getAllProjets,
  getProject,
  deleteProject,
  editProject,
  addProject,
  reorder,
} = require('../controllers/projectsControllers.js');

const { deletefiles } = require('../controllers/bucketControllers.js');

const projectRouter = express.Router();

projectRouter.patch('/:projectTitle', editProject, (req, res) => {
  res.status(200).send('project updated');
});

projectRouter.get('/:projectTitle', getProject, function (req, res) {
  res.status(200).json(res.locals.project);
});

projectRouter.delete('/:projectId', deleteProject, deletefiles, (req, res) => {
  res.status(200).json('project deleted successfully');
});

projectRouter.post('/', addProject, (req, res) => {
  res.status(200).json('project added successfully');
});

projectRouter.get('/', getAllProjets, function (req, res) {
  res.status(200).json(res.locals.projects);
});

projectRouter.post('/reorder', reorder, function (req, res) {
  res.status(200).json('reordered');
});

module.exports = projectRouter;
