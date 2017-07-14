let User = require('../models/userLocal');
let con = require('../models/db');
const bcrypt = require('bcryptjs');

const getReg = (req, res, next) => {
        return res.render('register', {error : false});
};

const postReg = (req, res, next) => {

        const input = JSON.parse(JSON.stringify(req.body));
        const set = {
                username: input.username,
                senha: input.senha,
                confirm: input.confirm
        };

        if(set.senha !== set.confirm)
          return res.render('register', {error: 's'});

        User.getUserByUsername(set.username, (err, user) => {

          if(user)
            return res.render('register', {error: 'u'});
          else {
            let newUser = new User({'username': set.username
                                    ,'senha': set.senha});
            User.newUser(newUser, (err) => {
                    if(err) console.log(err);
            });

            return res.render('index',{error: false});
          }
        });
};

module.exports.get = getReg;
module.exports.post = postReg;
