(function () {
    'use strict';

    function EmployeeApiService($q, $http) {

        this.getEmployeeByIdAsync = function (employeeId) {
            var defer = $q.defer();
            $http.get('http://localhost:9000/api/employees/' + employeeId, { cache: true})
                .success(function (data) {
                    defer.resolve(data);
                });
            return defer.promise;
        };
    }

    app.module.service('employeeApiService', EmployeeApiService);
})();
