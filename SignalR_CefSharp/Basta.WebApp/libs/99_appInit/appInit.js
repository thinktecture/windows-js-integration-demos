(function () {
    "use strict";

    $(function(){
        FastClick.attach(document.body);
    });

    window.app = window.app || { resolver: {} };
    app.module = angular.module('basta', ['ui.router', 'ttBase']);
})();
