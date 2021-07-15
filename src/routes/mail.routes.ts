import {Router} from 'express'
import controllers from '../controllers'

const {mailContact} = controllers
const router = Router()

router.post('/send-mail', mailContact)

export default router 