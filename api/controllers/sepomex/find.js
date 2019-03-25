/**
 *
 * @param {*} req
 * @param {*} res
 */

module.exports = async (req, res) => {
  let zipCodeData;
  redisClient.get(`${req.params.codigo}`, async (err, value) => {
    if (err) {
      return res.badRequest();
    } else if (value) {
      zipCodeData = JSON.parse(value);
    } else {
      const zipCode = await Sepomex.find({
        where: {
          codigo: req.params.codigo
        },
        sort: [{
            estado: 'ASC'
          },
          {
            municipio: 'ASC'
          },
          {
            asentamiento: 'ASC'
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
          item.estado !== zipCodeData.states[zipCodeData.states.length - 1]
        ) {
          zipCodeData.states.push(item.estado);
        }
        if (
          !zipCodeData.cities.length ||
          item.municipio !== zipCodeData.cities[zipCodeData.cities.length - 1]
        ) {
          zipCodeData.cities.push(item.municipio);
        }
        zipCodeData.zones.push(item.asentamiento);
      });

      redisClient.set(`${req.params.codigo}`, JSON.stringify(zipCodeData));
    }
    return res.ok(zipCodeData);
  });
};
