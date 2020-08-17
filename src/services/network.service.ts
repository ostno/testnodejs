import axios from 'axios';

export class NetworkService {

    get(url: string): Promise<any> {
        console.log(url);
        return axios.get(url);
    }

}