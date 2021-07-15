import Exercises, {IExercises} from '../models/exercises.models';
import Students, {IStudents} from '../models/students.models'
import Users, {IUser} from '../models/users.models'
import {Request, Response} from 'express';
import config from '../config';
import jwt from 'jsonwebtoken'


const createExercise = async (req:Request, res:Response) => {

       const {
        exName,
        dificulty,
        time,
        observations,
    } = req.body

    const token = req.headers.authorization
    const userName = req.params.userName
    const alumnoName = req.params.alumnoName
    
    if(!token){
        return res.status(400).json({msg:'Token no definido'})
    }

    const obj:any = jwt.verify(token, config.jwt.secret)

    const user:IUser = await Users.findOne({userName: obj.userName})

    if(!user){
        return res.status(400).json({message:'La cuenta no existe'})
    }

    const students:IStudents = await Students.findOne({alumnoName: alumnoName, user: user._id})

    if(!students){
        return res.status(400).json({message:'El alumno no existe'})
    }
    
    const newExercises = {
        exName: exName,
        dificulty: dificulty,
        time: time,
        observations: observations,
        student:students._id
    }

    if(!exName || !dificulty || !time || !observations){
        return res.status(400).json({message:'Faltan datos'})
    }

    const exercises = new Exercises(newExercises)
    await exercises.save()
    res.status(200).json({data: 'Ejercicio guardado'})
}


const allExercises:(req:Request, res:Response) => Promise<any> = async (req:Request, res:Response) => {
    const token = req.headers.authorization
    const userName = req.params.userName
    const alumnoName = req.params.alumnoName
    
    if(!token){
        return res.status(400).json({message:'Token no definido'})
    }

    const obj:any = jwt.verify(token, config.jwt.secret)

    const user:IUser = await Users.findOne({userName: obj.userName})
   
    if(!user){
        return res.status(400).json({message:'La cuenta no existe'})
    }

    const students:IStudents = await Students.findOne({alumnoName: alumnoName, user: user._id})
    if(!students){
        return res.status(400).json({message:'El alumno no existe'})
    }

    const exercises:IExercises= await Exercises.find({student: students._id}).populate('student', {alumnoName:1})
    res.status(200).json({data: exercises})
}

const exercise = async (req:Request, res:Response) =>{
    const token = req.headers.authorization
    const userName = req.params.userName
    const alumnoName = req.params.alumnoName
    const _id = req.params.id

    
    if(!token){
        return res.status(400).json({msg:'Token no definido'})
    }

    const obj:any = jwt.verify(token, config.jwt.secret)

    const user:IUser = await Users.findOne({userName: obj.userName})
   
    if(!user){
        return res.status(400).json({msg:'La cuenta no existe'})
    }

    const userParam:IUser = await Users.findOne({userName})

    const students:IStudents = await Students.findOne({alumnoName: alumnoName, user: user._id})
    if(!students){
        return res.status(400).json({msg:'El alumno no existe'})
    }

    const exercises:IExercises= await Exercises.findOne({_id, student:students._id})
   
    res.status(200).json({data: exercises})
}


const deleteExercise = async (req:Request, res:Response) =>{
    const token = req.headers.authorization
    const userName = req.params.userName
    const alumnoName = req.params.alumnoName
    const _id = req.params.id

    
    if(!token){
        return res.status(400).json({msg:'Token no definido'})
    }

    const obj:any = jwt.verify(token, config.jwt.secret)

    const user:IUser = await Users.findOne({userName: obj.userName})
   
    if(!user){
        return res.status(400).json({message:'La cuenta no existe'})
    }

    const userParam:IUser = await Users.findOne({userName})

    const students:IStudents = await Students.findOne({alumnoName: alumnoName, user: user._id})
    if(!students){
        return res.status(400).json({message:'El alumno no existe'})
    }

    const exercises:IExercises= await Exercises.findOneAndDelete({_id, student:students._id})
    
    res.status(200).json({message: 'Ejercicio borrado'})
}

export default {
    createExercise,
    allExercises,
    deleteExercise,
    exercise
}