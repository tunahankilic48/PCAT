const photo = require('../models/Photo');

const fs = require('fs');

exports.getAllPhotos = async (req, res) => {
  const page = req.query.page || 1;
  const photosPerPage = 2;
  var totalPhotos = await photo.find({}).countDocuments();
  var photos = await photo
    .find({})
    .sort('-dateCreated')
    .skip((page - 1) * photosPerPage)
    .limit(photosPerPage);
  res.render('index', {
    photos,
    current: page,
    pages: Math.ceil(totalPhotos / photosPerPage),
  });
};

exports.getPhotoById = async (req, res) => {
  const photoId = await photo.findById(req.params.id);
  res.render('photo', { photo: photoId });
};

exports.createPhoto = async (req, res) => {
  const uploadDir = 'public/uploads';

  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
  }

  let uploadedImage = req.files.image;
  let uploadPath = __dirname + '/../public/uploads/' + uploadedImage.name;

  uploadedImage.mv(uploadPath, async () => {
    await photo.create({
      ...req.body,
      image: '/uploads/' + uploadedImage.name,
    });
    res.redirect('/');
  });
};

exports.updatePhoto = async (req, res) => {
  const photoId = await photo.findById(req.params.id);
  photoId.title = req.body.title;
  photoId.description = req.body.description;
  photoId.save();
  res.redirect(`/photos/${req.params.id}`);
};

exports.deletePhoto = async (req, res) => {
  const photoId = await photo.findById(req.params.id);
  let deletedImage = __dirname + '/../public' + photoId.image;
  fs.unlinkSync(deletedImage);
  await photo.findByIdAndRemove(req.params.id);
  res.redirect('/');
};
