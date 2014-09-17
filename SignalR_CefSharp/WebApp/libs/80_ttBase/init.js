(function () {
    "use strict";

    window.ttBase = window.ttBase || {};
    ttBase.module = angular.module('ttBase', []);

    /**
     * @typedef {object} HttpPromise
     * @property {Promise~then} then
     * @property {Promise~catch} catch
     * @property {Promise~finally} finally
     * @property {HttpPromise~success} success
     * @property {HttpPromise~error} error
     */

    /**
     * @callback HttpPromise~success
     * @param {*} response
     * @returns {Promise}
     */

    /**
     * @callback HttpPromise~error
     * @param {*} rejection
     * @returns {Promise}
     */

    /**
     * @typedef {object} Promise
     * @property {Promise~then} then
     * @property {Promise~catch} catch
     * @property {Promise~finally} finally
     */

    /**
     * @callback Promise~then
     * @param {Promise~then~success} success
     * @param {Promise~then~error} error
     * @param {Promise~then~notify} notify
     * @returns {Promise}
     */

    /**
     * @callback Promise~then~success
     * @param {*} response
     */

    /**
     * @callback Promise~then~error
     * @param {*} rejection
     */

    /**
     * @callback Promise~then~notify
     * @param {*} progress
     */

    /**
     * @callback Promise~catch
     * @param {Promise~catch~error} error
     * @returns {Promise}
     */

    /**
     * @callback Promise~catch~error
     * @param {*} rejection
     */

    /**
     * @callback Promise~finally
     * @param {Promise~finally~callback} callback
     * @returns {Promise}
     */

    /**
     * @callback Promise~finally~callback
     */

})();