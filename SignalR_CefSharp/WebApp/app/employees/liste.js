(function () {
    "use strict";

    function EmployeesController($scope, $rootScope, $location, $routeParams, bastaGatewayService) {
        $rootScope.pageHeading = 'Employees - Liste'

        bastaGatewayService.starteLongPolling();

    }

    app.module.controller('employeesController', EmployeesController);
})();