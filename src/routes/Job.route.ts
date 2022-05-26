import { Router } from "express";
import * as jobsContoller from '../controllers/Job.controller'
import * as authController from '../controllers/Auth.controller'
import * as policies from '../libs/policies'
const router = Router()

router.get('/', jobsContoller.getJobs)
router.post('/add',authController.auth, policies.posterAccess, jobsContoller.newJob)
router.put('/edit/:id',authController.auth, jobsContoller.reqJob, policies.ownerAccess ,jobsContoller.editJob)
router.get('/:id', jobsContoller.findJob)
router.delete('/delete/:id',authController.auth, jobsContoller.reqJob, policies.ownerAccess, jobsContoller.deleteJob)

export default router