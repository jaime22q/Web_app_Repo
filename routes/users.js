const express = require('express'),
      router = express.Router();
      User = require('../models/user');

router.get('/register', (req, res) => {
    res.render('user/register');
});

router.post('/register', async(req, res) => {
    res.send(req.body);
});

module.exports = router;