(function () {
    'use strict';

    app.module.config(
        /**
         * @param $httpProvider
         */
        function ($httpProvider) {

            $httpProvider.interceptors.push(function () {

                return {
                    request: function (config) {
                        config = config || {};

                        if ((config.cache === false) && config.headers && angular.isUndefined(config.headers['If-Modified-Since'])) {
                            // prevents caching in win8 apps
                            config.headers['If-Modified-Since'] = 'Mon, 27 Mar 1972 00:00:00 GMT';
                        }

                        if (angular.isUndefined(config.timeout)) {
                            config.timeout = 30000;
                        }

                        return config;
                    }
                };

            });
        });

    function startAngularApp() {
        var appContainer = $('html');
        angular.bootstrap(appContainer, ['basta']);
    }

    if (window.cordova) {
        document.addEventListener("deviceready", startAngularApp, false);
    } else {
        startAngularApp();
    }

})();
