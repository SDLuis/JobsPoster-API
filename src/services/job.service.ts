import { Op } from "sequelize";
import { userModel } from "../models/User.model";
import "../models/db.model";
import {
  workType,
  jobEntry,
  jobModel,
  NewJobEntry,
  NotSensistiveInfoJobs,
} from "../models/Job.model";

export const getJobs = async (): Promise<jobEntry[]> => {
  return await jobModel
    .findAll({
      include: { model: userModel, attributes: { exclude: ["password"] } },
      order: [
        ['Job_ID', 'DESC'],
    ],
    })
    .then((result) => {
      return result;
    });
};
export const getJobsWithoutSensitiveInfo = (
  jobs: NotSensistiveInfoJobs[]
): NotSensistiveInfoJobs[] => {
  return jobs.map(
    ({ Job_ID, work_Title, workType, Position, apply_Method, description }) => {
      return {
        Job_ID,
        work_Title,
        workType,
        Position,
        apply_Method,
        description,
      };
    }
  );
};
export const addJobs = (newJobsEntry: NewJobEntry): NewJobEntry => {
  const newJobs = {
    ...newJobsEntry,
  };
  jobModel.create(newJobs);
  return newJobs;
};

export const editJobs = async (
  id: number,
  newJobEntry: NewJobEntry
): Promise<number> => {
  const result = await jobModel
    .update(newJobEntry, { where: { Job_ID: id } })
    .then((result) => {
      return result;
    });
  return +result;
};

export const findJob = (id: number): Promise<jobEntry[]> | undefined => {
  return jobModel.findOne({ where: { Job_ID: id } }) as any;
};

export const findJobByCategory = (
  workType: workType
): Promise<jobEntry[]> | undefined => {
  return jobModel.findAll({ where: { workType: workType }, order: [['Job_ID', 'DESC']],})as any;
};

export const deleteJob = (id: number): Promise<number> | undefined => {
  return jobModel.destroy({ where: { Job_ID: id }}) as any;
};

export const ownJob = (id: number): Promise<jobEntry[]> | undefined => {
  return jobModel.findAll({ where: { User_ID: id }, order: [['Job_ID', 'DESC']]}) as any;
};

export const searchJobs = (
  work_Title: string
): Promise<jobEntry[]> | undefined => {
  return jobModel.findAll({
    where: { work_Title: { [Op.like]: "%" + work_Title + "%" } }, order: [['Job_ID', 'DESC']]
  });
};
