var bundler = require("./bundler.js");

exports.initializeBundles = function (webRoot) {
    bundler.addBundle("~/libs", "js", [
        {
            baseDirectory: webRoot + "/",
            path: "libs",
            includeSubdirectories: true
        }
    ]);

    bundler.addBundle("~/app", "js", [
        {
            baseDirectory: webRoot + "/",
            path: "app",
            includeSubdirectories: true
        },
        {
            baseDirectory: webRoot + "/",
            path: "appServices",
            includeSubdirectories: true
        },
        {
            baseDirectory: webRoot + "/",
            path: "appStartup",
            includeSubdirectories: true
        }
    ]);

    bundler.addBundle("~/styles", "css", [
        {
            baseDirectory: webRoot + "/",
            path: "app",
            includeSubdirectories: true
        },
        {
            baseDirectory: webRoot + "/",
            path: "assets",
            includeSubdirectories: true
        },
        {
            baseDirectory: webRoot + "/",
            path: "libs",
            includeSubdirectories: true
        }
    ]);
};