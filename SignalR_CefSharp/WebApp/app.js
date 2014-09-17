var express = require('express')
    , http = require('http')
    , walrus = require('walrus')
    , consolidate = require('consolidate')
    , config = require('./node/config.js')
    , bundler = require("./node/bundler.js")
    ;

var app = express();

var appDir = __dirname;

var args = process.argv.slice(2);

    app.engine("walrus", consolidate.walrus);
    app.set('port', process.env.PORT || args[0] || 8090);
    app.set('views', appDir);
    app.set('view engine', 'walrus');
    app.use(express.static(appDir));

config.initializeBundles(appDir);

app.get('/', function (req, res) {
    res.render('index', { bundler: bundler });
});

http.createServer(app).listen(app.get('port'), function () {
    console.log("Express server listening on port " + app.get('port'));
});
