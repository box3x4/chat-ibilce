let User = require('../models/user');
let con = require('../models/db');

const getReg = (req,res) => {
        res.render('register');
};

const postReg = (req,res) => {
        const input = JSON.parse(JSON.stringify(req.body));
        const set = {
                nome: input.nome,
                username: input.username,
                senha: input.senha
        };
        let newUser = new User({'nome': set.nome
                                ,'_id': set.username
                                ,'senha': set.senha});
        User.newUser(newUser, (err) => {
                if(err) console.log(err);
                console.log(set);
        });
        res.render('index', {title: 'user registered'});
};

module.exports.get = getReg;
module.exports.post = postReg;
