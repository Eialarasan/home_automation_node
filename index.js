import { scheduleEvent } from './Scheduler';
import app from './main'
import http from 'http'

const HttpServer = http.createServer(app);
const socketIO = require('socket.io')
require('dotenv').config()
const port=process.env.PORT
app.set('port', port)

HttpServer.listen(port);
HttpServer.on('listening', onListening);

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

setInterval(()=>{
  const job = scheduleEvent(schedule,io)
  io.on('connection', socket => {
    console.log('A user connected');
    
  });
},1000)






function onListening() {
    var addr = HttpServer.address();
    var bind =  addr.port;
    console.info('Listening on ' + bind);
}