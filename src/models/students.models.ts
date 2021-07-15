import {Schema, Document, model} from 'mongoose';

export interface IStudents extends Document{
    alumnoName:string,
    imagePath:string,
    filename:string,
    originalname:string,
    exercises:string,
    user:String
}

const studentSchema = new Schema<IStudents>({
    alumnoName:{
        type:String,
        require:true,
    },

    imagePath:{
        type:String,
        require:true
    },

    filename:{
        type:String,
        require:true
    },

    originalname:{
        type:String,
        require:true
    },
    user:{
        ref:'Users',
        type:Schema.Types.ObjectId,
        require:true
    },
}, {

    timestamps:true,
    versionKey:false
}
)


export default model ('Students', studentSchema)