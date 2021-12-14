
const express = require("express");
const cookieParser = require('cookie-parser');
const app = express();
const path = require('path');
const PORT = 8080; // default port 8080


const userAlreadyExists = function(email) {
  for (const user in users) {
    if (users[user].email === email) {
      return true;
    }
  } return false;
};

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

const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());

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
    username: req.cookies['username']
  };
  res.render('register', templateVars);
});
app.post("/register", (req, res) => {
  const submittedEmail = req.body.email;
  const submittedPassword = req.body.password;

  if (!submittedEmail || !submittedPassword) {
    res.send(400, "Please include both a valid email and password");
  }

  if (userAlreadyExists(submittedEmail)) {
    res.send(400, "An account already exists for this email address");
  }

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