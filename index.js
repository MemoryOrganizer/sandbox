const express = require('express');
const app = express();

const multer = require('multer');
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function(req, file, cb) {
    console.log(file);
    cb(null, file.originalname);
  }
});

app.post('/upload', (req, res, next) => {
  const upload = multer({ storage }).single('name-of-input-key');
  upload(req, res, function(err) {
    if(err) {
      return res.send(err);
    }
    res.json(req.file);
  });
});

app.listen(5500);

// app.use(express.urlencoded({ extended: true }));

// app.use(express.static('./'));

// const photoUpload = multer({ dest: 'uploaded/' }).single('photo');

// app.post('/', photoUpload, (req, res, next) => {
//   console.log(req.body);
//   console.log(req.file);
// });


