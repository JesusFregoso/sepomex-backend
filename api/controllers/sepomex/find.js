/**
 *
 * @param {*} req
 * @param {*} res
 */

module.exports = async (req, res) => {
  let zipCodeData;
  redisClient.get(`${req.params.d_codigo}`, async (err, value) => {
    if (err) {
      return res.badRequest();
    } else if (value) {
      zipCodeData = JSON.parse(value);
    } else {
      const zipCode = await Sepomex.find({
        where: {
          d_codigo: req.params.d_codigo
        },
        sort: [{
            d_estado: 'ASC'
          },
          {
            D_mnpio: 'ASC'
          },
          {
            d_asenta: 'ASC'
          }
        ]
      });

      if (!zipCode.length) {
        return res.notFound({}, {
          message: 'Código postal invalido'
        });
      }

      zipCodeData = {
        states: [],
        cities: [],
        zones: []
      };
      zipCode.forEach(item => {
        if (
          !zipCodeData.states.length ||
          item.d_estado !== zipCodeData.states[zipCodeData.states.length - 1]
        ) {
          zipCodeData.states.push(item.d_estado);
        }
        if (
          !zipCodeData.cities.length ||
          item.D_mnpio !== zipCodeData.cities[zipCodeData.cities.length - 1]
        ) {
          zipCodeData.cities.push(item.D_mnpio);
        }
        zipCodeData.zones.push(item.d_asenta);
      });

      redisClient.set(`${req.params.d_codigo}`, JSON.stringify(zipCodeData));
    }
    return res.ok(zipCodeData);
  });
};
