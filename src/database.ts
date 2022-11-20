import {MongoClient, ObjectId} from 'mongoDb'
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
    client.close()  
    return authorBlogMetaData;
}

export const updateAuthorsWithNewPosts = async (authors: BlogMetaData[]) => {
    const client = new MongoClient(config.mongoUri); 
    try {
        if(authors.length > 0){
        await client.connect();
        const authorDB = await client.db('authors').collection<BlogMetaData>('author');
        for(let i = 0; i < authors.length; i ++){
        authorDB.updateOne({"author": authors[i].author},
         {"$set": {"previousMostRecentArticle":authors[i].previousMostRecentArticle, "notificationText": authors[i].notificationText }});
        }
    }
    } catch (e) {
        console.error(e);
    }
}