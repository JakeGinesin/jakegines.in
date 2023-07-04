const express = require('express');
const app = express();

const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');
const fs = require('fs');

app.use(express.static(path.join(__dirname, 'public'))); //html n stuff on request
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.set('trust proxy', 1);

const proRouter = require('./routes/pro');
app.use('/pro', proRouter);

const braindumpRoute = require("./routes/notes");
app.use('/notes', braindumpRoute);

const blogRoute = require("./routes/blog");
app.use('/blog', blogRoute);

app.get('/about', (req, res) => {
  res.sendFile(path.join(__dirname, 'public','../public/pages/about.html'))
});

app.get('/about/resume', (req, res) => {
  res.sendFile(path.join(__dirname, 'public','../public/assets/resume_august2022.pdf'))
});

app.get('/favorites', (req, res) => {
  res.sendFile(path.join(__dirname, 'public','../public/pages/resources.html'))
});

// random paths

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, 'public','pages/index.html'));
});

app.get('/rss', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'feed.xml'));
});

app.get('/sitemap', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'sitemap.txt'));
});

app.get('/jake512', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'assets/icons/jake512.png'));
});

app.get('/privacy', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'assets/privacy.txt'));
})

app.get('/ssh', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'assets/ssh.txt'));
});

app.get('/pgp', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'assets/pgp.txt'));
});

app.get('/card', (req, res) => {
  if (req.headers['user-agent'].includes('curl')){
    res.sendFile(path.join(__dirname, 'public', 'assets/card.html'));
  }
});

app.get('/card.png', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'assets/card.png'))
})

app.get('/card-html', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'assets/card.html'));
});

// send 404, just redirects to random shit for now
app.get('*', (req, res) =>{
  res.redirect('/');
});

// express listener
app.listen(process.env.PORT || 3000, function(error){
  if(error) console.log(error);
  console.log("listening on port 3000");
});
