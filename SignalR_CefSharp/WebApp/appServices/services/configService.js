(function () {
    "use strict";

    /**
     * @constructor
     */
    function ConfigService () {
        this.getBasisUrl = function () {
            return "http://localhost:9000";
        };

        this.getDelphiPollingSollGestartetWerden = function(){
            return true;
        };

        this.getServiceUrl = function (relativeUrl) {
            // console.log("GetServiceUrl - " + relativeUrl);
            var url = this.getBasisUrl();

            url = url + relativeUrl;

/*            if (url.indexOf("?")>=0){
                   url+="&";
            }    else {
                url +="?";
            }
            url = url + "_=" + new Date().getTime();  //Verhindert das Caching der JSON Dateien
*/
            return url;
        };
    }

    app.module.service("configService", ConfigService);

})();