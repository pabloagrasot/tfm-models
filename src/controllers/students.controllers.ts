import Students, {IStudents} from '../models/students.models'
import Users, {IUser} from '../models/users.models'
import {Request, Response} from 'express';
import jwt from 'jsonwebtoken';
import config from '../config';

const createStudent:(req:Request, res:Response) => Promise<any> = async (req:Request, res:Response) => {
    try{ 
    const params = req.params.userName    
    const token = req.headers.authorization

    if(!token){
        return res.status(400).json({message:'Token no definido'})
    }

    const obj:any = jwt.verify(token, config.jwt.secret)
        
    const user:IUser = await Users.findOne({userName: obj.userName})


    if (!user){
        return res.status(400).json({message:'La cuenta no existe'})
    }

    const userParam:IUser = await Users.findOne({params})
    const {
        alumnoName,
        } = req.body

    if (!alumnoName){
        return res.status(400).json({message:'Datos incompletos'})
    }

    const originalname = `monster${Math.floor((Math.random()*6 + 1))}.svg`
    const filename:string = `${originalname}`
    const imagePath = `img/monsters/${filename}`

    const newStudents = {
        alumnoName: alumnoName,
        originalname,
        filename,
        imagePath,
        user:user._id
    }


    const students:IStudents = await Students.findOne({alumnoName})
    if(students){
        return res.status(400).json({message:'El nombre del alumno ya existe'})
    }

    

    const student = new Students(newStudents)
    await student.save()

    res.status(200).json({message: 'Alumno guardado'})
    
    }catch(error){
    return res.status(400).json({message:error.message})
    }
}


const allStudents:(req:Request, res:Response) => Promise<any> = async (req:Request, res:Response) => {
    const params = req.params.userName
    const token = req.headers.authorization
    
    if(!token){
        return res.status(400).json({msg:'Token no definido'})
    }

    const obj:any = jwt.verify(token, config.jwt.secret)

    const user:IUser = await Users.findOne({userName: obj.userName})
   
    if(!user){
        return res.status(400).json({message:'La cuenta no existe'})
    }
    
    const userParam:IUser = await Users.findOne({params})

    const students:IStudents = await Students.find({user: user._id})
    //.populate('student', {userName:1})
    // .populate({
    //     path: 'user',
    //     select: 'userName', // separados por un espacio
    //     match: { userName: user.userName },
    // })

    res.status(200).json({data: students})
}


const student:(req:Request, res:Response) => Promise<any> = async (req:Request, res:Response) => {
    const token = req.headers.authorization
    const params = req.params.userName
    const alumnoName = req.params.alumnoName
    
    if(!token){
        return res.status(400).json({message:'Token no definido'})
    }

    const obj:any = jwt.verify(token, config.jwt.secret)

    const user:IUser = await Users.findOne({userName: obj.userName})

    if(!user){
        return res.status(400).json({message:'La cuenta no existe'})
    }

    const userParam:IUser = await Users.findOne({params})

    const students:IStudents = await Students.findOne({alumnoName: alumnoName, user: user._id})

    if(!students){
        return res.status(400).json({message:'El alumno no existe'})
    }

    res.status(200).json({data: students})
}

const deleteStudent:(req:Request, res:Response) => Promise<any> = async (req:Request, res:Response) => {
    const token = req.headers.authorization
    const params = req.params.userName
    const alumnoName = req.params.alumnoName
    
    if(!token){
        return res.status(400).json({message:'Token no definido'})
    }

    const obj:any = jwt.verify(token, config.jwt.secret)

    const user:IUser = await Users.findOne({userName: obj.userName})

    if(!user){
        return res.status(400).json({message:'La cuenta no existe'})
    }

    const userParam:IUser = await Users.findOne({params})
 
    const students:IStudents = await Students.findOneAndDelete({alumnoName: alumnoName, user: user._id})

    if(!students){
        return res.status(400).json({message:'El alumno no existe'})
    }

    res.status(200).json({message: 'Alumno Borrado'})
}


export default {
    createStudent,
    allStudents,
    student,
    deleteStudent
}