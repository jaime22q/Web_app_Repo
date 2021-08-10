const express = require('express'),
      app = express();
      indexRoute = require('./routes/index');
      axios = require('axios');
      mongoose = require('mongoose');
      session = require('express-session');
      passport = require('passport');
      passportLocal = require('passport-local');
      ejsMate = require('ejs-mate');
      User = require('./models/user');
      userRoutes = require('./routes/users');

mongoose.connect('mongodb://localhost:27017/book-finder', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Database connected");
});

sessionConfig = {
  secret: 'Thisismysecretstatement',
  resave: false, 
  saveUninitialized: true,
  cookie: {
    httpOnly: true,
    expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
    maxAge: 1000 * 60 * 60 * 24 * 7
  }
}

app.engine('ejs',ejsMate);
app.use(session(sessionConfig));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new passportLocal(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(userRoutes);
app.set("view engine", "ejs");
app.use(indexRoute);
app.use(express.static(__dirname + '/public'));

// app.get('/testUser', async(req, res) => {
//   const user = new User({ email: 'fakeemail@gmail.com', username: 'pepe123'});
//   const newUser = await User.register(user, 'hello123');
//   res.send(newUser);
// })

app.get('/response', async(req, res) => {
  let item = req.query.search;
  let url = "https://www.googleapis.com/books/v1/volumes?q=" +item;
  try{
    const response =  await axios.get(url);
    res.render("results", {response: response});
  } catch(error){
    console.log(`THERE WAS AN ERROR IN THE RESPONSE ${error}`);
  }
});

app.get('/login', function(req, res){
  res.render("login");
});


//SET UP PORT
port = process.env.PORT || 3000;

//listen on port 3000
app.listen(port, function(){
  console.log("Server started, server listening on port "+port);
});
