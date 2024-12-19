import "reflect-metadata"
import { DataSource } from "typeorm"
import { Author } from "./entity/Author"
import { Comment } from "./entity/Comment"
import { Post } from "./entity/Post"
import { User } from "./entity/User"

export const AppDataSource = new DataSource({
    type: "sqlite",
    database: "database.sqlite",
    synchronize: true,
    logging: false,
    entities: [User, Author, Post, Comment],
    migrations: [],
    subscribers: [],
})
