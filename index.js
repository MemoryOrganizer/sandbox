const express = require('express');
const app = express();

const multer = require('multer');
const photoUpload = multer({ dest: 'uploaded/' }).single('photo');

app.use(express.urlencoded({ extended: true }));

app.use(express.static('./'));

app.post('/', photoUpload, (req, res, next) => {
  console.log(req.body);
  console.log(req.file);
});

app.listen(5500);
