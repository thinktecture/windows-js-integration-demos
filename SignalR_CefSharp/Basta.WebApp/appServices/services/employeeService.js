(function () {
    "use strict";

    function EmployeeService(employeeApiService) {

        this.getEmployeeById = function (employeeId) {
            var promise;

            promise = employeeApiService.getEmployeeByIdAsync(employeeId);
            return promise
                .then(function (record) {
                    return record;
                })
        };
    }

    app.module.service('employeeService', EmployeeService);

})();
