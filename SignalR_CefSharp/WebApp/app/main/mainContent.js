(function () {
    "use strict";

    function MainContentController($q, $rootScope) {
    }

    app.module.controller('mainContentController', MainContentController);

    app.module.directive('bastaMainContent', function () {
        return {
            restrict: 'E',
            templateUrl: 'app/main/bastaMainContent.html',
            controller: 'mainContentController',
            link: function (scope, element, attrs) {
                var minHeight = $(document).height() - 40;
                $('#page-content', element).css({
                    minHeight: minHeight + "px"
                });

                $('#back-to-top', element).click(function () {
                    $('body, html').animate({
                        scrollTop: 0
                    }, 500);
                    return false;
                });
            }
        }
    });
})();
