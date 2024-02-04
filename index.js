import { Puplisher } from './Scheduler/publisher';
import { Subscriber } from './Scheduler/Subscriber';

import app from './main'
import http from 'http'

const HttpServer = http.createServer(app);
const socketIO = require('socket.io')
const mqtt = require('mqtt');
require('dotenv').config()
const port=process.env.PORT
app.set('port', port)

HttpServer.listen(port);
HttpServer.on('listening', onListening);

const mqttBrokerUrl = 'mqtt://broker.hivemq.com';
const mqttClient = mqtt.connect(mqttBrokerUrl);

const cors=require('cors')
export const schedule = require('node-schedule');

app.use(cors())
// Schedule a task to run every day at 3:30 PM
export const io = socketIO(HttpServer, {
  cors: {
    origin: `http://localhost:3000`,  // Replace with the actual origin of your React app
    methods: ['GET', 'POST','PUT','DELETE'],
  },
});


Puplisher(mqttClient,io)
Subscriber(mqttClient,io,schedule.scheduleJob)



function onListening() {
    var addr = HttpServer.address();
    var bind =  addr.port;
    console.info('Listening on ' + bind);
}