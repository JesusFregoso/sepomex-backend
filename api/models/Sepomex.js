/**
 * Sepomex.js
 *
 * @description :: A model definition.  Represents a database table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  attributes: {
    id: {
      type: 'number',
      autoMigrations: {
        autoIncrement: true
      }
    },
    /* eslint-disable-next-line */
    d_codigo: {
      type: 'number'
    },
    /* eslint-disable-next-line */
    d_estado: {
      type: 'string'
    },
    /* eslint-disable-next-line */
    D_mnpio: {
      type: 'string'
    },
    /* eslint-disable-next-line */
    d_asenta: {
      type: 'string'
    },
  },
};
