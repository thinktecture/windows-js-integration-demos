(function () {
    "use strict";

    app.module.config(function ($stateProvider, $urlRouterProvider) {

        $urlRouterProvider.otherwise('/');

        $stateProvider
            .state('start', {
                url: '/',
                templateUrl: 'app/employees/liste.html',
                controller: 'employeesController'
            })
            .state('employee', {
                url: '/employee/:employeeId',
                templateUrl: 'app/employees/liste.html',
                controller: 'employeesController'
            });
    });

    app.module.run(['$state', function ($state) {
        $state.transitionTo('start');
    }])

})();
