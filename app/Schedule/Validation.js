

export const Validation = (req, res, next) => {

    const data = req.body
    const userId = req.user.userId
    const { deviceId, homeId, roomId, startTime, endTime } = data
    if (!deviceId) {
        return res.send({ response_code: 2, response_message: "device id is missing", response_code: 1 });
    } else if (!homeId) {
        return res.send({ response_code: 2, response_message: "homeid is missing", response_code: 1 });
    }
    else if (!roomId) {
        return res.send({ response_code: 2, response_message: "roomid is missing", response_code: 1 });
    }
    else if (!startTime) {
        return res.send({ response_code: 2, response_message: "start time is missing", response_code: 1 });
    } else if (!endTime) {
        return res.send({ response_code: 2, response_message: "end time is missing", response_code: 1 });
    } else {
        next()
    }
}