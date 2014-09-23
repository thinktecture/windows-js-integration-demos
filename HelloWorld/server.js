var edge = require('edge');

var helloWorld = edge.func(__dirname + "/csharpcodefile.csx");

helloWorld("BASTA 2014",
    function(err, result) {
        if (err) throw err;
        console.log(result);
    });
