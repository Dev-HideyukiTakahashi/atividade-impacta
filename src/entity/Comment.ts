import { Column, Entity, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm"
import { User } from "./User"
import { Post } from "./Post"

@Entity()
export class Comment {

  @PrimaryGeneratedColumn()
  id: number

  @Column()
  text: string

  @ManyToOne(() => Post, (post) => post.comments, { onDelete: 'CASCADE' })
  post: Post

  @ManyToMany(() => User, { onDelete: 'CASCADE', cascade: true })
  users: User
}