import {MongoClient} from 'mongoDb'
import config from '../config.json';
import { BlogMetaData } from './types/blog';


export const findAllAuthors = async () => {
    const client = new MongoClient(config.mongoUri); 
    let authorBlogMetaData;
    try {
        await client.connect();
        authorBlogMetaData = (await client.db('authors').collection<BlogMetaData>('author').find({}).toArray()) as BlogMetaData[];
    } catch (e) {
        console.error(e);
    }
    return authorBlogMetaData;
}