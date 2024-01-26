'use strict';

import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { homeRouter, userRouter,roomRouter,deviceRouter,scheduleRouter } from './app';


const app = express();
// 


app.use(bodyParser.json())
app.use(cors());
app.use('/api/user', userRouter);
app.use('/api/home', homeRouter);
app.use('/api/room', roomRouter);
app.use('/api/device', deviceRouter);
app.use('/api/schedule', scheduleRouter);


export default app