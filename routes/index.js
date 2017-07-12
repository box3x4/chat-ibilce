const getIndex = (req, res, next) => {
        if(req.isAuthenticated)
          return res.render('chats');
        return res.render('index');
};

module.exports.get = getIndex;
