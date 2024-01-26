import Entity from '../../Entity/index'

class ScheduleService {
    async AddSchedule(data, res, userId) {
        try {
            const { deviceId,homeId,roomId,startTime,endTime } = data
            const checkSchedule = await Entity.Schedule.findOne({
                where: {
                    deviceId: deviceId
                }
            })
            // if (checkSchedule) {
            //     return res.send({ status: "failed", message: "device already exists", response_code: 1 })
            // } else {
                const payload = {
                    deviceId: deviceId,
                    homeId:homeId,
                    roomId:roomId,
                    startTime:startTime,
                    endTime:endTime,
                    createdDate: new Date(),
                }
                await Entity.Schedule.create(Object.assign({}, payload))
                return res.send({ status: "success", message: "Schedule added successfully", response_code: 0 })
            // }
        } catch (error) {
            console.error("ADD_Schedule", error)
            return res.status(500).send({ response_code: 2, response_message: "Sorry something went wrong" });
        }
    }

    async GetScheduleList(res,data) {
        try {
            const condition=data.homeId?{
                   homeId:data.homeId
            }:{

            }
            const ScheduleList = await Entity.Schedule.findAll({
            where: condition,  include: [{
                    model: Entity.Home
                },{
                    model: Entity.Device
                },{
                    model: Entity.Room
                }]
            })
            return res.send({ status: 'success', message: 'success', response: ScheduleList, response_code: 0 })
        } catch (error) {
            console.error("GET_Schedule_LIST", error)
            return res.status(500).send({ response_code: 2, response_message: "Sorry something went wrong" });
        }
    }
    async UpdateSchedule(data, res) {
        try {
            const { id,deviceId,homeId,roomId,startTime,endTime,is_active } = data
            const findId = await Entity.Schedule.findOne({
                where: {
                    id: id
                }
            })
            if (!findId) {
                res.send({ status: 'failed', message: "Schedule not found", response_code: 1 })
            } else {
                const payload = {
                    deviceId: deviceId,
                    roomId:roomId,
                    homeId:homeId,
                    startTime:startTime,
                    endTime:endTime,
                    isActive: is_active
                }
                await findId.update(Object.assign({}, payload))
                return res.send({ status: "success", message: "Schedule updated successfully", response_code: 0 })
            }
        } catch (error) {
            console.error("UPDATE_Schedule", error)
            return res.status(500).send({ response_code: 2, response_message: "Sorry something went wrong" });
        }
    }

    async DeleteSchedule(data, res) {
        try {
            const { id } = data
            const findId = await Entity.Schedule.findOne({
                where: {
                    id: id
                }
            })
            if (!findId) {
                return res.send({ status: "failed", message: "Schedule not found", response_code: 1 })
            } else {
                await findId.destroy()
                return res.send({ status: "success", message: "Schedule deleted successfully" ,response_code: 0 })
            }
        } catch (error) {
            console.error("DELETE_Schedule",error)
            return res.status(500).send({ response_code: 2, response_message: "Sorry something went wrong" });
        }
    }
}
export default new ScheduleService();