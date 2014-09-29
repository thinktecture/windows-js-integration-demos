// run this sample over the command line with node.js already installed
// "node server.js"

var edge = require('edge');

var helloWorld = edge.func(__dirname + "/csharpcodefile.csx");

helloWorld("BASTA 2014",
    function(err, result) {
        if (err) throw err;
        console.log(result);
    });
