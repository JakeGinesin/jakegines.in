const express = require('express');
const app = express();

const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');
const fs = require('fs');
const fetch = require('node-fetch');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const session = require('cookie-session');
require('dotenv').config();

app.use(express.static(path.join(__dirname, 'public'))); //html n stuff on request
app.use(express.static(path.join(__dirname, 'admin')));
// app.use(express.static('admin'))
// app.use(express.static('public'))
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.set('trust proxy', 1);
app.use(session({
  cookie:{
    secure: true,
    maxAge: 60 * 60 * 1000 //1 hr
    // maxAge : 60 * 60 * 10000000
  },
  secret: process.env.SECRET,
  saveUninitialized: true,
  resave: false
}));

mongoose.connect(process.env.DB,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
   }
);
mongoose.connection.on('connected', ()=>{
  console.log('mongoose is up :o');
  customscan();
});

//routes

const aboutRoute = require('./routes/about');
app.use('/about', aboutRoute)

const apiRoute = require('./routes/api');
app.use('/api', apiRoute);

const archiveRoute = require('./routes/archive');
app.use('/archive', archiveRoute);

const adminRoute = require('./routes/admin');
app.use('/admin', adminRoute);

// const contactRoute = require('./routes/contact');
// app.use('/contact', contactRoute);

const loginRoute = require('./routes/login');
app.use('/login', loginRoute);

const projectRoute = require("./routes/projects");
app.use('/projects', projectRoute);

//login

const User = require('./models/User');

app.post('/login', async(req, res) =>{
  try{
    let response = await User.find({username: req.body.username});
    if(response.length == 1){
      if(await bcrypt.compare(req.body.password, response[0].password)){
        req.session.auth = true;
        res.status(201).send();
      }
      else{
        res.status(401).send();
        req.session.auth = false;
      }
    }
    else{
      res.status(401).send();
      req.session.auth = false;
    }
  }
  catch (e){
    res.status(501).send();
    req.session.auth = false;
  }
});

app.post('/logout', async(req, res) =>{
    req.session.auth = false;
    res.json({"logout":"true"});
    res.redirect('/');
});

app.post('/createUser', async(req, res) => { //only accessable on direct post for now lol
  try {
    let devacc = false;
    //x-forwarded-for is for heroku
    if(req.headers['x-forwarded-for'] == process.env.TEST_IP || devacc){
      const hashedPassword = await bcrypt.hash(req.body.password, 10)
      const user = { username: req.body.username, password: hashedPassword }
      User.collection.insertOne(user);
      res.status(201).send();
    }
    else{
      res.send("not allowed! >:C");
    }
  } catch (err){
    res.status(500).send();
  }
});

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, 'public','pages/index.html'));
});

app.get('/sitemap', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'sitemap.txt'));
});

app.get('/jake512', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'icons/jake512.png'));
});

app.get('*', (req, res) =>{
  res.redirect('/');
});



app.listen(process.env.PORT || 3000, function(error){
  if(error) console.log(error);
  console.log("listening on " + process.env.PORT);

});

const Custom = require("./models/Custom");

async function customscan(){
  // let e = await Custom.find();
  let isFound;
  let custom = await Custom.find((err, documents)=>{
    fs.readdir(path.join(__dirname, 'public/pages/custom/active'), async(err, files) => {
      files.forEach(file => {
        isFound = false;
        documents.forEach(document=>{
          if(document.title == file && document.active) isFound = true;
        })
        if(!isFound){
          var today = new Date();
          var dd = String(today.getDate()).padStart(2, '0');
          var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
          var yyyy = today.getFullYear();

          today = mm + '/' + dd + '/' + yyyy;
          let s = file.slice(0, file.indexOf("."));
          Custom.collection.insertOne({"title": file, "date": today, "url": s, "active": true});
        }
      });
      for(const doc of documents){
        if(doc.active){
          if(!files.includes(doc.title)){ //if files actually have the db doc
            Custom.collection.deleteOne({title: doc.title});
          }
        }
      }
    });
    fs.readdir(path.join(__dirname, 'public/pages/custom/inactive'), async(err, files) => {
      files.forEach(file => {
        isFound = false;
        documents.forEach(document=>{
          if(document.title == file && !document.active) isFound = true;
        })
        if(!isFound){
          var today = new Date();
          var dd = String(today.getDate()).padStart(2, '0');
          var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
          var yyyy = today.getFullYear();

          today = mm + '/' + dd + '/' + yyyy;
          let s = file.slice(0, file.indexOf("."));
          Custom.collection.insertOne({"title": file, "date": today, "url": s, "active": false});
        }
      });
      for(const doc of documents){
        if(!doc.active){
          if(!files.includes(doc.title)){
            Custom.collection.deleteOne({title: doc.title});
          }
        }
      }
    });
  });

  return;
  // let custom = await Customs.collection.find({}).toArray((error, documents)=>{
  //   fs.readdir(path.join(__dirname, 'public/pages/custom/active'), (err, files) => {
  //     console.log(documents);
  //   });
  // });
}
