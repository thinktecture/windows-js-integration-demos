(function () {
    "use strict";

    function EmployeesController($scope, $rootScope, $location, $routeParams) {
        $rootScope.pageHeading = 'Employees - Liste'

    }

    app.module.controller('employeesController', EmployeesController);
})();