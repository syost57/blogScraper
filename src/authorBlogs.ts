
import { JSDOM } from 'jsdom';
import axios from 'axios';
import { findAllAuthors, updateAuthorsWithNewPosts } from './database';
import { BlogMetaData } from './types/blog';

const getBlogDom = async (blogUrl:string) => {
	return axios.get(blogUrl);
}

const formatBlogInfoForPrintout = (blog: BlogMetaData, mostRecentArticle: Element) => {
    return `${blog.author} has a new blog post! Title: ${mostRecentArticle.querySelector(blog.linkHTML)?.textContent} \n${mostRecentArticle.querySelector(blog.linkHTML)}`
}


const blogScraper = async (blog: BlogMetaData) => {
    try{
    const data = await getBlogDom(blog.blogUrl);
    const articles = new JSDOM(data.data).window.document;
    const mostRecentArticle = articles.querySelector(blog.articleHTMLElement);
    console.log(mostRecentArticle)
    if(mostRecentArticle && mostRecentArticle?.getAttribute('id') !== blog.previousMostRecentArticle) {
        console.log('theres a diff')
        blog.previousMostRecentArticle = mostRecentArticle.id;
        blog.notificationText = formatBlogInfoForPrintout(blog, mostRecentArticle)
        return blog;
    }
    
    } catch(error) {
        console.log(`Issue fetching details for ${blog.author}'s blog! ${error}`)
    }
}

export const fetchAuthorsFromDb = async () => {
    const authors = await findAllAuthors();
    return authors || [];
}

export const fetchBlogUpdates = async () => {
    let blogUpdateResults:BlogMetaData[] = []
    const authors = await fetchAuthorsFromDb();

    for(const authorBlogData of authors) {
       let blogData = await blogScraper(authorBlogData);
       blogData && blogUpdateResults.push(blogData);
    };
    console.log('end of the line')
    updateAuthorsWithNewPosts(blogUpdateResults)
    console.log('end of the line2')
    return blogUpdateResults;
}