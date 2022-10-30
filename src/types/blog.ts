import { ObjectId } from "mongodb"

export interface BlogMetaData {
    authorId?: ObjectId,
    author?: string,
    blogUrl: string,
    articleHTMLElement: string,
    previousMostRecentArticle: string,
    linkHTML: string
}