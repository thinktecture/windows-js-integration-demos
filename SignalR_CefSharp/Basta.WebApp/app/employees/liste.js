(function () {
    "use strict";

    function EmployeesController($scope, $rootScope, $location, $routeParams, employeeService) {
        $rootScope.pageHeading = 'Employee - Details';

        employeeService.getEmployeeById(1)
            .then(function(data){
                $scope.employee = data;
            })
    }

    app.module.controller('employeesController', EmployeesController);
})();