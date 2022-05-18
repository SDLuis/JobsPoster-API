import { Request, Response } from "express";
//import { jobModel } from "../models/Job.model";
import * as Job from '../services/job.service'
import { jobModel } from '../models/Job.model'

export const getJobs = async (_req: Request, res: Response) => {
    try {
        await jobModel.findAll().then(result => {
            res.send(Job.getJobs(result))
        })
        res.send()
    } catch (e: any) {
        res.status(400).send(e.message)
    }
}

export const newJobs = async (req: Request, res: Response) => {
    try {
        const L = await Job.addJobs(req.body)
        res.status(200).send(L)
    } catch (e: any) {
        res.status(400).send(e.message)
    }
}

export const editJob = async (req: Request, res: Response) => {
    try {
        const id = +req.params.id
        const job = await Job.editJobs(id, req.body)
        if(+job == 1){
            res.status(200).send('Job Edit')
        }else{
            res.status(400).send('Error')
        }
        
    } catch (e: any) {
        res.status(400).send(e.message)
    }

}

export const findJob = async (req: Request, res: Response) => {
    try {
        const id = +req.params.id
        const job = await Job.findJob(id)
        res.status(200).send(job)
    } catch (e: any) {
        res.status(400).send(e.message)
    }

}

export const deleteJob = async (req: Request, res: Response) => {
    try {
        const id = +req.params.id
        await Job.deleteJob(id)?.then(result => {
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