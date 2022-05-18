import '../models/db.model'
import { jobEntry, jobModel, NewJobEntry, NotSensistiveInfoJobs } from '../models/Job.model'

export const getJobs = (Jobs: jobEntry[]): jobEntry[] => {
    return Jobs
}
export const getJobsWithoutSensitiveInfo = (jobs: NotSensistiveInfoJobs[]): NotSensistiveInfoJobs[] => {
    return jobs.map(({ Jobs_ID, work_Title, Job_URL, workType, Position, apply_Method, description }) => {
        return {
            Jobs_ID, work_Title, Job_URL, workType, Position, apply_Method, description
        }
    })
}
export const addJobs = (newJobsEntry: NewJobEntry): NewJobEntry => {
    const newJobs = {
        ...newJobsEntry
    }
    jobModel.create(newJobs)
    return newJobs
}

export const editJobs = async (id: number, newJobsEntry: NewJobEntry): Promise<number> => {
    const result = await jobModel.update(newJobsEntry, { where: { 'Jobs_ID': id } }).then(result => {
        return result
    })
    return +result
}

export const findJob = (id: number): Promise<jobEntry[]> | undefined => {
    return jobModel.findOne({ where: { 'Jobs_ID': id } }) as any
}

export const deleteJob = (id: number): Promise<number> | undefined => {
    return jobModel.destroy({ where: { 'Jobs_ID': id } }) as any
}


