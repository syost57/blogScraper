
import { JSDOM } from 'jsdom';
import axios from 'axios';

interface BlogMetaData {
    author?: string,
    blogUrl: string,
    articleHTMLElement: string,
    previousMostRecentArticle: string,
    linkHTML: string
}

const andrewRowe : BlogMetaData = {
    author: "Andrew Rowe",
    blogUrl: "https://andrewkrowe.wordpress.com",
    articleHTMLElement: 'article',
    previousMostRecentArticle: 'post-2383',
    linkHTML: 'h1 a'
}


const willWight : BlogMetaData = {
    author: "Will Wight",
    blogUrl: "https://www.willwight.com/a-blog-of-dubious-intent",
    articleHTMLElement: "div.blog-post",
    previousMostRecentArticle: 'blog-post-403323354847902201',
    linkHTML: 'div h2 a'
}

const rfKuang : BlogMetaData = {
    author: "Rebbeca F Kuang",
    blogUrl: "https://rfkuang.com",
    articleHTMLElement: 'article',
    previousMostRecentArticle: 'post-2053',
    linkHTML: 'h2 a'
}
const blogs = [andrewRowe, willWight, rfKuang]



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
    for(const authorBlogData of blogs) {
       let blogData = await blogScraper(authorBlogData);
       blogData && blogUpdateResults.push(blogData);
    };
    return blogUpdateResults;
}