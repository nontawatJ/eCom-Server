import express from 'express';
import bodyParser from 'body-parser';
import fileUpload from 'express-fileupload';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import routesUrls from './routes/routes.js';
import privateUrls from './routes/private.js';
import errorHandler from './middleware/errorHandler.js';

const app = express();

app.use(bodyParser.json({ limit: '30mb', extended: true }))
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }))

dotenv.config();

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.DATABASE_ACCESS, { useNewUrlParser: true,useCreateIndex: true, useUnifiedTopology: true, useFindAndModify: false })
    .then(console.log('database connected'))
    .catch((error) => console.log(error.message));
;

app.use(express.json());
app.use(cors());
app.use(fileUpload());
app.use('/home/auth', routesUrls);
app.use('/home/private', privateUrls);
app.get('/', (req,res) => {
    res.send('hello to server API');
})

//error should be the last 
app.use(errorHandler);

app.listen(PORT, () => console.log('server is running on port %d', PORT));

