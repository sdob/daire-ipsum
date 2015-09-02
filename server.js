var fs = require('fs');
var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');

var ipsum = require('./server/ipsum');

var app = express();

app.set('port', (process.env.PORT || 3000));
app.use('/', express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get('/api/sentence', function (req, res) {
  res.json(ipsum.sentence());
});

app.get('/api/paragraph', function (req, res) {
  res.json(ipsum.paragraph());
});

app.get('/api/paragraphs/:num', function (req, res) {
  console.info(req.query.factor);
  res.json(ipsum.paragraphs(req.params.num, req.query.factor));
});

app.listen(app.get('port'), function () {
  console.info('Server started: http://localhost:' + app.get('port') + '/');
});
