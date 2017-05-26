const getIndex = (req, res, next) => {
  res.render('index', { title: 'chat-ibilce' });
};

module.exports.get = getIndex;
