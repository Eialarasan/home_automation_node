import { parse } from 'dotenv';
import Entity from '../Entity/index'

let scheduledJobs = []

function cancelExistingJobs() {
    scheduledJobs.forEach(job => job.cancel());
    scheduledJobs = [];
  }
export const scheduleEvent = async (schedule, io) => {
    cancelExistingJobs()
    const scheduleList = await Entity.Schedule.findAll()
    const convertedArray = scheduleList.map(item => {
        const startParts = item.startTime.split(':');
        const endParts = item.endTime.split(':');
      
        const startHour = parseInt(startParts[0]);
        const startMin = parseInt(startParts[1]);
      
        const endHour = parseInt(endParts[0]);
        const endMin = parseInt(endParts[1]);
      
        return { start: { hour: startHour, min: startMin, }, end: { hour: endHour, min: endMin },deviceId:item.deviceId };
      });
      const currentTime = new Date();
    const currentDate = new Date();


    convertedArray.forEach(({ start, end, deviceId }) => {
      const jobStartDate = new Date(currentDate);
      const jobEndDate = new Date(currentDate);
  
      jobStartDate.setHours(start.hour, start.min, 0, 0);
      jobEndDate.setHours(end.hour, end.min, 0, 0);
  
      // Check if the scheduled time is in the future
      if (jobStartDate > currentDate) {
        const startJob = schedule.scheduleJob(jobStartDate, async() => {
          const findDevice=await Entity.Device.findOne({
            where:{
                 id:deviceId
            },include:[{
               model:Entity.Home
            },{
              model:Entity.Room,
           },]
          })
          await findDevice.update(Object.assign({}, {deviceStatus:1}))
          const data={
            data:findDevice,
            message:"ON"
          }
          console.log(`Scheduled start job at ${jobStartDate}: Device ${deviceId} ONNNNNNNNNNNNNNNNNNNNNNNN`);
          io.emit("message",JSON.stringify(data))
        });
        scheduledJobs.push(startJob);
      } 
  
      if (jobEndDate > currentDate) {
        const endJob = schedule.scheduleJob(jobEndDate,async () => {
          const findDevice=await Entity.Device.findOne({
            where:{
                 id:deviceId
            },include:[{
              model:Entity.Home
           },{
             model:Entity.Room,
          },]
          })
          await findDevice.update(Object.assign({}, {deviceStatus:0}))
          const data={
            data:findDevice,
            message:"OFF"
          }
          console.log(`Scheduled end job at ${jobEndDate}: Device ${deviceId} OFFFFFFFFFFFFFFFFFFFFFFFF`);
          io.emit("message",JSON.stringify(data))
        });
        scheduledJobs.push(endJob);
      }
    });
  }
    
    




