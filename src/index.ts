import { JSDOM } from 'jsdom';
import axios from 'axios';

const getBlogDom = async (blogUrl:string) => {
	return await axios.get(blogUrl);
}

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
    previousMostRecentArticle: '    blog-post-403323354847902201',
    // previousMostRecentArticle: 'blog-post-490735759706768783',
    linkHTML: 'div h2 a'
}
const blogs = [andrewRowe, willWight]


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
const main = () => {
    blogs.forEach((blog) => {
        blogScraper(blog).then((data) => 
        console.log(data));
    });
}
main();