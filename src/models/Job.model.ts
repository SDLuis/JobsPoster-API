import {
  Column,
  Model,
  Table,
  DataType,
  NotEmpty,
  AllowNull,
} from "sequelize-typescript";

export enum workType {
  Full_Time = "Full Time",
  Part_Time = "Part Time",
  Remote = "Remote",
}
export interface IJobs {
  Job_ID?: number;
  work_Title: string;
  User_ID?: number;
  owner_Email: string;
  workType: workType;
  Position: string;
  apply_Method: string;
  description: string;
}

export type jobEntry = IJobs;
export type NotSensistiveInfoJobs = Omit<IJobs, "User_ID" | "owner_Email">;
export type NewJobEntry = Omit<IJobs, "Job_ID">;
@Table({
  tableName: "jobs",
  timestamps: false,
})
export class jobModel extends Model implements IJobs {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  Job_ID: number | undefined;

  @NotEmpty
  @AllowNull(false)
  @Column({
    type: DataType.STRING(100),
  })
  work_Title!: string;

  @NotEmpty
  @AllowNull(false)
  @Column({
    type: DataType.INTEGER,
  })
  User_ID: number | undefined;

  @NotEmpty
  @AllowNull(false)
  @Column({
    type: DataType.STRING(100),
  })
  owner_Email!: string;

  @NotEmpty
  @AllowNull(false)
  @Column({
    type: DataType.STRING(100),
  })
  workType!: workType;

  @NotEmpty
  @AllowNull(false)
  @Column({
    type: DataType.STRING(100),
  })
  Position!: string;

  @NotEmpty
  @AllowNull(false)
  @Column({
    type: DataType.STRING(100),
  })
  apply_Method!: string;

  @NotEmpty
  @AllowNull(false)
  @Column({
    type: DataType.STRING(1000),
  })
  description!: string;
}
