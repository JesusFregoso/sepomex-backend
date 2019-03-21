/**
 * Bootstrap
 * (sails.config.bootstrap)
 *
 * An asynchronous bootstrap function that runs just before your Sails app gets lifted.
 * > Need more flexibility?  You can also do this by creating a hook.
 *
 * For more information on bootstrapping your app, check out:
 * https://sailsjs.com/config/bootstrap
 */
const redis = require('redis');
const elasticSearch = require('elasticsearch');
module.exports.bootstrap = async function (done) {
  // By convention, this is a good place to set up fake data during development.
  //
  // For example:
  // ```
  // // Set up fake development data (or if we already have some, avast)
  // if (await User.count() > 0) {
  //   return done();
  // }
  //
  // await User.createEach([
  //   { emailAddress: 'ry@example.com', fullName: 'Ryan Dahl', },
  //   { emailAddress: 'rachael@example.com', fullName: 'Rachael Shaw', },
  //   // etc.
  // ]);
  // ```
  // Don't forget to trigger `done()` when this bootstrap function's logic is finished.
  // (otherwise your server will never lift, since it's waiting on the bootstrap)
  global.custom = sails.config.custom;
  global.elasticSearchClient = new elasticSearch.Client(
    custom.elasticSearchKibana.config
  );
  // Use default port: 6379 and host: 127.0.0.1
  // If you need some params: redis.createClient(port, host);
  global.redisClient = redis.createClient();
  global.redisClient.on('connect', () => {
    console.log('Redis successfully connected');
  });

  return done();
};
