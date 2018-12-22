var fData = require('../data/friends');

module.exports = function(app){
    app.get('/api/friends', function(req, res){
        res.send(fData);
    });

    app.post('/data/friends', function(req, res){
        fData.push(req.body);
        console.log(req.body);
        res.send(200);
    });
};