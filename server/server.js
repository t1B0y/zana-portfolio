const express = require('express');

const imageRouter = require('./router/imagesRouter');
const projectRouter = require('./router/projectRouter');

const cors = require('cors');

const app = express();
const PORT = 3000;

const corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/image', imageRouter);
app.use('/project', projectRouter);

app.use('*', (req, res) => {
  res.status(500).json('Wrong route');
});

app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: err.status || 500,
    message: { err: 'An error occurred' },
  };
  let errorObj = { ...defaultErr, ...err };
  console.log(errorObj.log);
  res.status(errorObj.status).json(errorObj.message);
});

app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
});
