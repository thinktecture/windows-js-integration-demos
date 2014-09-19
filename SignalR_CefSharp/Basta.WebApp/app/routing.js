(function () {
    "use strict";

    app.module.config(function ($routeProvider) {

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
