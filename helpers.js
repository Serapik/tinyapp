const getUserByEmail = function(email, users) {
  for (const user in users) {
    if (users[user].email === email) {
      return users[user];
    }
  }
  return undefined;
};

//generating random string for short URL//
// eslint-disable-next-line func-style
function generateRandomString() {
  let randomString = "";
  let characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (let i = 0; i < 6; i++) {
    randomString += characters.charAt(
      Math.floor(Math.random() * characters.length)
    );
  }
  return randomString;
}

// eslint-disable-next-line func-style
function userURLs(id, urlDatabase) {
  let userURLS = {};
  for (const shortURL in urlDatabase) {
    if (id === urlDatabase[shortURL].userID) {
      userURLS[shortURL] = urlDatabase[shortURL];
    }
  }
  return userURLS;
}

//checking for login user
// eslint-disable-next-line func-style
function currentUser(cookie, userDataBase) {
  for (const key in userDataBase) {
    if (cookie === key) {
      return true;
    }
  } return false;
}


module.exports = {getUserByEmail, generateRandomString, userURLs, currentUser};