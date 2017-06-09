const getChats = (req, res) => {
  return res.render('chats', {auth: req.user});
};

module.exports.get = getChats;
