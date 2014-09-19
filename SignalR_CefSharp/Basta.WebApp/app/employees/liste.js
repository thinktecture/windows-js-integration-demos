(function () {
    "use strict";

    function EmployeesController($scope, $rootScope, $location, $routeParams, employeeService) {
        $rootScope.pageHeading = 'Employee - Details';

        function getEmployeeById(employeeId) {
            employeeService.getEmployeeById(employeeId)
                .then(function(data){
                    $scope.employee = data;
                    $scope.apply();
                });
        };

        $scope.submitEmployee = function(){
            if($scope.employee) {
                var empl = JSON.stringify($scope.employee);
                chat.server.updateEmployee(empl);
            }
        };

        var chat = $.connection.signalRHub;

        chat.client.broadcastMessage = function (employeeId) {
            getEmployeeById(employeeId);
        };

        $.connection.hub.logging = true;
        $.connection.hub.start().done(function () {
        });
    };

    app.module.controller('employeesController', EmployeesController);

})();