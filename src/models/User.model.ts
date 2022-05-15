import { Column, DataType, Model, NotEmpty, Table } from "sequelize-typescript"

export enum role {
    Admin = 'admin',
    Poster = 'poster',
    Visitor = 'visitor'
}

export interface IUser {
    id?: number | null
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
    id: number | null | undefined

    @NotEmpty
    @Column({
        type: DataType.STRING(100)
    })
    first_name!: string

    @NotEmpty
    @Column({
        type: DataType.STRING(100)
    })
    last_name!: string

    @NotEmpty
    @Column({
        type: DataType.STRING(100)
    })
    role!: role

    @NotEmpty
    @Column({
        type: DataType.STRING(100)
    })
    email!: string

    @NotEmpty
    @Column({
        type: DataType.STRING(100)
    })
    password!: string

}
