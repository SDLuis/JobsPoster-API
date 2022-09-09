import { NextFunction, Request, Response } from "express";
import * as jobService from "../services/job.service";
import { workType } from "../models/Job.model";
import * as jobValidation from "../validations/job.validation";
import { CustomRequest } from "../models/User.model";
import { findUser } from "../services/user.service"

export const getJobs = async (_req: Request, res: Response) => {
  try {
    jobService.getJobs().then((response) => {
      res.status(200).send(jobService.getJobsWithoutSensitiveInfo(response))
    })
  } catch (e: any) {
    res.status(400).send(e.message);
  }
};

export const newJob = async (req: Request, res: Response) => {
  try {
    const NewJobEntry = jobValidation.toNewWork(
      req.body,
      (req as any).token.User_ID,
      (req as any).token.email
    );
    const addedJob = await jobService.addJobs(NewJobEntry);
    res.status(200).send(addedJob);
  } catch (e: any) {
    res.status(400).send(e.message);
  }
};

export const editJob = async (req: Request, res: Response) => {
  try {
    const id = +req.params.id;
    const job = await jobService.editJobs(id, req.body);
    if (+job == 1) {
      res.status(200).send({message: "Job Edit", status: 200});
    } else {
      res.status(200).send({message: "Error, job was not edited", status: 400});
    }
  } catch (e: any) {
    res.status(400).send(e.message);
  }
};

export const findJob = async (req: Request, res: Response) => {
  try {
    const id = +req.params.id;
    const job = await jobService.findJob(id);
    res.status(200).send(job);
  } catch (e: any) {
    res.status(400).send(e.message);
  }
};

export const findJobByCategory = async (req: Request, res: Response) => {
  try {
    const category = req.params.category;
    const job = await jobService.findJobByCategory(category as workType);
    res.status(200).send(job);
  } catch (e: any) {
    res.status(400).send(e.message);
  }
};

export const deleteJob = async (req: Request, res: Response) => {
  try {
    const id = +req.params.id;
    await jobService.deleteJob(id)?.then((result) => {
      if (result == 1) {
        res.status(200).send("Job deleted");
      } else {
        res.status(400).send("Error");
      }
    });
  } catch (e: any) {
    res.status(400).send(e.message);
  }
};

export const reqJob = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = +req.params.id;
    const job = (await jobService.findJob(id)) as any;
    (req as any as CustomRequest).json = job;
    next();
  } catch (e: any) {
    res.status(400).send(e.message);
  }
};

export const ownJob = async (req: Request, res: Response) => {
  try {
    let job
    const id = (req as any).token.User_ID;
    const role = await findUser(id) as any 
    console.log(role.role);
    role.role == 'admin' ? job = (await jobService.getJobs()) as any : job = (await jobService.ownJob(id)) as any
    res.status(200).send(job);
  } catch (e: any) {
    res.status(400).send(e.message);
  }
};

export const searchJobs = async (req: Request, res: Response) => {
  try {
    const param = req.params.param
    const job = (await jobService.searchJobs(param)) as any;
    res.status(200).send(job);
  } catch (e: any) {
    res.status(400).send(e.message);
  }
};
