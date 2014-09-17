(function () {
    "use strict";

    app.module.config(function ($routeProvider, $compileProvider) {

        $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|file|ghttps?|ms-appx|x-wmapp0|callto):/);

        $routeProvider
            .when('/', {
                templateUrl: 'app/employees/liste.html',
                controller: 'employeesController'
            });

        $routeProvider.otherwise({
            redirectTo: '/'
        });
    });
})();
