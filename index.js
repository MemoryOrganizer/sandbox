require('dotenv').config();

const express = require('express');
const app = express();

const multer = require('multer');
const cloudinary = require('cloudinary').v2;

app.use(express.urlencoded({ extended: true }));
app.use(express.static('./'));

const photoUpload = multer({ dest: 'uploaded/' }).single('photo');

app.post('/', photoUpload, (req, res, next) => {
  console.log(req.body);
  console.log(req.file);

  cloudinary.config({
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_SECRET,
    cloud_name: process.env.CLOUDINARY_NAME
  });

  const path = req.file.path;
  const uniqueFilename = new Date().toISOString();

  cloudinary.uploader.upload(
    path,
    { public_id: `blog/${uniqueFilename}`, tags: 'blog' }, // directory and tags are optional
    function(err, image) {
      if(err) return res.send(err);
      console.log('file uploaded to Cloudinary');
      // remove file from server
      const fs = require('fs');
      fs.unlinkSync(path);
      // return image details
      res.json(image);
    }
  );
});

app.listen(5500);
