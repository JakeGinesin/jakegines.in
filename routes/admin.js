const express = require('express');
const router = express.Router();
const path = require('path');

router.get('/', (req, res) => {
  if(req.session.auth == true){
    res.sendFile(path.join(__dirname, 'admin','../../admin/admin.html'));
  }
  else{
    res.redirect('/');
  }
});

router.get('/addblog', (req, res) => {
  if(req.session.auth == true){
    res.sendFile(path.join(__dirname, 'admin','../../admin/addblog.html'));
  }
  else{
    res.redirect('/');
  }
});

router.get('/analytics', (req, res) => {
  if(req.session.auth == true){
    res.sendFile(path.join(__dirname, 'admin','../../admin/analytics.html'));
  }
  else{
    res.redirect('/');
  }
});

module.exports = router;
