import { Column, DataType, Model, NotEmpty, Table, AllowNull } from "sequelize-typescript"

export enum role {
    Admin = 'admin',
    Poster = 'poster',
    Visitor = 'visitor'
}
export interface IUser {
    User_ID?: number | null
    first_name: string
    last_name: string
    role: role,
    email: string
    password: string
}
@Table(
    {
        tableName: 'user',
        timestamps: false
    }
)

export default class User extends Model implements IUser {

    @Column({
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true
    })
    User_ID: number | null | undefined

    @NotEmpty
    @AllowNull(false)
    @Column({
        type: DataType.STRING(100)
    })
    first_name!: string

    @NotEmpty
    @AllowNull(false)
    @Column({
        type: DataType.STRING(100)
    })
    last_name!: string

    @NotEmpty
    @AllowNull(false)
    @Column({
        type: DataType.STRING(100)
    })
    role!: role

    @NotEmpty
    @AllowNull(false)
    @Column({
        type: DataType.STRING(100)
    })
    email!: string

    @NotEmpty
    @AllowNull(false)
    @Column({
        type: DataType.STRING(100)
    })
    password!: string

}
