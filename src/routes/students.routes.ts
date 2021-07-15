import {Router} from 'express'
import controllers from '../controllers'

const {students} = controllers
const router = Router()

router.post('/:userName/students/new', students.createStudent)
router.get('/:userName/students', students.allStudents)
router.get('/:userName/students/:alumnoName', students.student)
router.delete('/:userName/students/:alumnoName', students.deleteStudent)

export default router   