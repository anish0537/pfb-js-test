import { httpReq } from '../config/request';

const getPlayersData = async () => {
    try{
        const { data } = await httpReq.get('/20c1afef1661881ddc9c');
        return { success: true, data }
    }catch(error){
        return { success: false, error }
    }
}

export {
    getPlayersData
}