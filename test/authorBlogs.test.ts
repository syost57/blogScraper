import {JSDOM} from "jsdom"
import {fetchBlogUpdates} from '../src/authorBlogs'
import * as mockDBCalls from '../src/database';
import axios from 'axios'
import { ObjectId } from 'mongoDb';
jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

jest.mock('../src/database')
const mockFindAllAuthors = jest.mocked(mockDBCalls.findAllAuthors);

describe("finding the most recent posts from a set of authors!", () =>{
    const { window } = new JSDOM('<!doctype html><html><body><article id="post-23456"><h1><a>A new post!</a></h1></article></body></html>');    
    mockedAxios.get.mockResolvedValue(window);
    
    const fakeBlogDataInitial = {
        authorId: new ObjectId('6355c69b717b2c530b2f3a21'),
        author: 'Brandon Sanderson',
        blogUrl: 'blog.com',
        articleHTMLElement: "article",
        previousMostRecentArticle: "post-12356",
        notificationText: "",
        linkHTML: "h1 a"
    }

    const fakeBlogDataOutput = {
        authorId: new ObjectId('6355c69b717b2c530b2f3a21'),
        author: 'Brandon Sanderson',
        blogUrl: 'blog.com',
        articleHTMLElement: "article",
        previousMostRecentArticle: "post-23456",
        notificationText: "Brandon Sanderson has a new blog post! Title: A new post! blog.com",
        linkHTML: "h1 a"
    }
    afterEach(()=> jest.clearAllMocks())
    
    it("Fetches the blog dom from the provided url for a given author and returns the new post info", () => {
        const mockFindAuthors = mockFindAllAuthors.mockResolvedValueOnce([fakeBlogDataInitial])
        // const mockUpdate = jest.spyOn(mockDBCalls, 'updateAuthorsWithNewPosts')
        fetchBlogUpdates();
        expect(mockFindAuthors).toHaveBeenCalled();
        // expect(mockedAxios.get).toHaveBeenCalled();
        expect(mockDBCalls.updateAuthorsWithNewPosts).toHaveBeenCalledWith([fakeBlogDataOutput]);
    });
})