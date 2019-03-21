/**
 * logPolicy.js
 *
 * @module      :: Policy
 * @description :: Simple policy to register log
 * @docs        :: http://sailsjs.org/#!/documentation/concepts/Policies
 *
 */
module.exports = async (req, res, next) => {
  global.callId = req.headers.id;
  sails.helpers.elasticKibana.createRegister
    .with({
      id: req.headers.id,
      type: 'info',
      file: __filename,
      title: 'Init Policy on Sepomex',
      data: {
        req: req.body,
        headers: req.headers
      }
    })
    .then();
  return next();
};
