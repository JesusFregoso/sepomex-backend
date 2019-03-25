/**
 * UsersController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

const jwToken = require('../services/jwToken');
module.exports = {
  create: async function (req, res) {
    if (req.body.password !== req.body.confirmPassword) {
      return res.status(401).json({
        err: 'Password doesn\'t match!'
      });
    }
    const username = await Users.find({
      username: req.body.username
    });

    if (username.length) {
      return res.status(401).json({
        err: 'username already exist'
      });
    }
    const user = await Users.create(req.body).fetch();


    if (!user) {
      return res.status(401).json({
        err: 'cant create the user'
      });
    }
    delete user.password;
    const token = await jwToken.issue({
      id: user.id
    });
    return res.status(401).json({
      user: Object.assign({}, user),
      token: token
    });
  }
};
