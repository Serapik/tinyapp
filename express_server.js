
const express = require("express");
//const cookieParser = require('cookie-parser');
const cookieSession = require("cookie-session");
const app = express();
const path = require('path');
const PORT = 8080; // default port 8080
const bodyParser = require("body-parser");
const bcrypt = require("bcryptjs"); //bcrypt added



app.set("view engine", "ejs");
const urlDatabase = {
  "b2xVn2": "http://www.lighthouselabs.ca",
  "9sm5xK": "http://www.google.com"
};
const users = {
  "userRandomID": {
    id: "userRandomID",
    email: "user@example.com",
    password: "12345-fskk"
  }
};


app.set('views', path.join(__dirname, "views"));
app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cookieParser());

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}!`);
});

app.get("/", (req, res) => {
  res.redirect('/login');
});


app.get("/urls", (req, res) => {
  const templateVars = {
    urls: urlDatabase,
    username: req.cookies['username']
  };
  res.render("urls_index", templateVars);
});
app.get("/urls/new", (req, res) => {
  //res.render("urls_new");
  const templateVars = {
    username: req.cookies['username']
  };
  res.render("urls_new", templateVars);
});

app.get("/urls/:shortURL", (req, res) => {
  const templateVars = {
    shortURL: req.params.shortURL,
    longURL: urlDatabase[req.params.shortURL],
    username: req.cookies['username']
  };
  
  res.render('urls_show', templateVars);
});

app.get("/login", (req, res) => {
  let templateVars = {
    user: users[req.cookies["user_id"]],
  };

  res.render("urls_login", templateVars);
});
app.get("/u/:shortURL", (req, res) => {
  const longURL = urlDatabase[req.params.shortURL];
  res.redirect(longURL);
});
app.post('/register', (req, res) => {
  const generatedID = generateRandomString(10);
  users[generatedID] = {
    id: generatedID,
    email: req.body.username,
    password: req.body.password
  };
  res.cookie('user_id', generatedID);
  res.redirect('/urls');
});

app.post('/login', (req, res) => {
  res.cookie('username', req.body.username);
  res.redirect('urls');
});
  


app.get('/', (req, res) => {
  res.redirect('/urls');
});

app.get('/register', (req, res) => {
  const templateVars = {
    username: users[session.userID]};
  
  res.render('register', templateVars);
});

// registrerin e mail and password//
app.post("/register", (req, res) => {
  if (req.body.email && req.body.password) {
    if (!getUserByEmail(req.body.email, users)) {
      const userID = generatRandomString();
      users[userID] = {
        userID,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 10)
      };
      req.session.userID = userID;
      res.redirect('/urls');
    } else {
      res.statusCode = 400;
      return res.send("<h4>Please Login, email registered</h4>");
      
    }

  } else {
    res.statusCode = 400;
    return res.send("<h4>Email or password can not be empty!</h4>");
  }
});
  const newUserID = generateRandomString();
  users[newUserID] = {
    id: newUserID,
    email: submittedEmail,
    password: submittedPassword
  };
  res.cookie('user_id', newUserID);
  res.redirect("/urls");
});

app.get("/urls.json", (req, res) => {
  res.json(urlDatabase);
});
const generateRandomString = (length) => Math.random().toString(36).slice(2, length + 2);