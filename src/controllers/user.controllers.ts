import {Request, Response} from 'express';
import Users, {IUser} from '../models/users.models';
import jwt from 'jsonwebtoken';
import config from '../config';


const createToken = (user: IUser) => {
    return jwt.sign(
        {
            userName: user.userName
        },
        config.jwt.secret
        ,{
            expiresIn: 1_000*60*60
        }
    )
}

const signin:(req:Request, res:Response) => Promise<any> = async (req:Request, res:Response) =>{
    
    const {
        userName,
        password
    } = req.body

    if(!password || !userName){
        return res.status(400).json({msg:'Datos incompletos'})
    }

    const user:IUser = await Users.findOne({userName})

    if(!user){
        return res.status(400).json({message:'La cuenta no existe'})
    }

    const match = await user.comparePasswords(password)
    if(!match){
        return res.status(400).json({message:'La constraseña es incorrecta'})
    }

    res.status(200).json({token: createToken(user)})
}


const signup:(req:Request, res:Response) => Promise<any> = async (req:Request, res:Response) =>{
  try{   
    const {
        name,
        lastName,
        email,
        userName,
        password
    } = req.body

    if(!name || !lastName || !email || !userName || !password){
        return res.status(400).json({message:'Datos incompletos'})
    }

    const userEmail:IUser = await Users.findOne({email})
    if(userEmail){
        return res.status(400).json({message:'El email ya está registrado'})
    }

    const user:IUser = await Users.findOne({userName})
    if(user){
        return res.status(400).json({message:'El nombre de usuario ya existe'})
    }

    const newUser = new Users(req.body)
    await newUser.save()
    
   
    res.status(200).json({message:'Gracias por registrarte'})

  }catch(error){
        return res.status(400).json({message:error.message})
    }
}


const userName:(req:Request, res:Response) => Promise<any> = async (req:Request, res:Response) =>{
    const token = req.headers.authorization
    
    if(!token){
        return res.status(400).json({msg:'Token no definido'})
    }

    const obj:any = jwt.verify(token, config.jwt.secret)

    const user:IUser = await Users.findOne({userName: obj.userName})
   
    if(!user){
        return res.status(400).json({message:'La cuenta no existe'})
    }
    res.status(200).json({user})
  }

export default {
    signin,
    signup,
    userName
}

