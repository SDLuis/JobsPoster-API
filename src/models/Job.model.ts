import { Column, Model, Table, DataType, NotEmpty, AllowNull } from 'sequelize-typescript'

export enum category {
    Full_Time = 'Full Time',
    Part_Time = 'Part Time',
    Remote = 'Remote'
}

export interface IJobs {
    Jobs_ID?: number
    work_Title: string
    User_ID?: number
    owner_Email: string
    Job_URL: string
    workType: string
    Position: string
    apply_Method: string
    description: string
}
@Table(
    {
        tableName: 'jobs',
        timestamps: true
    }
)
export default class Jobs extends Model implements IJobs {

    @Column({
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true
    })
    Jobs_ID: number | undefined

    @NotEmpty
    @AllowNull(false)
    @Column({
        type: DataType.STRING(100)
    })
    work_Title!: string
    
    @NotEmpty
    @AllowNull(false)
    @Column({
        type: DataType.INTEGER
    })
    User_ID: number | undefined

    @NotEmpty
    @AllowNull(false)
    @Column({
        type: DataType.STRING(100)
    })
    owner_Email!: string

    @NotEmpty
    @AllowNull(false)
    @Column({
        type: DataType.STRING(100)
    })
    Job_URL!: string

    @NotEmpty
    @AllowNull(false)
    @Column({
        type: DataType.STRING(100)
    })
    workType!: string

    @NotEmpty
    @AllowNull(false)
    @Column({
        type: DataType.STRING(100)
    })
    Position!: string

    @NotEmpty
    @AllowNull(false)
    @Column({
        type: DataType.STRING(100)
    })
    apply_Method!: string

    @NotEmpty
    @AllowNull(false)
    @Column({
        type: DataType.STRING(100)
    })
    description!: string
}