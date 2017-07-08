const getChats = (req, res, next) => {
  return res.render('chats', {auth: req.user});
};

module.exports.get = getChats;
