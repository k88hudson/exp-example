module.exports = function(app) {

  app.get('/', function(req, res) {
    res.render('src/index.html');
  });

};
