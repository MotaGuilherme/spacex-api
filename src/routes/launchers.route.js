import express from 'express';
import HttpStatus from'http-status';

import LaucherService from'../services/launchers.service.js';



const router = express.Router();

router.route('/')
    .get(async (req, res, next) => {
        try {
            res.status(HttpStatus.OK).send(await new LaucherService().returnStringChalenger());

        } catch (e) {
            next(e);
        }
    });

router.route('/launchers_api')
    .get(async (req, res, next) => {
        try {
            res.status(HttpStatus.OK).send(await new LaucherService().fetchAndProcessSpaceXData());

        } catch (e) {
            next(e);
        }
    });
router.route('/launchers')
    .get(async (req, res, next) => {
        try {
            res.status(HttpStatus.OK).send(await new LaucherService().listData(req.query));

        } catch (e) {
            next(e);
        }
    });
router.route('/seed_db')
    .post(async (req, res, next) => {
        try {
            res.status(HttpStatus.OK).send(await new LaucherService().seedDatabase(req.body));

        } catch (e) {
            next(e);
        }
    });


export default router;