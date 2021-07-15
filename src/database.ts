import moongose, {ConnectOptions} from 'mongoose'
import config from './config';


const options:ConnectOptions = {
    useNewUrlParser:true,
    useUnifiedTopology:true,
    useCreateIndex:true
}

moongose.connect(config.db.uri, options)

const connection = moongose.connection


connection.once("open", () => {
    console.log("Connected");
  });
  
  connection.once("error", (error) => {
    console.log(error);
    process.exit(1);
  });
  