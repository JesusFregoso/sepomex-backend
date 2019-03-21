module.exports = {
  friendlyName: 'Add a register',
  description: 'Add a register version JSON document',
  inputs: {
    id: {
      type: 'string',
      description: 'unique id for call',
      required: true
    },
    type: {
      type: 'string',
      description: 'warn, info, register, init, error',
      required: true
    },
    file: {
      type: 'string',
      description: 'ruta del archivo donde esta ocurriendo el log',
      required: true
    },
    title: {
      type: 'string',
      description: 'titulo para reconocer el log',
      required: true
    },
    data: {
      type: 'json',
      description: 'json con la información importante del log',
      required: true
    }
  },
  fn: async (inputs, exits) => {
    const config = custom.elasticSearchKibana;
    const createIndex = {
      id: inputs.id,
      type: inputs.type,
      file: inputs.fyle,
      title: inputs.title,
      app: custom.app,
      version: custom.version,
      data: JSON.stringify(inputs.data),
      createdAt: new Date().toISOString()
    };
    elasticSearchClient
      .index({
        index: config.index,
        type: config.type,
        body: createIndex
      })
      .then();
    return exits.success(true);
  }
};
