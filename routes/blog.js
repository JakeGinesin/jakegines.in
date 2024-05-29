const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs');

router.get('/', (req, res) => {
    res.redirect('/');
    // res.sendFile(path.join(__dirname, 'public', '../../public/pages/braindump.html'));
});

router.get('/:n', async(req, res) => {
  try{
    t = req.params.n;
    // check if param has no slashes
    
    // get full path requested from request
    if(t.indexOf('/') == -1){
      // res.sendFile(path.join(__dirname, 'public', '../../public/pages/blog/' + t + '/index.html'));
      if (fs.existsSync(path.join(__dirname, 'public', '../../public/pages/blog/' + t + '/index.html'))) {
        res.sendFile(path.join(__dirname, 'public', '../../public/pages/blog/' + t + '/index.html'));
      } else {
        res.redirect('/');
      }
    }
    else{
      if (fs.existsSync(path.join(__dirname, 'public', '../../public/pages/blog/' + req.params.n + '.html'))) {
        res.sendFile(path.join(__dirname, 'public', '../../public/pages/blog/' + req.params.n + '.html'));
      } else {
        res.redirect('/');
      }
    }
  } catch (e){
    res.redirect('/')
  }
});

router.get('/:n/:m', async(req, res) => {
  try {
    t = req.params.n;
    // check if param has no slashes
    if(t.indexOf('/') == -1){
      if (fs.existsSync(path.join(__dirname, 'public', '../../public/pages/blog/' + t + '/' + req.params.m + '.html'))) {
        res.sendFile(path.join(__dirname, 'public', '../../public/pages/blog/' + t + '/' + req.params.m + '.html'));
      }
      else{
        // checks if blog is valid
        if (fs.existsSync(path.join(__dirname, 'public', '../../public/pages/blog/' + t + '/index.html'))) {
          res.redirect('/blog/' + t);
        }
        else {
          res.redirect('/');
        }
      }
      // res.sendFile(path.join(__dirname, 'public', '../../public/pages/blog/' + t + '/' + req.params.m + '.html'));
    }
    else{
      if (fs.existsSync(path.join(__dirname, 'public', '../../public/pages/blog/' + req.params.n + '/' + req.params.m + '.html'))) {
        res.sendFile(path.join(__dirname, 'public', '../../public/pages/blog/' + req.params.n + '/' + req.params.m + '.html'));
      } else {
        if (fs.existsSync(path.join(__dirname, 'public', '../../public/pages/blog/' + req.params.n + '.html'))) {
          res.redirect('/blog/' + req.params.n);
        }
        else {
          res.redirect('/');
        }
      }

      // res.sendFile(path.join(__dirname, 'public', '../../public/pages/blog/' + req.params.n + "/" + req.params.m + ".html"))
    }
  } catch (e){
    res.redirect('/')
  }
});

module.exports = router;
