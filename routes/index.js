const getIndex = (req, res) => {
        res.render('index', { title: 'chat-ibilce' });
};

module.exports.get = getIndex;
