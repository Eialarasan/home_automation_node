import Service from "./Service";

class ScheduleService {

    async addSchedule(req, res) {
        try {
            const data = req.body
            const userId = req.user.userId
                await Service.AddSchedule(data, res, userId)
        } catch (error) {
            console.error("ADD_Schedule", error)
            return res.status(500).send({ response_code: 2, response_message: "Sorry something went wrong" });
        }
    }

    async getScheduleList(req, res) {
        try {
            const data=req.query

            await Service.GetScheduleList(res,data)
        } catch (error) {
            console.error("GET_Schedule_LIST", error)
            return res.status(500).send({ response_code: 2, response_message: "Sorry something went wrong" });
        }
    }

    async updateSchedule(req, res) {
        try {
            const data = req.body
            const { deviceId, homeId, roomId,startTime,endTime } = data
            await Service.UpdateSchedule(data, res)
        } catch (error) {
            console.error("UPDATE_Schedule", error)
            return res.status(500).send({ response_code: 2, response_message: "Sorry something went wrong" });
        }
    }

    async deleteSchedule(req, res) {
        try {
            const data = req.body
            await Service.DeleteSchedule(data, res)
        } catch (error) {
            console.error("DELETE_SCHEDULE", error)
            return res.status(500).send({ response_code: 2, response_message: "Sorry something went wrong" });
        }
    }
}
export default new ScheduleService();