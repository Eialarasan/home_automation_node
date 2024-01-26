import express from 'express';
import ProcessRoutes from './ProcessRoutes';
import userRouters from './User/index'
import homeRouters from './Home/index'
import roomRouters from './Room/index'
import deviceRouters  from './Device/index'
import scheduleRouters  from './Schedule/index'


let userRouter = express.Router(ProcessRoutes);
if (userRouters && userRouters.length > 0) {
    userRouter = ProcessRoutes(userRouter, userRouters);
} else {
    console.error('There is no user route configured')
}

//Home
let homeRouter = express.Router(ProcessRoutes);
if (homeRouters && homeRouters.length > 0) {
    homeRouter = ProcessRoutes(homeRouter, homeRouters);
} else {
    console.error('There is no home route configured')
}

//Room
let roomRouter = express.Router(ProcessRoutes);
if (roomRouters && roomRouters.length > 0) {
    roomRouter = ProcessRoutes(roomRouter, roomRouters);
} else {
    console.error('There is no room route configured')
}

//Device
let deviceRouter = express.Router(ProcessRoutes);
if (deviceRouters && deviceRouters.length > 0) {
    deviceRouter = ProcessRoutes(deviceRouter, deviceRouters);
} else {
    console.error('There is no device route configured')
}

//Schedule
let scheduleRouter = express.Router(ProcessRoutes);
if (scheduleRouters && scheduleRouters.length > 0) {
    scheduleRouter = ProcessRoutes(scheduleRouter, scheduleRouters);
} else {
    console.error('There is no schedule route configured')
}



export {
    userRouter,homeRouter,roomRouter,deviceRouter,scheduleRouter
}