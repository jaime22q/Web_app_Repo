const express = require('express'),
      router = express.Router(),
      User = require('../models/user');
    

router.use(express.json());
router.use(express.urlencoded({ extended: true }));

router.get('/register', (req, res) => {
    res.render('user/register');
});

router.post('/register', async(req, res) => {
    const {email, username, password } = req.body;
    const user = new User({email, username});
    const registeredUser = await User.register(user, password);
    console.log(registeredUser);
    res.redirect('/');
});

module.exports = router;