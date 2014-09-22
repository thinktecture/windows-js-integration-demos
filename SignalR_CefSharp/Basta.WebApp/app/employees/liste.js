(function () {
    "use strict";

    function EmployeesController($q, $scope, $rootScope, $location, $stateParams, employeeService) {
        $rootScope.pageHeading = 'Employee - Details';

        function getEmployeeById(employeeId) {
            employeeService.getEmployeeById(employeeId)
                .then(function(data){
                    $rootScope.employee = data;
                });
        }

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
        })
        .then(function(){
            if($stateParams.employeeId) {
                employeeService.getEmployeeById($stateParams.employeeId)
                    .then(function(data){
                        $rootScope.employee = data;
                    });
            }
        })
    }

    app.module.controller('employeesController', EmployeesController);
})();