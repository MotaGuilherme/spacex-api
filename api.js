import axios from 'axios';

export default class Api {
    async fetchSpaceXData() {

        try {
            const response = await axios.get('https://api.spacexdata.com/v4/launches?limit=${limit}');
            return response.data;
        } catch (error) {
            throw new Error('Error to find API data');
        }
    }
}