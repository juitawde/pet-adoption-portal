const swaggerJsdoc = require('swagger-jsdoc');
const options = {
    definition: {
        openapi: '3.0.0',
        info: { title: 'PetMatch API', version: '1.0.0', description: 'Pet adoption portal REST API' },
        servers: [{ url: 'http://localhost:5000' }],
        components: { securitySchemes: { bearerAuth: { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' } } }
    },
    apis: []
};
module.exports = swaggerJsdoc(options);
