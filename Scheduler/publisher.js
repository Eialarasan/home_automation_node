import Entity from '../Entity/index'


export const Puplisher=(mqttClient,io)=>{
     mqttClient.on('connect',async()=>{
      console.log('Publisher connected')
     
      setInterval(async()=>{
         io.on('connection', socket => {
            console.log('A user connected');
            
          }); 
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
      mqttClient.publish('home',JSON.stringify(convertedArray))
      },1000)
     })
   
}

