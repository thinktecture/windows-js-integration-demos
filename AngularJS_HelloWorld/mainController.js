(function(){
    var bastaApp = angular.module('bastaApp', []);

    function MainService(){
        this.getGreetings = function(){
            return "Hello World";
        }
    }
    bastaApp.service('mainService', MainService);

    function MainController($scope, mainService){
        $scope.greeting = mainService.getGreetings();
    }
    bastaApp.controller('mainController', MainController);
})();