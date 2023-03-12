const express = require('express');
const imageRouter = express.Router();
const { uploadFile, getKeys } = require('../controllers/bucketControllers.js');
const { addImage } = require('../controllers/projectsControllers.js');

const multer = require('multer');
const upload = multer();

imageRouter.post(
  '/:projectTitle',
  upload.any(),
  uploadFile,
  addImage,
  (req, res) => {
    res.status(201).json('image successfully added');
  }
);

imageRouter.get('/:projectTitle', getKeys, function (req, res) {
  res.status(200).json(res.locals.keys);
});

module.exports = imageRouter;
