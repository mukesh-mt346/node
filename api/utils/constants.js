const sd = require("swagger-jsdoc");

const swagger_options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Swagger-API Documentation",
      version: "1.0.0",
      description: "Swagger-API Documentation Dev..",
      contact: "apiteam@swagger.io",
    },
    schemes: ["http"],
    consumes: ["application/json"],
    produces: ["application/json"],
    servers: [
      {
        url: "http://localhost:8080",
      },
    ],
    tags: [
      {
        name: "Order",
        description: "Order..",
      },
      {
        name: "Product",
        description: "Product..",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    security: [{ bearerAuth: [] }],
    paths: {
        '/products': {
            get: {
                summary: 'Get a product',
                tags: ['Product'],
                responses: {
                    200: {
                        description: 'OK! Product was successfully retrieved.',
                    }
                }
            }
    
        }
      },
  },
  
  apis: ["app.js"],
};
const swagger_spec = sd(swagger_options);

module.exports = { swagger_spec };
