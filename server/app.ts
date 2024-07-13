import  express from 'express';
import bodyParser from 'body-parser'
import cors from 'cors'
import helmet from 'helmet'
import dotenv from 'dotenv'
import router from './routes/index'

const app = express()
dotenv.config()

// View template
app.set('view engine', 'ejs')

// CORS
app.use(cors());

// Security
app.use(helmet());

app.get('/', (req, res) => {
  res.status(200);
})
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use('/api', router)

app.listen(process.env.PORT, ()=>{
  console.log('Server is listening on port ' + process.env.PORT)
})
