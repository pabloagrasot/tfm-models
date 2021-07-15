import {Router} from 'express'
import controllers from '../controllers'

const {exercises} = controllers
const router = Router()

router.post('/:userName/students/:alumnoName', exercises.createExercise)
router.get('/:userName/students/:alumnoName/exercises', exercises.allExercises)
router.get('/:userName/students/:alumnoName/exercises/:id', exercises.exercise)
router.delete('/:userName/students/:alumnoName/exercises/:id', exercises.deleteExercise)

export default router 