const router = require("express").Router();
// const cookieSession = require('cookie-session');
const bcrypt = require('bcrypt');

//Still need to npm install cookieSession and bcrypt

// router.use(cookieSession({
//   name: 'session',
//   keys: ['userId', 'key2']
// }));


//Helper functions
const { correctPassword } = require('../db/helpers');



module.exports = () => {
  router.post(`/login`, (req, res) => {
    const { email, password } = req.body;
    console.log(req.body);
    const loginError = "Error: Login credentials invalid. Please try again.";

    if (!email || !password) {
      console.log(loginError);
      res.send(loginError);
    } else {
      correctPassword(email, password)
        .then(user => {
          if (user) {
            console.log("Login Successful");
            req.session.userId = user.id;
            res.send();
          } else {
            console.log("Error: Account does not exist.");
          }
        });
    }

  });

  router.post('/logout', (req, res) => {
    req.session = null;
  });

  return router;
};


async function funcName(jlkdjgd) {

  const user = await correctPassword();
}