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
    codigo: {
      type: 'number'
    },
    estado: {
      type: 'string'
    },
    municipio: {
      type: 'string'
    },
    asentamiento: {
      type: 'string'
    },
  },
};
