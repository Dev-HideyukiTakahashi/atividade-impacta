import { AppDataSource } from "./data-source"
import { Author } from "./entity/Author"
import { Comment } from "./entity/Comment"
import { Post } from "./entity/Post"
import { User } from "./entity/User"

AppDataSource.initialize().then(async () => {

    async function insert() {
        console.log("Creating new user . . .")

        const comment = new Comment();
        comment.text = "Adicionando comentário aleatório"
        await AppDataSource.manager.save(comment)

        const post = new Post()
        post.title = "Atividade ORM"
        post.text = "Foi utilizado type pela semelhança com Spring"
        post.comments = [comment]
        await AppDataSource.manager.save(post)

        const user = new Author()
        user.name = "Hideyuki"
        user.email = "dev.hideyukitakahashi@gmail.com"
        user.surname = "Takahashi"
        user.completeName = user.name + " " + user.surname
        user.tags = "#impacta #type"
        user.posts = [post]
        user.comments = [comment]
        await AppDataSource.manager.save(user)

        console.log("Saved a new user with id: " + user.id)
        return user.id
    }

    async function findById(id: number) {
        const authorRepository = AppDataSource.getRepository(Author)
        const author = await authorRepository.createQueryBuilder("author")
            .leftJoinAndSelect("author.posts", "post")
            .leftJoinAndSelect("author.comments", "comment")
            .where({ id })
            .getOne()
        console.log(author)
    }

    async function deleteById(id: number) {
        console.log("----------Deleting user with ID: " + id + "----------")
        const authorRepository = AppDataSource.getRepository(Author)
        const result = await authorRepository.createQueryBuilder()
            .delete()
            .from(Author)
            .where({ id })
            .execute();
        if (result.affected > 0) {
            console.log("User deleted")
        } else {
            console.log("User not found")
        }
    }

    async function update(id: number) {
        console.log("----------Updating user with ID: " + id + "----------")
        const authorRepository = AppDataSource.getRepository(Author)
        authorRepository.createQueryBuilder()
            .update(Author)
            .set({
                name: "Atualizando",
                email: "atualizado@gmail.com",
                surname: "Nome",
                completeName: "Atualizando Nome",
                tags: "#update #atualizado",
            })
            .where({ id })
            .execute();
    }

    // INSERT
    const id = insert()

    // FIND BY ID
    setTimeout(async () => {
        findById(await id)
    }, 2000);

    // DELETE BY ID
    setTimeout(async () => {
        deleteById(3)
    }, 4500);

    // UPDATE BY ID
    setTimeout(async () => {
        update(await id)
    }, 6500);

    // FIND BY ID
    setTimeout(async () => {
        findById(await id)
    }, 8500);



}).catch(error => console.log(error))
