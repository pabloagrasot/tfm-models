import {Router} from 'express'
import controllers from '../controllers'

const {user} = controllers
const router = Router()

router.post('/signin', user.signin)
router.post('/signup', user.signup)
router.get('/user', user.userName)

export default router   