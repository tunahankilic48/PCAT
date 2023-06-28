// const mongoose = require('mongoose');
// const schema = mongoose.Schema;

//Connect DB

// mongoose.connect('mongodb://127.0.0.1:27017/pcat-test-db');

// //Create Schema
// const photoSchema = new schema({
//   title: String,
//   description: String,
// });

// const photo = mongoose.model('Photo', photoSchema);

//Create Photo

// photo.create({
//   title: "Photo Title 1",
//   description: "Photo Description 1"
// })

//Read a Photo
//  photo.find().then((data) => { console.log(data) })

//Update Photo
// const id = '649b49241031f00fa292a9b9';
//  photo.findByIdAndUpdate(
//    id, 
//   {
//   title: 'Photo 11 updated again',
//   description: 'Photo 11 updated description again'
// },
// {
//   new: true
// }).then(() => console.log("updated"));

//Delete Photo
// photo.findByIdAndDelete(id).then(() => console.log("removed"));

// photo.find().then((data) => { console.log(data) })
