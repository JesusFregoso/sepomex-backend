/**
 * AuthController
 *
 * @description :: Server-side logic for managing auths
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
  index: function (req, res) {
    var username = req.param('username');
    var password = req.param('password');

    if (!username || !password) {
      return res.status(401).json({
        err: 'username and password required'
      });
    }

    Users.findOne({
      username: username
    }, function (err, user) {
      if (!user) {
        return res.status(401).json({
          err: 'invalid username or password'
        });
      }

      Users.comparePassword(password, user, function (err, valid) {
        if (err) {
          return res.status(403).json({
            err: 'forbidden'
          });
        }

        if (!valid) {
          return res.status(401).json({
            err: 'invalid username or password'
          });
        } else {
          res.status(200).json({
            user: user,
            token: jwToken.issue({
              id: user.id
            })
          });
        }
      });
    })
  }
};
