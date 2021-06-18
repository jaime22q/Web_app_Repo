const express = require('express'),
      router = express.Router();


//SHOW LANDING PAGE
router.get("/", function(req, res){
  res.render("landing");
});

module.exports = router; 
