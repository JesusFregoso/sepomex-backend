/**
 * PingController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  index: function (req, res) {
    res.status(200).json({
      status: `${custom.app} ${custom.version} is alive!`
    });
  }
};
