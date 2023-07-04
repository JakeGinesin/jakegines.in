const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs');

router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', '../../public/pages/braindump.html'));
});

router.get('/:n', async(req, res) => {
  try{
    res.sendFile(path.join(__dirname, 'public', '../../public/pages/braindump/' + req.params.n + ".html"))
  } catch (e){
    res.redirect('/')
  }
});

module.exports = router;
