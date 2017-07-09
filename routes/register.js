let User = require('../models/userLocal');
let con = require('../models/db');
const bcrypt = require('bcryptjs');

const getReg = (req, res, next) => {
        return res.render('register');
};

const postReg = (req, res, next) => {

        const input = JSON.parse(JSON.stringify(req.body));
        const set = {
                username: input.username,
                senha: input.senha
        };

        User.getUserByUsername(set.username, (err, user) => {

          if(user)
            return res.redirect('register');
          else {
            let newUser = new User({'username': set.username
                                    ,'senha': set.senha});
            User.newUser(newUser, (err) => {
                    if(err) console.log(err);
            });

            return res.render('index',{auth: req.user});
          }
        });
};

module.exports.get = getReg;
module.exports.post = postReg;
