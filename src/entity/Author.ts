import { Column, Entity, JoinColumn, OneToMany } from "typeorm";
import { User } from "./User";
import { Post } from "./Post";


@Entity()
export class Author extends User {

  @Column()
  tags: string
  @Column()
  surname: string
  @Column()
  completeName: string

  @OneToMany(() => Post, (post) => post.author)
  posts: Post[]
}