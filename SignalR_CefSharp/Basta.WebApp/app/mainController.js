(function () {
    "use strict";

    function MainController($scope, $rootScope, $location, $route, $window) {
        // $route needs to be injected, because ng-view is nested in a directive, to start up the routing!

        $rootScope.collapseLeftBar = (window.innerWidth === 768);
        $rootScope.showRightBar = false;
        $rootScope.isLogoutConfirmationShown = false;

        $scope.home = function () {
            $location.path('/');
        };

        $scope.back = function () {
            $window.history.back();
        };

        var wasManuallyCollapsed = false;

        $(window).on('resize orientationchange', function () {
            if (window.innerWidth <= 768) {

                if (window.innerWidth <= 767) {
                    if ($scope.collapseLeftBar || $scope.showLeftBar) {
                        $rootScope.$apply(function (scope) {
                            scope.collapseLeftBar = false;
                            scope.showLeftBar = false;
                        });
                    }

                } else if (!wasManuallyCollapsed && !$scope.collapseLeftBar) {
                    $rootScope.$apply(function (scope) {
                        scope.collapseLeftBar = true;
                        scope.showLeftBar = false;
                    });
                }

            } else if (wasManuallyCollapsed !== $scope.collapseLeftBar) {
                $rootScope.$apply(function (scope) {
                    scope.collapseLeftBar = wasManuallyCollapsed;
                    scope.showLeftBar = false;
                });
            }
        });
    }

    app.module.controller('mainController', MainController);
})();
