const express = require("express");
const {
  getAllProjets,
  getProject,
  deleteProject,
  editProject,
  addProject,
  addBlankImage,
  uploadFile,
  addUrlToDb,
  getImages,
} = require("./controllers/projectsControllers.js");
const cors = require("cors");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });

const app = express();
const PORT = 3000;

const corsOptions = {
  origin: "*",
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};

app.use(cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post(
  "/project/file",
  upload.single("file"),
  uploadFile,
  addUrlToDb,
  (req, res) => {
    res.status(201).json("filed added to bucket");
  }
);

app.post("/project", addProject, addBlankImage, (req, res) => {
  console.log("hit route");
  res.status(200).json(res.locals.message);
});

app.get("/:projectTitle", getProject, function (req, res) {
  res.status(200).json(res.locals.project);
});
app.get("/:projectId/image", getImages, function (req, res) {
  res.status(200).json(res.locals.images);
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
