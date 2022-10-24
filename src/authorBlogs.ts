
import { JSDOM } from 'jsdom';
import axios from 'axios';
import authors from './authors.json'

interface BlogMetaData {
    author?: string,
    blogUrl: string,
    articleHTMLElement: string,
    previousMostRecentArticle: string,
    linkHTML: string
}

const getBlogDom = async (blogUrl:string) => {
	return await axios.get(blogUrl);
}

const blogScraper = async (blog: BlogMetaData) => {
    const data = await getBlogDom(blog.blogUrl);
    const articles = new JSDOM(data.data).window.document;
    const mostRecentArticle = articles.querySelector(blog.articleHTMLElement);

    if(mostRecentArticle){
    if(mostRecentArticle.getAttribute('id') !== blog.previousMostRecentArticle) {
        blog.previousMostRecentArticle = mostRecentArticle.id;
        return `${blog.author} has a new blog post! Title: ${mostRecentArticle.querySelector(blog.linkHTML)?.textContent} \n${mostRecentArticle.querySelector(blog.linkHTML)}`
}
    }
}
export const fetchBlogUpdates = async () => {
    let blogUpdateResults:any[] = []
    for(const authorBlogData of authors) {
       let blogData = await blogScraper(authorBlogData);
       blogData && blogUpdateResults.push(blogData);
    };
    return blogUpdateResults;
}