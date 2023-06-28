const express = require('express');
const mongoose = require('mongoose');
const fileUpload = require('express-fileupload');
const path = require('path');
const fs = require('fs');
const ejs = require('ejs');
const { json } = require('express');
const photo = require('./models/Photo');

const app = express();

//Connect DB

mongoose.connect('mongodb://127.0.0.1:27017/pcat-test-db');

//Template Engine
app.set('view engine', 'ejs');

//Middlewares
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(fileUpload());

//Routes
app.get('/', async (req, res) => {
  var photos = await photo.find({}).sort("-dateCreated");
  res.render('index', { photos });
});

app.get('/about', (req, res) => {
  res.render('about');
});

app.get('/photos/:id', async (req, res) => {
  const photoId = await photo.findById(req.params.id);
  res.render('photo', { photo: photoId });
});

app.get('/add', (req, res) => {
  res.render('add');
});

app.post('/photos', async (req, res) => {

  const uploadDir = 'public/uploads';

  if(!fs.existsSync(uploadDir)){
    fs.mkdirSync(uploadDir);
  }

  let uploadedImage = req.files.image;
  let uploadPath = __dirname + '/public/uploads/' + uploadedImage.name;

  uploadedImage.mv(uploadPath, async () => {
    await photo.create({
      ...req.body,
      image: '/uploads/' + uploadedImage.name,
    });
    res.redirect('/');
  });
});

const port = 3000;
app.listen(port, () => {
  console.log(`Sunucu ${port} portunda başlatıldı..`);
});
