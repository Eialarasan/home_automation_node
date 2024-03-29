import Service from "./Service";

class DeviceService {

    async addDevice(req, res) {
        try {
            
                await Service.AddDevice(data, res, userId)
            
        } catch (error) {
            console.error("ADD_DEVICE", error)
            return res.status(500).send({ response_code: 2, response_message: "Sorry something went wrong" });
        }
    }

    async getDeviceList(req, res) {
        try {
            const data=req.query
            await Service.GetDeviceList(res,data)
        } catch (error) {
            console.error("GET_DEVICE_LIST", error)
            return res.status(500).send({ response_code: 2, response_message: "Sorry something went wrong" });
        }
    }

    async updateDevice(req, res) {
        try {
            const data = req.body
            await Service.UpdateDevice(data, res)
        } catch (error) {
            console.error("UPDATE_DEVICE", error)
            return res.status(500).send({ response_code: 2, response_message: "Sorry something went wrong" });
        }
    }

    async deleteDevice(req, res) {
        try {
            const data = req.body
            await Service.DeleteDevice(data, res)
        } catch (error) {
            console.error("DELETE_DEVICE", error)
            return res.status(500).send({ response_code: 2, response_message: "Sorry something went wrong" });
        }
    }
}
export default new DeviceService();