var express = require('express');
var load = require('express-load');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var expressionSession = require('express-session');
var methodOverride = require('method-override');

var app = express();

app.set('port', (process.env.PORT || 5000));
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(cookieParser('openfinancial'));
app.use(expressionSession({
  secret: 'cookie_secret',
  resave: true,
  saveUninitialized: true
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(methodOverride('_method'));
app.use(express.static(__dirname + '/public'));

load('models/schema.js')
  .then('middlewares')
  .then('controllers')
  .then('routes')
  .into(app);

app.listen(app.get('port'), function(){
  console.log('Openfinancial Online.');
});
