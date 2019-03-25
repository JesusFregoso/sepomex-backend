/**
 * find.js
 *
 * @module      :: Policy
 * @description :: Simple policy to validate
 * @docs        :: http://sailsjs.org/#!/documentation/concepts/Policies
 *
 */
module.exports = async (req, res, next) => {
  if (_.isUndefined(req.params.codigo)) { // eslint-disable-line
    return res.badRequest({}, {
      message: 'Codigo postal requerido'
    });
  } else {
    req.params.codigo = parseInt(req.params.codigo); // eslint-disable-line
    if (_.isNaN(req.params.codigo)) { // eslint-disable-line
      return res.badRequest({}, {
        message: 'Código postal debe ser numerico'
      });
    }
  }
  return next();
};
