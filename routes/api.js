const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const path  = require('path');
const fs = require('fs');
const fsPromises = require('fs').promises;

router.get('/', (req, res) => {
  res.send("you should not be here");
});

resolve = require('path').resolve;

// const Blog = require('./models/blog');
const Blog = require("../models/Blog");
const Custom = require("../models/Custom");

router.post('/addblog', async(req, res) => {
  try{
    if(req.session.auth == true){
      let data = {
        title: req.body.blogtitle,
        subtitle: req.body.blogsubtitle,
        content: req.body.blogcontent,
        date: req.body.currentdate,
        readlength: req.body.readLength,
        url: req.body.blogurl
      }

      Blog.collection.insertOne(data);
      res.status(201).send();
    }
    else{
      res.status(401).send();
    }
  }
  catch(e){
    res.status(501).send();
  }
});

router.post('/getblogs', async(req, res) => {

  try{
    let min = req.body.min;
    let numOfPosts = req.body.numOfPosts;

    docs = [];
    let files = await fsPromises.readdir(path.join(__dirname, '../public/pages/custom/active'));
    for(const file of files){
      let filedata = await Custom.find({"title": file});
      // console.log(JSON.stringify(filedata));
      docs.push(filedata[0]);
    }

    // console.log(docs);

    let posts = await Blog.collection.find({}).sort({ date: -1}).skip(min).limit(numOfPosts).toArray();
    for(const post of posts){
      docs.push(post);
      // let e = JSON.stringify(post);
      // console.log(e);
    }

    docs.sort((a, b) => new Date(b.date) - new Date(a.date));

    // console.log(docs);
    res.json(docs);

  }
  catch(e){
    console.log(e);
  }
});

router.post('/getblogbyurl', async(req, res) => {
  try{
    let u = req.body.url;
    let blogs = await Blog.collection.find({url: u}).toArray((error, documents)=>{
      res.json(documents);
    });
  }
  catch(e){
    console.log(e);
  }
});


const nodemailer = require('nodemailer');

router.post('/contactrequest',async(req, res)=>{
  if(typeof req.session.lastSent == "undefined" || (new Date()).valueOf() - req.session.lastSent >= 1000 * 60 * 3){
  // if(currentDate > new Date(limiterDate)){
    let transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'jakegines.in@gmail.com',
        pass: 'lol not telling u'
      }
    });
    let mailOptions = {
      from: 'jakegines.in@gmail.com',
      to: 'jakegines.in@gmail.com',
      subject: "message from jakegines.in: " + req.body.contactReason,
      html: '<h3>Message from '+req.body.firstname +'</h3> <p>'+req.body.message+'</p> <p>reply at: '+req.body.email+'</p>'
    }
    transporter.sendMail(mailOptions, function(error, info){
      if(error){
        console.log(error);
        res.send("");
      }
      else{
        let d = {
          "res" : "true"
        }
        req.session.lastSent = (new Date()).valueOf();
        res.json(d);
      }
    });
  }
  else{
    let data = {
      "res" : "time"
    }
    res.send(data);
  }


});

module.exports = router;
