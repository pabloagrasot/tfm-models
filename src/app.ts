import express, {Request, Response, } from 'express';
import routes from './routes'
import passport from 'passport'
import path from 'path'
import cors from 'cors'
import passportMiddelware from './middlewares/passport';


const app = express()


// Settings
app.set('port', process.env.PORT || 3500)

// Middelwares
app.use(passport.initialize())
app.use(cors())
passport.use(passportMiddelware)
app.use(express.urlencoded({extended:false}))
app.use(express.json())




    

//Routes
app.get('/', (req: Request,res:Response)=>{
    res.send('Hello world')
})

app.use(routes.user)
app.use(routes.students)
app.use(routes.exercises)
app.use(routes.mailContact)


//Static files

app.use(express.static(path.resolve(__dirname, 'public')))


export default app