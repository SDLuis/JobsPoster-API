import { NextFunction, Request, Response } from 'express';
import * as jobService from '../services/job.service'
import { jobModel } from '../models/Job.model'
import * as jobValidation from '../validations/job.validation'
import { CustomRequest, userModel } from "../models/User.model";

export const getJobs = async (_req: Request, res: Response) => {
    try {
        await jobModel.findAll({ include: { model: userModel, attributes: { exclude: ['password'] } } }).then(result => {
            res.send(jobService.getJobs(result))
        })
    } catch (e: any) {
        res.status(400).send(e.message)
    }
}

export const newJob = async (req: Request, res: Response) => {
    try {
        const NewJobEntry = jobValidation.toNewWork(req.body, (req as any).token.User_ID)
        const addedJob = await jobService.addJobs(NewJobEntry)
        res.status(200).send(addedJob)
    } catch (e: any) {
        res.status(400).send(e.message)
    }
}

export const editJob = async (req: Request, res: Response) => {
    try {
        const id = +req.params.id
        const job = await jobService.editJobs(id, req.body)
        if (+job == 1) {
            res.status(200).send('Job Edit')
        } else {
            res.status(400).send('Error')
        }
    } catch (e: any) {
        res.status(400).send(e.message)
    }
}

export const findJob = async (req: Request, res: Response) => {
    try {
        const id = +req.params.id
        const job = await jobService.findJob(id)
        res.status(200).send(job)
    } catch (e: any) {
        res.status(400).send(e.message)
    }
}

export const deleteJob = async (req: Request, res: Response) => {
    try {
        const id = +req.params.id
        await jobService.deleteJob(id)?.then(result => {
            if (result == 1) {
                res.status(200).send('Job deleted')
            }
            else {
                res.status(400).send('Error')
            }
        })
    } catch (e: any) {
        res.status(400).send(e.message)
    }
}

export const reqJob = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = +req.params.id
        const job = await jobService.findJob(id) as any
        (req as any as CustomRequest).json = job
        next()
    } catch (e: any) {
        res.status(400).send(e.message)
    }
}
