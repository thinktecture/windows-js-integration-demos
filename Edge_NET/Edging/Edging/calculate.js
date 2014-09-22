// The function exported from Node.js to .NET must follow
// the prescriptive async pattern of accepting two parameters:
// payload (data) and a callback.
// The callback function accepts two parameters:
//     - first parameter is the error, if any
//     - second parameter is the result of the operation

module.exports = function (data, callback) {
    calc = function(data) {
        var result = 1;
        for (var c = 1; c <= data; c++) {
            result *= c;
        }
        return result;
    }
    callback(null, calc(data));
}
