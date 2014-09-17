(function () {
    "use strict";

     function BastaGatewayService ($http, configService, $rootScope, $timeout, $location ) {
        var that = this;  //this ist der Context   wenn in der Constructorfunktion this in that gesichert wird dann kann that immer verwendet werden this nicht (ist nicht wie in anderen Sprachen)

        function verarbeiteLongPollingAntwort(antwort) {
            if (antwort.befehl) {
                switch (antwort.befehl) {
                    case "lpDialogOeffnen":
                        if (!antwort || !antwort.returnUrl) {
                            toast.showError("Kein returnUrl erhalten");
                        }
                        $rootScope.$broadcast("bastaGatewayService.DialogOeffnen", antwort);
                        break;

                    default:
                        throw new Error("Unbekannter Befehlt von Delphi: '" + antwort.befehl + "'");
                }
            }
        }

        this.starteLongPolling = function () {
            var url = configService.getServiceUrl("/api/sBefehl/starteLongPolling" );

            function handleError() {
                $timeout(function () {
                    that.starteLongPolling();
                }, 100);        //100 ms warten bis wieder ein LongPolling gestartet wird (Sicherstellen das nicht 2 parallel)
            }

            $http.get(url).then(function (response) {

                if (response.status == 200) {
                    if (response.data){ // && response.data._stopPolling) {
                        return; // kein weiteres polling
                    } else {
                        verarbeiteLongPollingAntwort(response.data);
                        // sofort nächster request für weitere Kommandos
                        that.starteLongPolling();
                    }
                } else {
                    handleError();
                }
            }, function (err) {
                handleError();
            });
        };
    }

    app.module.service("bastaGatewayService", BastaGatewayService);
})();
