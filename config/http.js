/**
 * HTTP Server Settings
 * (sails.config.http)
 *
 * Configuration for the underlying HTTP server in Sails.
 * (for additional recommended settings, see `config/env/production.js`)
 *
 * For more information on configuration, check out:
 * https://sailsjs.com/config/http
 */

var Raven = require('raven');
Raven.config(
  'http://dec9fc1f95cf477887f0c90319b9293a:afc95862f51249cb83e280e395014d2b@sentry.kichink.io/14'
).install();

module.exports.http = {
  /****************************************************************************
   *                                                                           *
   * Sails/Express middleware to run for every HTTP request.                   *
   * (Only applies to HTTP requests -- not virtual WebSocket requests.)        *
   *                                                                           *
   * https://sailsjs.com/documentation/concepts/middleware                     *
   *                                                                           *
   ****************************************************************************/

  middleware: {
    requestHandler: Raven.requestHandler(),
    errorHandler: Raven.errorHandler(),

    /***************************************************************************
     *                                                                          *
     * The order in which middleware should be run for HTTP requests.           *
     * (This Sails app's routes are handled by the "router" middleware below.)  *
     *                                                                          *
     ***************************************************************************/

    order: [
      'requestHandler',
      'requestLogger',
      'register',
      'keepAlive',
      'cookieParser',
      'session',
      'bodyParser',
      'compress',
      'router',
      'errorHandler'
    ],
    register: (function () {
      return async function (req, res, next) {
        // Create logs register
        // prettier-ignore
        req.headers.id = req.headers.id || 'UNKNOWN-ID';
        sails.helpers.elasticKibana.createRegister
          .with({
            id: req.headers.id,
            title: 'Sepomex Entrance',
            type: 'register',
            file: __filename,
            data: {
              fromApp: req.headers.app,
              fromVersion: req.headers.version,
              call: req.path,
              method: req.method
            }
          })
          .then();
        return next();
      };
    })(),
    keepAlive: (function () {
      return function (req, res, next) {
        res.set('Connection', 'keep-alive');
        return next();
      };
    })(),

    requestLogger: (function () {
      return function (req, res, next) {
        console.log('Request: ' + req.method + ' ' + req.path);
        return next();
      };
    })()

    /***************************************************************************
     *                                                                          *
     * The body parser that will handle incoming multipart HTTP requests.       *
     *                                                                          *
     * https://sailsjs.com/config/http#?customizing-the-body-parser             *
     *                                                                          *
     ***************************************************************************/

    // bodyParser: (function _configureBodyParser(){
    //   var skipper = require('skipper');
    //   var middlewareFn = skipper({ strict: true });
    //   return middlewareFn;
    // })(),
  }
};
