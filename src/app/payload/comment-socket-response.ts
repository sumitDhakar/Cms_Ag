import { Users } from "../entites/users"

export class CommentSocketResponse {
    public firstName!: string
    public lastName!: string
    public createdAt!: string
    public file: string[] = []
    public profilePic!: string
    public userId!: string
    public projectId!: number
    public description!:string
    public user=new Users()
}
