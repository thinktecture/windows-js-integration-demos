(function () {
    "use strict";

    $(function(){
        FastClick.attach(document.body);
    });

    window.app = window.app || { resolver: {} };
    app.module = angular.module('basta', ['ngRoute', 'ttBase']);

    window.initialFeatureConfig = {
        regie: false,
        projekt: false
    };

    function getFeatureSetting(featureSettings, feature) {
        if (featureSettings) {
            var setting = featureSettings[feature];
            return setting;
        }
        return false;
    }

    window.hasFeature = function (feature) {

        var featureSettings = localStorage.getItem('feature_settings');

        if (featureSettings) {
            featureSettings = angular.fromJson(featureSettings);
            angular.extend(window.initialFeatureConfig, featureSettings);
            featureSettings = window.initialFeatureConfig;
        }

        if (!featureSettings) {
            featureSettings = window.initialFeatureConfig;

        }

        localStorage.setItem('feature_settings', angular.toJson(featureSettings));

        return getFeatureSetting(featureSettings, feature);
    };
})();
