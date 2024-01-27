import Entity from '../../Entity/index'

class RoomService {
    async AddRoom(data, res, userId) {
        try {
            const { roomName, homeId } = data
            const checkRoom = await Entity.Room.findOne({
                where: {
                    roomName: roomName
                }
            })
            if (checkRoom) {
                return res.send({ status: "failed", message: "Room already exists", response_code: 1 })
            } else {
                const payload = {
                    roomName: roomName,
                    homeId: homeId,
                    createdDate: new Date(),
                }
                await Entity.Room.create(Object.assign({}, payload))
                return res.send({ status: "success", message: "Room added successfully", response_code: 0 })
            }
        } catch (error) {
            console.error("ADD_Room", error)
            return res.status(500).send({ response_code: 2, response_message: "Sorry something went wrong" });
        }
    }

    async GetRoomList(res, data) {
        try {
            const condition = data.homeId ?  {
                homeId: data.homeId
            } :{}

            const RoomList = await Entity.Room.findAll({
                where: condition,
                include: [{
                    model: Entity.Home
                }, {
                    model: Entity.Device
                }]
            })
            return res.send({ status: 'success', message: 'success', response: RoomList, response_code: 0 })
        } catch (error) {
            console.error("GET_Room_LIST", error)
            return res.status(500).send({ response_code: 2, response_message: "Sorry something went wrong" });
        }
    }
    async UpdateRoom(data, res) {
        try {
            const { id, roomName, homeId, is_active } = data
            const findId = await Entity.Room.findOne({
                where: {
                    id: id
                }
            })
            if (!findId) {
                res.send({ status: 'failed', message: "Room not found", response_code: 1 })
            } else {
                const payload = {
                    roomName: roomName,
                    homeId: homeId,
                    isActive: is_active
                }
                await findId.update(Object.assign({}, payload))
                return res.send({ status: "success", message: "Room updated successfully", response_code: 0 })
            }
        } catch (error) {
            console.error("UPDATE_Room", error)
            return res.status(500).send({ response_code: 2, response_message: "Sorry something went wrong" });
        }
    }

    async DeleteRoom(data, res) {
        try {
            const { id } = data
            const findId = await Entity.Room.findOne({
                where: {
                    id: id
                }
            })
            if (!findId) {
                return res.send({ status: "failed", message: "Room not found", response_code: 1 })
            } else {
                await findId.destroy()
                return res.send({ status: "success", message: "Room deleted successfully", response_code: 0 })
            }
        } catch (error) {
            console.error("DELETE_Room", error)
            return res.status(500).send({ response_code: 2, response_message: "Sorry something went wrong" });
        }
    }
}
export default new RoomService();