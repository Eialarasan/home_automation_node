
import Entity from '../Entity/index'

export const Subscriber=(mqttClient,io,schedules)=>{
   const currentTime = new Date();
   const currentDate = new Date();


   
 
 mqttClient.on('connect',()=>{
   mqttClient.subscribe('home')
   console.log('Sub connected')
    
 })
 let scheduledJobs = []

 mqttClient.on('message',(topic,message)=>{
   
          console.log(message.toString(),"mesagee")
          let convertedArray=JSON.parse(message.toString())
          convertedArray.forEach(({ start, end, deviceId }) => {
            const jobStartDate = new Date(currentDate);
            const jobEndDate = new Date(currentDate);
        
            jobStartDate.setHours(start.hour, start.min, 0, 0);
            jobEndDate.setHours(end.hour, end.min, 0, 0);
        
            // Check if the scheduled time is in the future
            if (jobStartDate > currentDate) {
              const startJob = schedules(jobStartDate, async() => {
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
              const endJob = schedules(jobEndDate,async () => {
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
         //  convertedArray.forEach(({ start, end, deviceId }) => {
         //    const jobStartDate = new Date(currentDate);
         //    const jobEndDate = new Date(currentDate);
        
         //    jobStartDate.setHours(start.hour, start.min, 0, 0);
         //    jobEndDate.setHours(end.hour, end.min, 0, 0);
        
         //    // Check if the scheduled time is in the future
         //    if (jobStartDate > currentDate) {
         //      const startJob = schedule.scheduleJob(jobStartDate, async() => {
         //        const findDevice=await Entity.Device.findOne({
         //          where:{
         //               id:deviceId
         //          },include:[{
         //             model:Entity.Home
         //          },{
         //            model:Entity.Room,
         //         },]
         //        })
         //        await findDevice.update(Object.assign({}, {deviceStatus:1}))
         //        const data={
         //          data:findDevice,
         //          message:"ON"
         //        }
         //        console.log(`Scheduled start job at ${jobStartDate}: Device ${deviceId} ONNNNNNNNNNNNNNNNNNNNNNNN`);
         //        io.emit("message",JSON.stringify(data))
         //      });
         //      scheduledJobs.push(startJob);
         //    } 
        
         //    if (jobEndDate > currentDate) {
         //      const endJob = schedule.scheduleJob(jobEndDate,async () => {
         //        const findDevice=await Entity.Device.findOne({
         //          where:{
         //               id:deviceId
         //          },include:[{
         //            model:Entity.Home
         //         },{
         //           model:Entity.Room,
         //        },]
         //        })
         //        await findDevice.update(Object.assign({}, {deviceStatus:0}))
         //        const data={
         //          data:findDevice,
         //          message:"OFF"
         //        }
         //        console.log(`Scheduled end job at ${jobEndDate}: Device ${deviceId} OFFFFFFFFFFFFFFFFFFFFFFFF`);
         //        io.emit("message",JSON.stringify(data))
         //      });
         //      scheduledJobs.push(endJob);
         //    }
         //  });
 })
}