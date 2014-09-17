(function () {
    "use strict";

    function DialogService($location, bastaGatewayService, $rootScope) {
        var that = this;             //Zugriff ueber that auf diese Instanz
        var _parameter;
        var _rueckgabeWert;
        var _mementos = [];         //Stack der Dialogdaten (Scopes)

        this.oeffnen = function (url, parameter, callbackMemento) {
            $location.path(url);              //Springt zu diesem url
        };

        $rootScope.$on("bastaGatewayService.DialogOeffnen", function (event, antwort) {
            // wird vom bastaGatewayService ausgelöst
            if (antwort && antwort._debug) {
            }

            var url = antwort.url;

            that.oeffnen(url, antwort.parameter, null);
        });
    }

    app.module.service("dialogService", DialogService);

})();