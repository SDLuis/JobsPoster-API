import { Router } from "express";
import * as jobsContoller from '../controllers/Job.controller'
const router = Router()

router.get('/', jobsContoller.getJobs)
router.post('/add', jobsContoller.newJob)
router.put('/edit/:id', jobsContoller.editJob)
router.get('/:id', jobsContoller.findJob)
router.delete('/delete/:id', jobsContoller.deleteJob)

export default router