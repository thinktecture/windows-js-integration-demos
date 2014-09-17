(function () {
    'use strict';

    /**
     * @constructor
     * @param $q
     * @param $http
     * @param {ConfigService} configService
     * @param {ConnectivityService} connectivityService
     */
    function DirectionApiService($q, $http, configService, connectivityService) {
        var baseUrl = configService.apiBaseUrl();
        var timeout = 10000;

        this.getByIdAsync = function (projektNr) {
            return ensureConnectivityAsync()
                .then(function () {
                    var param = encodeURI(projektNr);
                    return  $http.get(baseUrl + 'api/direction/getDirection', { timeout: timeout, params: { projektNr: param} });
                })
                .then(unwrapRecords)
                .then(function (records) {
                    if (records.length < 1) {
                        return $q.reject('Direction with id "' + projektNr + '" not found.');
                    }

                    return records[0];
                });
        };

        this.getTaskListByTypeAsync = function(projektNr, vorgangsArt) {
            return ensureConnectivityAsync()
                .then(function () {
                    var param = encodeURI(projektNr);
                    return  $http.get(baseUrl + 'api/task/getTaskListByType', { timeout: timeout, params: { projektNr: param, vorgangsArt: vorgangsArt } });
                })
                .then(unwrapRecords)
                .then(function (records) {
                    if (records.length < 1) {
                        return $q.reject('Direction with id "' + projektNr + '" in context "' + vorgangsArt + '" not found.');
                    }
                    return records;
                });
        };

        this.getFeesAsync = function(projektNr){
            return ensureConnectivityAsync()
                .then(function () {
                    return  $http.get(baseUrl + 'api/direction/getPositions', { timeout: timeout, params: { projektNr: projektNr } });
                })
                .then(unwrapRecords)
                .then(function (records) {
                    if (records.length < 1) {
                        return $q.reject('No positionen for project "' + projektNr + '" found.');
                    }

                    return records;
                });
        };


        this.getPositionsAsync = function(projektNr, titel) {
            return ensureConnectivityAsync()
                .then(function () {
                    return  $http.get(baseUrl + 'api/direction/getPositionsList', { timeout: timeout, params: { projektNr: projektNr, titel: titel } });
                })
                .then(unwrapRecords)
                .then(function (records) {
                    if (records < 1) {
                        return $q.reject('No positionen for project "' + projektNr + '" found.');
                    }

                    return records;
                });
        };


        this.getBillsAsync = function(projektNr) {
            return ensureConnectivityAsync()
                .then(function () {
                    return  $http.get(baseUrl + 'api/direction/getBills', { timeout: timeout, params: { projektNr: projektNr } });
                })
                .then(unwrapRecords)
                .then(function (records) {
                    if (records < 1) {
                        return $q.reject('No bills for project "' + projektNr + '" found.');
                    }

                    return records;
                });
        };

        function ensureConnectivityAsync() {
            if (!connectivityService.connectivity()) {
                return $q.reject('Web API calls are not allowed in offline mode.');
            }

            return $q.when();
        }

        function unwrapRecords(webResponse) {
            return webResponse.data.records;
        }

    }

    app.module.service('directionApiService', DirectionApiService);
})();
