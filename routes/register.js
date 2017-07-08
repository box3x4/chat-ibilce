let User = require('../models/userLocal');
let con = require('../models/db');

const getReg = (req, res, next) => {
        return res.render('register', {auth : req.user});
};

const postReg = (req, res, next) => {

        const input = JSON.parse(JSON.stringify(req.body));
        const set = {
                username: input.username,
                senha: input.senha
        };

        let newUser = new User({'_id': set.username
                                ,'senha': set.senha});
        User.newUser(newUser, (err) => {
                if(err) console.log(err);
        });
        
        return res.render('index',{auth: req.user});
};

module.exports.get = getReg;
module.exports.post = postReg;
