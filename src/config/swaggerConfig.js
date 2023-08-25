import swaggerJsdoc from 'swagger-jsdoc';

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'API de Exemplo',
            version: '1.0.0',
        },
    },
    apis: ['./src/routes/*.js'], // Caminho para os arquivos que contêm as rotas
};

const specs = swaggerJsdoc(options);

export default specs;
