let app = require('../app');

const getIndex = (req, res, next) => {
        if(req.isAuthenticated)
          return res.render('chats');
        return res.render('index', {error: false});
};

const getAuthFailed = (req, res, next) => {
      if(app.authFail) {
        app.authFail = false;
        return res.render('index', {error: true});
      }
      return res.render('index', {error: false});

};

module.exports.get = getIndex;
module.exports.getFail = getAuthFailed;
