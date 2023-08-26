import express from 'express';
import HttpStatus from'http-status';

import LaucherService from'../services/launchers.service.js';



const router = express.Router();

/**
 * @swagger
 * /api:
 *   get:
 *     summary: Retorna string obrigatória
 *     responses:
 *       200:
 *         description:   "Fullstack Challenge 🏅 - Space X API"
 */
router.route('/')
    .get(async (req, res, next) => {
        try {
            res.status(HttpStatus.OK).send(await new LaucherService().returnStringChalenger());

        } catch (e) {
            next(e);
        }
    });


/**
 * @swagger
 * /api/launchers_api:
 *   get:
 *     summary: Dados da API da spaceX
 *     responses:
 *       200:
 *         description:  Retorna todos os dadas brutos fornecidos pela API
 */


router.route('/launchers_api')
    .get(async (req, res, next) => {
        try {
            res.status(HttpStatus.OK).send(await new LaucherService().fetchAndProcessSpaceXData());

        } catch (e) {
            next(e);
        }
    });


/**
 * @swagger
 * /api/launchers:
 *   get:
 *     summary: Dados do banco de dados
 *     responses:
 *       200:
 *         description:  Retorna todos os inseridos no banco de dados
 */
router.route('/launchers')
    .get(async (req, res, next) => {
        try {
            res.status(HttpStatus.OK).send(await new LaucherService().listData(req.query));

        } catch (e) {
            next(e);
        }
    });


/**
 * @swagger
 * /api/seed_db:
 *   post:
 *     summary: Persiste os dados no banco
 *     responses:
 *       200:
 *         description:  Persiste os dados no banco apenas para a alimentação de dados
 */
router.route('/seed_db')
    .post(async (req, res, next) => {
        try {
            res.status(HttpStatus.OK).send(await new LaucherService().seedDatabase(req.body));

        } catch (e) {
            next(e);
        }
    });


export default router;