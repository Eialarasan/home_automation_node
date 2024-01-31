

export const Validation=(req,res,next)=>{
    
    const data = req.body
    const userId = req.user.userId
    const { roomName,homeId } = data
    if (!roomName) {
        return res.send({ response_code: 2, response_message: "Room name is missing", response_code: 1 });
    } else if(!homeId){
        return res.send({ response_code: 2, response_message: "Home is missing", response_code: 1 });
   
    } else {
        next()
    }
}