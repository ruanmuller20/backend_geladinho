import express from 'express'
import { router } from './routes'
import cors from 'cors'

const app = express();
app.use(cors()); // Enable CORS for all routes




app.use(express.json());
app.use(router);


app.listen(3333, ()=> console.log('Server is running on http://localhost:3333'));

