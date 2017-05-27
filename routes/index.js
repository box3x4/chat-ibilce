const getIndex = (req, res, next) => {
  res.render('index', { title: 'chat-ibilce2' });
};

module.exports.get = getIndex;
