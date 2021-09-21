const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUI = require('swagger-ui-express');

const { name, version, description} = require('../package.json');


const apiDocSetup = swaggerJSDoc({
  swaggerDefinition: {
    info: {
      title: name,
      version,
      description
    }
  },
  apis: ['../routes/*.js']
})

const apiDoc = {
  serve: swaggerUI.serve,
  setup: swaggerUI.setup(apiDocSetup)
};


module.exports = apiDoc;