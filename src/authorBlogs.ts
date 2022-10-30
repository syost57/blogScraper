
import { JSDOM } from 'jsdom';
import axios from 'axios';
import { findAllAuthors } from './database';
import { BlogMetaData } from './types/blog';

const getBlogDom = async (blogUrl:string) => {
	return await axios.get(blogUrl);
}

const blogScraper = async (blog: BlogMetaData) => {
    const data = await getBlogDom(blog.blogUrl);
    const articles = new JSDOM(data.data).window.document;
    const mostRecentArticle = articles.querySelector(blog.articleHTMLElement);

    if(mostRecentArticle && mostRecentArticle?.getAttribute('id') !== blog.previousMostRecentArticle) {
        blog.previousMostRecentArticle = mostRecentArticle.id;
        return `${blog.author} has a new blog post! Title: ${mostRecentArticle.querySelector(blog.linkHTML)?.textContent} \n${mostRecentArticle.querySelector(blog.linkHTML)}`
}
}

export const fetchAuthorsFromDb = async () => {
    const authors = await findAllAuthors();
    return authors || [];
}

export const fetchBlogUpdates = async () => {
    let blogUpdateResults:any[] = []
    const authors = await fetchAuthorsFromDb();
    for(const authorBlogData of authors) {
       let blogData = await blogScraper(authorBlogData);
       blogData && blogUpdateResults.push(blogData);
    };
    return blogUpdateResults;
}