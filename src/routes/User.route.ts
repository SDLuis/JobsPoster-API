import { Router } from 'express'
import * as jobController from '../controllers/User.controller'
import * as authController from '../controllers/Auth.controller'
import * as policies from '../libs/policies'
const router = Router()

router.get('/', authController.auth, policies.Admin, jobController.getUser)
router.put('/edit/:id', authController.auth, policies.Admin, jobController.editUser)
router.get('/:id', authController.auth, policies.Admin,jobController.findUser)
router.delete('/delete/:id',authController.auth, policies.Admin, jobController.deleteUser)

export default router