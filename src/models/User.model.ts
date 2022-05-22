import { Column, DataType, Model, NotEmpty, Table, AllowNull, Unique } from "sequelize-typescript"

export enum role {
    Admin = 'admin',
    Poster = 'poster',
    Visitor = 'visitor'
}
export interface IUser {
    User_ID?: number | null
    First_Name: string
    Last_Name: string
    role: role,
    email: string
    password: any
}

export type login = {
    email: string
    password: string
}

export type userEntry = IUser
export type NotSensistiveInfoUser = Omit<IUser, 'User_ID' | 'password'>
export type NewUserEntry = Omit<IUser, 'User_ID'>
@Table(
    {
        tableName: 'user',
        timestamps: false
    }
)

export class userModel extends Model implements IUser {

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
    First_Name!: string

    @NotEmpty
    @AllowNull(false)
    @Column({
        type: DataType.STRING(100)
    })
    Last_Name!: string

    @NotEmpty
    @AllowNull(false)
    @Column({
        type: DataType.STRING(100)
    })
    role!: role

    @Unique
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
