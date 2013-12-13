requirejs.config({
  baseUrl: '../bower_components',
  paths: {
    main: '../src/main',
    nunjucks: 'nunjucks/browser/nunjucks',
    templates: '../templates',
    jquery: 'jquery/jquery'
  }
});

require([
  'jquery',
  'templates',
  'nunjucks'

], function (
  $,
  templates,
  nunjucks
){
  var pageJS = $('#requirejs').data('page');

  $('body').css('background', 'red');
  console.log(nunjucks.render('src/index.html'));

  if (pageJS) {
    require([pageJS]);
  }

});
