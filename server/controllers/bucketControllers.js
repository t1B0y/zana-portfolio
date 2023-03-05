const db = require('../models/project.js');
const validate = require('../validation.js');
const fs = require('fs');
const {
  S3Client,
  PutObjectCommand,
  DeleteObjectsCommand,
  GetObjectCommand,
  ListObjectsCommand,
} = require('@aws-sdk/client-s3');
require('dotenv').config();

const secretKey = process.env.AWS_SECRET_KEY;
const accessKey = process.env.AWS_ACCESS_KEY;
const bucketRegion = process.env.BUCKET_REGION;
const bucketName = process.env.BUCKET_NAME;

const s3 = new S3Client({
  credentials: {
    accessKeyId: accessKey,
    secretAccessKey: secretKey,
  },
  region: bucketRegion,
});

const bucketControllers = {};

bucketControllers.uploadFile = async (req, res, next) => {
  const extension = /[^.]+$/.exec(req.files[0].originalname)[0];
  const params = {
    Bucket: bucketName,
    Key: `${req.params.projectTitle}_${req.query.image}.${extension}`,
    Body: req.files[0].buffer,
    ContentType: req.files[0].mimetype,
  };
  const command = new PutObjectCommand(params);
  GetObjectCommand;

  try {
    await s3.send(command);
    next();
  } catch (err) {
    next({
      log: 'error in uploadFIle middleware',
      status: 500,
      message: { err: 'Error while uploading image to bucket' },
    });
  }
};

bucketControllers.getKeys = async (req, res, next) => {
  const paramsList = {
    Bucket: bucketName,
    Prefix: `${req.params.projectTitle}`,
  };

  const listCommand = new ListObjectsCommand(paramsList);

  try {
    let { Contents } = await s3.send(listCommand);
    if (!Contents) Contents = [];
    let keys = Contents.map((l) => l.Key);
    res.locals.keys = keys;
    next();
  } catch (err) {
    next({
      log: `error in List file middleware : ${err}`,
      status: 500,
      message: { err: 'Error while uploading image to bucket' },
    });
  }
};

bucketControllers.deletefiles = async (req, res, next) => {
  const params = {
    Bucket: bucketName,
    Delete: {
      Objects: [
        {
          Key: `${req.body.projectName}_imageFront.jpg`,
        },
        {
          Key: `${req.body.projectName}_image1.jpg`,
        },
        {
          Key: `${req.body.projectName}_image2.jpg`,
        },
        {
          Key: `${req.body.projectName}_image3.jpg`,
        },
        {
          Key: `${req.body.projectName}_image4.jpg`,
        },
      ],
    },
    Quiet: false,
  };

  const command = new DeleteObjectsCommand(params);

  try {
    await s3.send(command);
    next();
  } catch (err) {
    console.log(err);
    next({
      log: `error in deleteFile middleware :  ${err}`,
      status: 500,
      message: { err: 'Error while deleting images from bucket' },
    });
  }
};

module.exports = bucketControllers;
