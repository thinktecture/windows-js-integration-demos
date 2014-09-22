var ttTools = ttTools || {};

ttTools.getSampleData = function () {
    var injector = angular.element(document.body).injector();
    var employeesApiSvc = injector.get("employeesApi");

    if(employeesApiSvc) {
        var result = employeesApiSvc.getFullName();
        window.cefCallback.sampleDataResult(result);
    }
};