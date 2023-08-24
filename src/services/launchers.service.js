import cron from 'node-cron';
import format from 'dayjs';

import Api from '../../api.js';
import LauncherRepository from '../repositories/launchers.repository.js';
import ValidationError from '../core/errors/ValidationError.js';


export default class LaunchersService {

    constructor() {
        cron.schedule('0 9 * * *', async () => {
            await this.seedDatabase();
        });

        this.MAX_QUERY = process.env.MAX_QUERY;
    }

    async returnStringChalenger() {
        return {
            "message": "Fullstack Challenge 🏅 - Space X API"
        };
    }

    async fetchAndProcessSpaceXData() {
        try {
            return await new Api().fetchSpaceXData();
        } catch (e) {
            throw new ValidationError("Error Message")
        }
    }

    async seedDatabase() {
        try {

            const spacexData = await new Api().fetchSpaceXData()
            const rocketIdToName = {
                "5e9d0d95eda69973a809d1ec": "Falcon 9",
                "5e9d0d95eda69974db09d1ed": "Falcon Heavy",
                "5e9d0d95eda69955f709d1eb": "Falcon 1"
            };

            const transformedData = spacexData.map(launch => {
                const {name, date_utc, rocket, links, success, flight_number} = launch;

                const logoUrl = links && links.patch && links.patch.small;

                const cores = launch.cores.map(core => ({
                    core: core.core,
                    flight: core.flight,
                    gridfins: core.gridfins,
                    legs: core.legs,
                    reused: core.reused,
                    landing_attempt: core.landing_attempt,
                    landing_success: core.landing_success,
                    landing_type: core.landing_type,
                    landpad: core.landpad
                }));

               console.log(logoUrl)
                const rocketName = rocketIdToName[rocket] || "Unknown Rocket";
                const webcast = links && links.webcast;

                const formattedDate = format(new Date(date_utc), 'HH:mm:ss dd/MM/yyyy');


                return {
                    name: name,
                    date: formattedDate,
                    rocket: rocketName,
                    webcast: webcast,
                    success: success,
                    flight_number: flight_number,
                    cores: cores,
                    logo: logoUrl
                };
            });

            await new LauncherRepository().seedDatabase(transformedData);
        } catch (e) {
            console.log(e)
            throw new ValidationError("Error Message")
        }
    }

    async listData(query) {
        try {
            const MAX_QUERY = 1000

            const filter = {
                nome: query.search || 'tesla',
                numeroPagina: parseInt(query.numeroPagina) || 1,
                tamanhoPagina: parseInt((!query.tamanhoPagina
                || query.tamanhoPagina > MAX_QUERY)
                    ? MAX_QUERY : query.tamanhoPagina)
            }

            return await new LauncherRepository().listData(filter)
        } catch (e) {
            throw new ValidationError("Error Message")
        }
    }
}