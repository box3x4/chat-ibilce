let app = require('../app');

const getChatRoom = (req, res) => {
  
  let chatRoom = req.params.id;
  app.chat(`${chatRoom}`, req.user);
  return res.render('chatRoom');
};

module.exports.get = getChatRoom;
