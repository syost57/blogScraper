import {JSDOM} from "jsdom"
const fakeAxios = jest.mock('axios');

const { window } = new JSDOM('<!doctype html><html><body><article id="post-23456"></article></body></html>');

describe("finding the most recent post", () =>{
    it("finds the newest post given the stored id", () => {
        
    });
})