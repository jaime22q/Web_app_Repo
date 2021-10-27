const express  = require('express'),
      router   = express.Router(),
      User     = require('../models/user'),
      Joi      = require('joi'),
      catchAsync = require('../utils/catchAsync');
    

router.use(express.json());
router.use(express.urlencoded({ extended: true }));

router.get('/register', (req, res) => {
    res.render('user/register');
});

router.post('/register', catchAsync(async(req, res, next) => {

    const userSchema = Joi.object({
            email: Joi.string().required(),
            username: Joi.string().min(3).max(20).required(),
            password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
        }).required()

    const { error } = userSchema.validate(req.body);
    if(error){
        const msg = error.details.map(el => el.message).join(',')
        throw new ExpressError(msg, 400)
    }

    try{
        const {email, username, password } = req.body;
        const user = new User({email, username});
        const registeredUser = await User.register(user, password);
        console.log(registeredUser);
        res.redirect('/');
    } catch(e){
        console.log(e);
        res.redirect('register');
    }
   
}));

router.use((err, req, res, next) => {
    const {statusCode = 500 } = err;
    if(!err.message) err.message = 'Oh no, something went wrong!'
    res.status(statusCode).render('error', { err })
})

module.exports = router;