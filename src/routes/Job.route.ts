import { Router } from "express";
import * as jobsContoller from '../controllers/Job.Controller'
const router = Router()

router.get('/', jobsContoller.Jobs )

export default router