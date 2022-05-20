import { Router } from 'express'
import * as jobController from '../controllers/User.controller'
const router = Router()

router.get('/', jobController.getUser)
router.post('/add', jobController.newUser)
router.put('/edit/:id', jobController.editUser)
router.get('/:id', jobController.findUser)
router.delete('/delete/:id', jobController.deleteUser)

export default router