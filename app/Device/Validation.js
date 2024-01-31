

export const Validation=(req,res,next)=>{
    const data = req.body
    const userId = req.user.userId
    const { deviceName, homeId, roomId } = data
    if (!deviceName) {
        return res.send({ response_code: 2, response_message: "Device name is missing", response_code: 1 });
    } else if (!homeId) {
        return res.send({ response_code: 2, response_message: "homeid is missing", response_code: 1 });
    }
    else if (!roomId) {
        return res.send({ response_code: 2, response_message: "roomid is missing", response_code: 1 });
    } else{
        next()
    }
}