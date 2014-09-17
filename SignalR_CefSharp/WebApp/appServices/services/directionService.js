(function () {
    "use strict";

    /**
     *
     * @param $http
     * @param $q
     * @param {SearchResultService} searchResultService
     * @param {ConfigService} configService
     * @param {ConnectivityService} connectivityService
     * @param {DirectionApiService} directionApiService
     * @constructor
     */
    function DirectionService($http, $q, searchResultService, configService, connectivityService, directionApiService) {
        var baseUrl = configService.apiBaseUrl();
        var timeout = 10000;
        var Positionen;

        /**
         * @param {String} searchText
         * @param {int} [resultCount]
         * @returns {Promise}
         */
        function search(searchText, resultCount) {
            return $http.get(baseUrl + 'api/direction/search', { timeout: timeout, params: { searchText: searchText, resultCount: resultCount } })
                .then(function (response) {
                    angular.forEach(response.data.records, function (record, index) {
                        record.$index = index;
                        record.$isFirst = index === 0;
                        record.$isLast = index === response.data.records.length - 1;
                    });
                    searchResultService.keep('directions', searchText + resultCount, response.data.records);
                    return response.data.records;
                });
        }

        /**
         *
         * @returns {Promise}
         */
        function workers() {
            return $http.get(baseUrl + 'api/direction/workers', { timeout: timeout, params: { } })
                .then(function (response) {
                    searchResultService.keep('directions_workers', 'workers', response.data.records);
                    return response.data.records;
                });
        }

        /**
         *
         * @returns {Promise}
         */
        function categories() {
            return $http.get(baseUrl + 'api/direction/categories', { timeout: timeout, params: { } })
                .then(function (response) {
                    searchResultService.keep('directions_categories', 'categories', response.data.records);
                    return response.data.records;
                });
        }

        /**
         *
         * @param regieAuswahl
         * @param sachbearbeiter
         * @param kategorie
         * @returns {Promise}
         */
        function overview(regieAuswahl, sachbearbeiter, kategorie) {
            return $http.get(baseUrl + 'api/direction/overview', {
                timeout: timeout,
                params: {
                    RegieAuswahl: regieAuswahl,
                    Sachbearbeiter: sachbearbeiter,
                    Kategorie: kategorie
                }})
                .then(function (response) {

                    return response.data.records;
                });
        }

        /**
         * @param {String} searchText
         * @param {Boolean?} force
         * @param resultCount
         * @returns {Promise}
         */
        this.search = function (searchText, resultCount, force) {
            if (force) {
                return search(searchText, resultCount);
            }

            var results = searchResultService.restore('directions', searchText + resultCount);
            return results ? $q.when(results) : search(searchText, resultCount);
        };

        /**
         *
         * @param {Boolean?} force
         * @returns {Promise}
         */
        this.workers = function (force) {
            if (force) {
                return workers();
            }
            var results = searchResultService.restore('directions_workers', 'workers');
            return results ? $q.when(results) : workers();
        };

        /**
         *
         * @param {Boolean?} force
         * @returns {Promise}
         */
        this.categories = function (force) {
            if (force) {
                return categories();
            }
            var results = searchResultService.restore('directions_categories', 'categories');
            return results ? $q.when(results) : categories();
        };


        this.overview = function (regieAuswahl, sachbearbeiter, kategorie) {
            return $http.get(baseUrl + 'api/direction/overview', {
                timeout: timeout,
                params: {
                    RegieAuswahl: regieAuswahl,
                    Sachbearbeiter: sachbearbeiter,
                    Kategorie: kategorie
                }})
                .then(function (response) {

                    return response.data.records;
                });
        };


        /**
         *
         * @param {string} projektNr
         * @returns {Promise}
         */
        this.getById = function (projektNr) {

            var promise;

            if (connectivityService.connectivity()) {
                promise = directionApiService.getByIdAsync(projektNr);
            }
            else {
                promise = clientDatabaseService.getDirectionByIdAsync(projektNr);
            }

            return promise
                .then(function (record) {
                    var records = [record];
                    return records;
                });
        };


        /**
         *
         * @param {string} projektNr
         * @param {string} vorgangsArt
         * @returns {Promise}
         */
        this.getTaskListByType = function(projektNr, vorgangsArt) {
            var promise;

            if (connectivityService.connectivity()) {
                promise = directionApiService.getTaskListByTypeAsync(projektNr, vorgangsArt);
            }
            else {
                promise = clientDatabaseService.getTaskListForDirectionByTypeAsync(projektNr, vorgangsArt);
            }

            return promise
                .then(function (records) {
                    return records;
                });
        };

        this.getFees = function(projektNr){
            var promise;

            if (connectivityService.connectivity()) {
                promise = directionApiService.getFeesAsync(projektNr)
                    .then(function (data) {
                        return data;
                    }, function (reason) {
                        console.log(reason);
                    });
            }
            else {
                promise = clientDatabaseService.getFeesAsync(projektNr);
            }

            return promise
                .then(function (records) {
                    Positionen = records;
                    return records;
                });
        };

        this.getPositions = function (projektNr, titel) {
            var promise;

            if (connectivityService.connectivity()) {
                promise = directionApiService.getPositionsAsync(projektNr, titel)
                    .then(function (data) {
                        return data;
                    });
            }
            else {
                promise = clientDatabaseService.getPositionsAsync(projektNr, titel);
            }

            return promise
                .then(function (records) {
                    return records;
                });
        };

        this.getBills = function (projektNr) {
            var promise;

            if (connectivityService.connectivity()) {
                promise = directionApiService.getBillsAsync(projektNr)
                    .then(function (data) {
                        return data;
                    });
            }
            else {
                promise = clientDatabaseService.getBillsAsync(projektNr);
            }

            return promise
                .then(function (records) {
                    return records;
                });
        };


        // --------------------------------------------------------------------
        //
        // Positionen
        //
        // --------------------------------------------------------------------

        var self = this;
        this.calculateFees = function () {
            var ekMat, vkMat, zuschlagMat,
                ekRoh, vkRoh, zuschlagRoh,
                ekLohn, vkLohn, zuschlagLohn,
                summeEk, summeVk, summeZuschlag;

            ekMat = self.EKMaterial();
            vkMat = self.VKMaterial();
            zuschlagMat = ekMat - vkMat;

            ekRoh = self.EKRohstoff();
            vkRoh = self.VKRohstoff();
            zuschlagRoh = ekRoh - vkRoh;

            ekLohn = self.EKLohn();
            vkLohn = self.VKLohn();
            zuschlagLohn = ekLohn - vkLohn;

            summeEk = ekMat + ekRoh + ekLohn;
            summeVk = vkMat + vkRoh + vkLohn;
            summeZuschlag = zuschlagMat + zuschlagRoh + zuschlagLohn;

            return {
                EKMaterial: ekMat,
                VKMaterial: vkMat,
                ZUMaterial: zuschlagMat,
                EKRohstoff: ekRoh,
                VKRohstoff: vkRoh,
                ZURohstoffe: zuschlagRoh,
                EKLohn: ekLohn,
                VKLohn: vkLohn,
                ZULohn: zuschlagLohn,
                EKSumme: summeEk,
                VKSumme: summeVk,
                ZUSumme: summeZuschlag
            };
        };

        this.EKMaterial = function(){
            var summe = 0;

            angular.forEach(Positionen, function (position) {
                if(((position.PosSaKZ == "P" && (position.PosSaSZ == "N" || position.PosSaSZ == "E")) || position.PosSaKZ == "Z") && position.PosNachlass == 0) {
                    // Positionen ohne Nachlass
                    summe += ((parseFloat(position.PosNMatM) + parseFloat(position.PosNZub)) * parseFloat(position.PosMenge));
                }
                else if(((position.PosSaKZ == "P" && position.PosSaSZ == "N") || position.PosSaKZ == "Z") && position.PosNachlass != 0){
                    // Positionen mit Nachlass
                    summe += ((parseFloat(position.PosNMatM) + parseFloat(position.PosNZub)) * parseFloat(position.PosMenge));
                }
            });
            return summe;
        };

        this.VKMaterial = function () {
            var summe = 0;
            angular.forEach(Positionen, function (position) {
                if(((position.PosSaKZ == "P" && (position.PosSaSZ == "N" || position.PosSaSZ == "E")) || position.PosSaKZ == "Z") && position.PosNachlass == 0) {
                    // Positionen ohne Nachlass
                    summe += ((parseFloat(position.PosMatM) + parseFloat(position.PosZub)) * parseFloat(position.PosMenge));
                }
                else if(((position.PosSaKZ == "P" && position.PosSaSZ == "N") || position.PosSaKZ == "Z") && position.PosNachlass != 0) {
                    // Positionen mit Nachlass
                    if (position.PosNachlass != 100) {
                        summe += (((parseFloat(position.PosMatM) + parseFloat(position.PosZub)) / 100 * (100 - parseFloat(position.PosNachlass))) * parseFloat(position.PosMenge));
                    };
                }
            });
            return summe;
        };

        this.EKRohstoff = function () {
            var summe = 0;
            angular.forEach(Positionen, function (position) {
                if(((position.PosSaKZ == "P" && (position.PosSaSZ == "N" || position.PosSaSZ == "E")) || position.PosSaKZ == "Z") && position.PosNachlass == 0)
                {
                    // Positionen ohne Nachlass
                    summe += (parseFloat(position.PosNMatZ) * parseFloat(position.PosMenge));
                }
                else if(((position.PosSaKZ == "P" && position.PosSaSZ == "N") || position.PosSaKZ == "Z") && position.PosNachlass == 0)
                {
                    // Positionen mit Nachlass
                    summe += (parseFloat(position.PosNMatZ) * parseFloat(position.PosMenge));
                }
            });
            return summe;
        };

        this.VKRohstoff = function () {
            var summe = 0;
            angular.forEach(Positionen, function (position) {
                if(((position.PosSaKZ == "P" && (position.PosSaSZ == "N" || position.PosSaSZ == "E")) || position.PosSaKZ == "Z") && position.PosNachlass == 0)
                {
                    // Positionen ohne Nachlass
                    summe += (parseFloat(position.PosMatZ) * parseFloat(position.PosMenge));
                }
                else if(((position.PosSaKZ == "P" && position.PosSaSZ == "N") || position.PosSaKZ == "Z") && position.PosNachlass == 0)
                {
                    // Positionen mit Nachlass
                    if(position.PosNachlass != 100) {
                        summe += ((parseFloat(position.PosMatZ) / 100 * (100 - parseFloat(position.PosNachlass))) * parseFloat(position.PosMenge));
                    }
                 }

            });
            return summe;
        };

        this.VKLohn = function () {
            var summe = 0;
            angular.forEach(Positionen, function (position) {
                if(((position.PosSaKZ == "P" && (position.PosSaSZ == "N" || position.PosSaSZ == "E")) || position.PosSaKZ == "Z") && position.PosNachlass == 0)
                {
                    // Positionen ohne Nachlass
                    summe += (parseFloat(position.PosLohn) * parseFloat(position.PosMenge));
                } else if(((position.PosSaKZ == "P" && position.PosSaSZ == "N") || position.PosSaKZ == "Z") && position.PosNachlass == 0) {
                    // Positionen mit Nachlass
                    if(myPos.PosNachlass != 100) {
                        summe += ((parseFloat(position.PosLohn) / 100 * (100 - parseFloat(position.PosNachlass))) * parseFloat(position.PosMenge));
                    }
                }
            });
            return summe;
        };

        this.EKLohn = function () {
            var summe = 0;
            if(Positionen && Positionen.length > 0) {
                var voreinstellungen = Positionen[0].VerarbVoreinst;

                if(voreinstellungen != "")
                {
                    var sLohnW = voreinstellungen.substr(100, 7);
                    var sLohnB = voreinstellungen.substr(142, 7);

                    var fLohnW = parseFloat(sLohnW);
                    var fLohnB = parseFloat(sLohnB);

                    if(fLohnB && fLohnW) {
                        summe = ((aztStdW() * fLohnW) + (aztStdB() * fLohnB) + lohnzuschlag());
                    }
                }
            }
            return summe;
        };

        var lohnzuschlag = function () {
            var summe = 0;
            angular.forEach(Positionen, function (position) {
                if (position.PosSaKZ == "Z") {
                    summe += parseFloat(position.PosLohn);
                }
            });
            return summe;
        };

        var aztStdW = function() {
            var summe = 0;
            angular.forEach(Positionen, function (position) {
                if((position.PosSaKZ == "P" && position.PosSaSZ == "N") || position.PosSaSZ == "Z")
                {
                    switch(position.PosAZtEH.toUpperCase()) {
                        case "MINUTEN":
                            summe += ((parseFloat(position.PosAZtW) * parseFloat(position.PosMenge)) / 60);
                            break;
                        case "STUNDEN":
                            summe += parseFloat(position.PosAZtW) * parseFloat(position.PosMenge);
                            break;
                        case "ARB.EINH":
                            summe += ((parseFloat(position.PosAZtW) * parseFloat(position.PosMenge)) / 100);
                            break;
                    }
                }
            });
            return summe;
        }

        var aztStdB = function() {
            var summe = 0;
            angular.forEach(Positionen, function (position) {
                if((position.PosSaKZ == "P" && position.PosSaSZ == "N") || position.PosSaSZ == "Z")
                {
                    switch(position.PosAZtEH.toUpperCase()) {
                        case "MINUTEN":
                            summe += ((parseFloat(position.PosAZtB) * parseFloat(position.PosMenge)) / 60);
                            break;
                        case "STUNDEN":
                            summe += parseFloat(position.PosAZtB) * parseFloat(position.PosMenge);
                            break;
                        case "ARB.EINH":
                            summe += ((parseFloat(position.PosAZtB) * parseFloat(position.PosMenge)) / 100);
                            break;
                    }
                }
            });
            return summe;
        }
    }

    app.module.service('directionService', DirectionService);

})();