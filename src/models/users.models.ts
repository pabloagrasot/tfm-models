import {Schema, Document, model} from 'mongoose';
import bcrypt from 'bcrypt';

export interface IUser extends Document{
    name:string,
    lastName:string,
    email:string,
    userName:string,
    password:string,
    alumnos:string,
    comparePasswords: (reqPassword:string) => Promise<boolean>
}

const userSchema = new Schema<IUser>({
    name:{
        type:String,
        require:true
    },
    lastName:{
        type:String,
        require:true
    },
    
    email:{
        type:String,
        require:true,
        unique:true
    },

    userName:{
        type:String,
        require:true,
        unique:true
    },
    
    password:{
        type:String,
        require:true
    },

    students:{
        ref:'Students',
        type:Schema.Types.ObjectId,
    },

}, {

    timestamps:true,
    versionKey:false
})

userSchema.pre<IUser>('save', async function (next) {   
    if (!this.isModified('password')) return next()
    const salt = await bcrypt.genSalt(10)
    const encrypt = await bcrypt.hash(this.password, salt)
    this.password = encrypt
})

userSchema.methods.comparePasswords = function(reqPassword:string): Promise<boolean>{
    return bcrypt.compare(reqPassword, this.password)
}

export default model ('Users', userSchema)