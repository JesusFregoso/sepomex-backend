/**
 * Policy Mappings
 * (sails.config.policies)
 *
 * Policies are simple functions which run **before** your actions.
 *
 * For more information on configuring policies, check out:
 * https://sailsjs.com/docs/concepts/policies
 */

module.exports.policies = {
  '*': ['isAuthorized'],
  PingController: {
    '*': false //public access
  },
  UsersController: {
    'create': true //public access
  },
  AuthController: {
    'index': true // public access
  }
};
