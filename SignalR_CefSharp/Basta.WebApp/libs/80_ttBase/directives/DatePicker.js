(function () {
    "use strict";

    /* German initialisation for the jQuery UI date picker plugin. */
    /* Written by Milian Wolff (mail@milianw.de). */
    jQuery(function ($) {
        "use strict";

        if (!$.datepicker) {
            return;
        }

        $.datepicker.regional['de'] = {
            closeText: 'schließen',
            prevText: '&#x3c;zurück',
            nextText: 'Vor&#x3e;',
            currentText: 'heute',
            monthNames: ['Januar', 'Februar', 'März', 'April', 'Mai', 'Juni',
                'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember'],
            monthNamesShort: ['Jan', 'Feb', 'Mär', 'Apr', 'Mai', 'Jun',
                'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Dez'],
            dayNames: ['Sonntag', 'Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag'],
            dayNamesShort: ['So', 'Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa'],
            dayNamesMin: ['So', 'Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa'],
            weekHeader: 'Wo',
            dateFormat: 'dd.mm.yy',
            firstDay: 1,
            isRTL: false,
            showMonthAfterYear: false,
            yearSuffix: ''
        };

        $.datepicker.setDefaults($.datepicker.regional['de']);
    });

    /**
     * @param $parse
     * @param {DateService} dateService
     */
    function ttDatePicker($parse, dateService) {
        return {
            restrict: "EA",
            replace: true,
            transclude: false,
            compile: function (element, attrs) {
                var ngModel = $parse(attrs.ngModel); // ng-model="user.firstname.foo[0].bla()"

                var html = "<input class='form-control' type='text' id='" + attrs.id + "' ></input>";
                var newElem = $(html);
                element.replaceWith(newElem);

                return function (scope, element, attrs, controller) {

                    scope.$watch(ngModel, function (val) {
                        var date = dateService.safeGetDate(val);
                        element.datepicker("setDate", date);
                    });

                    var processChange = function () {
                        var date = dateService.isoStringFromDate(element.datepicker("getDate"));

                        scope.$apply(function (scope) {
                            // Change bound variable
                            ngModel.assign(scope, date);
                            var newVal = dateService.safeGetDate(ngModel(scope));
                            element.datepicker("setDate", newVal);
                        });
                    };

                    element.datepicker({
                        inline: true,
                        dateFormat: 'dd.mm.yy',
                        onClose: processChange,
                        onSelect: processChange
                    });
                };

            }
        };
    }

    ttBase.module.directive('ttDatePicker', ['$parse', 'dateService', ttDatePicker]);
})();