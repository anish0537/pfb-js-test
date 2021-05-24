import axios from 'axios';
// CONFIG
import config from './default.json';

const baseUrl = config.prod;

class Request {
    async get(path, params={}, url=''){
        const uri = url ? url+path : baseUrl+path;
        return await axios.get(uri);
    };
}

const httpReq = new Request;

export {
    baseUrl,
    httpReq
}