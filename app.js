const express = require('express'),
      app = express();
      indexRoute = require('./routes/index');
      axios = require('axios');

app.set("view engine", "ejs");
app.use(indexRoute);
app.use(express.static(__dirname + '/public'));

app.get("/response", function(req, res){
  var item = req.query.search;
  var url = "https://www.googleapis.com/books/v1/volumes?q=" +item;
  getBook(url, res);
});


async function getBook(url, res){
  try{
    const response =  await axios.get(url);
    res.render("results", {response: response});
  } catch(error){
    console.log(`THERE WAS AN ERROR ${error}`);
  }
}

app.get("/register", function(req, res){
  res.render("register");
});





//SET UP PORT
port = process.env.PORT || 3000;

//listen on port 3000
app.listen(port, function(){
  console.log("Server started, server listening on port "+port);
});
