import { Application } from "express";
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { measureDocs } from "./swaggerDocs";

const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'API de Medições',
      version: '1.0.0',
    },
    paths: {
      ...measureDocs,
    },
  },
  apis: ['./src/routes/*.ts'],
} as swaggerJsdoc.Options;

const swaggerDocs = swaggerJsdoc(swaggerOptions);

const useSwagger = (app: Application) => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
};

export default useSwagger;
