const getIndex = (req, res, next) => {
        if(req.isAuthenticated)
          return res.render('chats');
        return res.render('index', {error: false});
};

const getAuthFailed = (req, res, next) => {
      return res.render('index', {error: true});
};

module.exports.get = getIndex;
module.exports.getFail = getAuthFailed;
