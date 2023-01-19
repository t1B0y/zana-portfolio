const AWS = require("aws-sdk");
const express = require("express");
const {
  getAllProjets,
  getProject,
  deleteProject,
  editProject,
  addProject,
  addBlankImage,
} = require("./controllers/projectsControllers.js");
const cors = require("cors");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });
const fs = require("fs");

const app = express();
const PORT = 3000;

const corsOptions = {
  origin: "*",
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};

app.use(cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const s3 = new AWS.S3({
  accessKeyId: "AKIAULV76D667P5FRC7R",
  secretAccessKey: "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",
  region: "us-east-1",
});

// app.post("/project/file", upload.single("file"), (req, res) => {
//   if (req.file == null) {
//     return res.status(400).json({ message: "Please choose the file" });
//   }
//   const file = req.file;
//   const body = Object.assign({}, req.body);
//   console.log(file.originalname, "before");

//   file.originalname = `${req.query.title}_${req.query.image}.jpg`;
//   console.log(file.originalname, "after");
//   //console.log(file, req.body);
//   const uploadImage = (file) => {
//     const fileStream = fs.createReadStream(file.path);
//     file;
//     const params = {
//       Bucket: "portfolio-marvin-zana",
//       Key: file.originalname,
//       Body: fileStream,
//     };
//     s3.upload(params, function (err, data) {
//       if (err) {
//         console.log(err);
//         throw err;
//       }
//       console.log(`File uploaded successfully.${data.Location}`);
//     });
//   };
//   uploadImage(file);
//   return res.send(201);
// });

app.post("/project", addProject, addBlankImage, (req, res) => {
  console.log("hit route");
  res.status(200).json(res.locals.message);
});

app.get("/:projectTitle", getProject, function (req, res) {
  res.status(200).json(res.locals.project);
});

app.put("/:projectTitle", editProject, (req, res) => {
  res.status(200).send(res.locals.message);
});

app.delete("/:projectTitle", deleteProject, (req, res) => {
  res.status(200).json(res.locals.message);
});

app.get("/", getAllProjets, function (req, res) {
  res.status(200).json(res.locals.projects);
});

app.use("*", (req, res) => {
  res.send("Wrong route");
});

app.use((err, req, res, next) => {
  const defaultErr = {
    log: "Express error handler caught unknown middleware error",
    status: 500,
    message: { err: "An error occurred" },
  };
  let errorObj = { ...defaultErr, ...err };
  console.log(errorObj.log);
  res.status(errorObj.status).json(errorObj.message);
});

app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
});
