import {MongoClient} from 'mongoDb'
import config from '../config.json';


export const mongoConnect = async () => {
    const client = new MongoClient(config.mongoUri); 
    try {
        await client.connect();
    } catch (e) {
        console.error(e);
    }
}