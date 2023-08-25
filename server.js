import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import swaggerUI from 'swagger-ui-express'

import router from './src/routes/index.js';
import swaggerSpecs from './src/config/swaggerConfig.js'


const app = express()

app.use(cors())
app.use(express.json())
app.use(router)

mongoose.connect('mongodb://127.0.0.1:27017/spacex');

app.use('/docs', swaggerUI.serve, swaggerUI.setup(swaggerSpecs));


app.listen(3003, () => {
    console.log("App Iniciando na porta 3003")
})