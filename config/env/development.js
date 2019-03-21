/**
 * Local environment settings
 *
 * Use this file to specify configuration settings for use while developing
 * the app on your personal system.
 *
 * For more information, check out:
 * https://sailsjs.com/docs/concepts/configuration/the-local-js-file
 */

const mysql = require('sails-mysql');
const staticsVariables = require('./staticsVariables.js');
module.exports = {
  // Any configuration settings may be overridden below, whether it's built-in Sails
  // options or custom configuration specifically for your app (e.g. Stripe, Mailgun, etc.)
  port: 1500,
  datastores: {
    default: {
      adapter: mysql,
      url: 'mysql://root:root@localhost:4306/sepomex'
    }
  },

  models: {
    migrate: 'safe'
  },

  blueprints: {
    shortcuts: false
  },

  security: {
    cors: {
      allRoutes: true,
      allowOrigins: '*',
      allowCredentials: false,
    },
  },

  session: {
    cookie: {
      // secure: true,
      maxAge: 24 * 60 * 60 * 1000 // 24 hours
    }
  },

  sockets: {
    onlyAllowOrigins: []
  },

  log: {
    level: 'info'
  },

  http: {
    cache: 365.25 * 24 * 60 * 60 * 1000 // One year
    // trustProxy: true,
  },

  custom: {
    elasticSearchKibana: {
      index: 'register',
      type: 'logRegister',
      config: {
        host: 'localhost:9200',
        apiVersion: '6.2',
        log: false
      }
    },
    ...staticsVariables
  }
};
