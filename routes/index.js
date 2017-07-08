const getIndex = (req, res, next) => {
        if(req.isAuthenticated)
          return res.render('chats');
        return res.render('index', {auth : req.user});
};

module.exports.get = getIndex;
