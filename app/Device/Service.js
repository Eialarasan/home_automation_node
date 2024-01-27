import Entity from '../../Entity/index'

class DeviceService {
    async AddDevice(data, res, userId) {
        try {
            const { deviceName, homeId, roomId, deviceStatus } = data
            const checkDevice = await Entity.Device.findOne({
                where: {
                    deviceName: deviceName
                }
            })
            if (checkDevice) {
                return res.send({ status: "failed", message: "Device already exists", response_code: 1 })
            } else {
                const payload = {
                    deviceName: deviceName,
                    homeId: homeId,
                    roomId: roomId,
                    deviceStatus: deviceStatus,
                    createdDate: new Date(),
                }
                await Entity.Device.create(Object.assign({}, payload))
                return res.send({ status: "success", message: "Device added successfully", response_code: 0 })
            }
        } catch (error) {
            console.error("ADD_DEVICE", error)
            return res.status(500).send({ response_code: 2, response_message: "Sorry something went wrong" });
        }
    }

    async GetDeviceList(res, data) {
        try {
            const condition = data.homeId ? where = {
                homeId:data.homeId
            } : {

            }
            const DeviceList = await Entity.Device.findAll({
                where: condition, include: [{
                    model: Entity.Home
                }, {
                    model: Entity.Room
                }]
            })
            return res.send({ status: 'success', message: 'success', response: DeviceList, response_code: 0 })
        } catch (error) {
            console.error("GET_Device_LIST", error)
            return res.status(500).send({ response_code: 2, response_message: "Sorry something went wrong" });
        }
    }
    async UpdateDevice(data, res) {
        try {
            const { id, deviceName, homeId, roomId, is_active, deviceStatus } = data
            const findId = await Entity.Device.findOne({
                where: {
                    id: id
                }
            })
            if (!findId) {
                res.send({ status: 'failed', message: "Device not found", response_code: 1 })
            } else {
                const payload = {
                    deviceName: deviceName,
                    roomId: roomId,
                    homeId: homeId,
                    deviceStatus: deviceStatus,
                    isActive: is_active
                }
                await findId.update(Object.assign({}, payload))
                return res.send({ status: "success", message: "Device updated successfully", response_code: 0 })
            }
        } catch (error) {
            console.error("UPDATE_Device", error)
            return res.status(500).send({ response_code: 2, response_message: "Sorry something went wrong" });
        }
    }

    async DeleteDevice(data, res) {
        try {
            const { id } = data
            const findId = await Entity.Device.findOne({
                where: {
                    id: id
                }
            })
            if (!findId) {
                return res.send({ status: "failed", message: "Device not found", response_code: 1 })
            } else {
                await findId.destroy()
                return res.send({ status: "success", message: "Device deleted successfully", response_code: 0 })
            }
        } catch (error) {
            console.error("DELETE_Device", error)
            return res.status(500).send({ response_code: 2, response_message: "Sorry something went wrong" });
        }
    }
}
export default new DeviceService();