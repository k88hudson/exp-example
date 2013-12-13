var express = require('express');
var Habitat = require('habitat');
var nunjucks = require('nunjucks');
var routes = require('./routes');

Habitat.load();

var app = express();
var env = new Habitat();
var optimize = env.get('OPTIMIZE');

var nunjucksEnv = new nunjucks.Environment(new nunjucks.FileSystemLoader(__dirname), {
  autoescape: true
});
var cacheSettings = optimize ? { maxAge: '31556952000' } : undefined; // one year;

app.locals({
  OPTIMIZE: optimize
});

nunjucksEnv.express(app);

app.use(express.logger('dev'));
app.use(express.compress());
app.use(express.static(__dirname + '/dist', cacheSettings));
app.use(express.static(__dirname + '/public', cacheSettings));
app.use('/bower_components', express.static(__dirname + '/bower_components', cacheSettings));

app.use(app.router);
routes(app);

app.listen(env.get('PORT'), function () {
  console.log('Now listening on http://localhost:%d', env.get('PORT'));
});
