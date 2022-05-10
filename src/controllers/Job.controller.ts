import { Request, Response  } from "express";

export const Jobs = (_req: Request, res: Response) => {
res.status(200).send('All jobs')
}