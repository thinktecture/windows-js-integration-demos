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
                wpf.server.updateEmployee(empl);
            }
        };

        var wpf = $.connection.signalRHub;

        wpf.client.broadcastMessage = function (employeeId) {
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

    app.module.factory('employeesApi', function($rootScope){
        var fac = {};
        fac.getFullName = function() {
            return $rootScope.employee.Vorname + " " + $rootScope.employee.Nachname;
        };
        return fac;
    });
})();