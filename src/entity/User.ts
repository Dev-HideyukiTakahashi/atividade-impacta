import { Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm"
import { Comment } from "./Comment"

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @Column()
    email: string

    @ManyToMany(() => Comment, { onDelete: 'CASCADE', cascade: true })
    @JoinTable()
    comments: Comment[]
}
