import {Schema, Document, model} from 'mongoose';

export interface IExercises extends Document{
    exName:string,
    dificulty:string,
    time:number,
    observations:string,
    name:string
}

const exercisesSchema = new Schema<IExercises>({
    exName:{
        type:String,
        require:true,
    },
    dificulty:{
        type:String,
        require:true,
    },
    time:{
        type:String,
        require:true,
    },
    observations:{
        type:String,
        require:true,
    },
    student:{
        ref:'Students',
        type:Schema.Types.ObjectId,
        require:true
    },
}, {

    timestamps:true,
    versionKey:false
}
)


export default model ('Exercises', exercisesSchema)