const getIndex = (req, res) => {
        console.log(req.user);
        return res.render('index', {auth : req.user});
};

module.exports.get = getIndex;
