const express = require('express');
const router = express.Router();
const Blogs = require('../models/Blog');
const path = require('path');
const fs = require('fs');

router.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public','../../public/pages/archive.html'));
});

router.get('/:blogname', async(req, res) =>{
  let blogname = req.params.blogname;
  let s = false;
  fs.readdir(path.join(__dirname, '../public/pages/custom/active'), (err, files) => {
      files.forEach(file=>{
        if(file.slice(0, file.indexOf('.')) == blogname){
          res.sendFile(path.join(__dirname, 'public', '../../public/pages/custom/active/' + file));
          s = true;
        }
      });
  });
  fs.readdir(path.join(__dirname, '../public/pages/custom/inactive'), (err, files) => {
    files.forEach(file=>{
      if(file.slice(0, file.indexOf('.')) == blogname){
        res.sendFile(path.join(__dirname, 'public', '../../public/pages/custom/inactive/' + file));
        s = true;
      }
    });
  });
  let blog = await Blogs.collection.find({url: blogname}).toArray((error, documents)=>{
    if(documents.length >= 1){
      res.sendFile(path.join(__dirname, 'public','../../public/pages/individualblog.html'));
    }
    else if(documents.length <= 0 && !s){
      res.redirect("/");
    }
  });
});

module.exports = router;

// fs.readdir(path.join(__dirname, 'public/pages/custom/active'), (err, files) => {
//   files.forEach(file => {
//     isFound = false;
//     documents.forEach(document=>{
//       if(document.title == file && document.active) isFound = true;
//     })
//     if(!isFound){
//       var today = new Date();
//       var dd = String(today.getDate()).padStart(2, '0');
//       var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
//       var yyyy = today.getFullYear();
//
//       today = mm + '/' + dd + '/' + yyyy;
//       Custom.collection.insertOne({"title": file, "date": today, "active": true});
//     }
//   });
// });
