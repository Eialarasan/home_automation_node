import Service from "./Service";

class RoomService {

    async addRoom(req, res) {
        try {
            const data = req.body
            const userId = req.user.userId
            const { roomName,homeId } = data
            if (!roomName) {
                return res.send({ response_code: 2, response_message: "Room name is missing", response_code: 1 });
            }  else {
                await Service.AddRoom(data, res, userId)
            }
        } catch (error) {
            console.error("ADD_ROOM", error)
            return res.status(500).send({ response_code: 2, response_message: "Sorry something went wrong" });
        }
    }

    async getRoomList(req, res) {
        try {
            const homeId=req.query
            await Service.GetRoomList(res,homeId)
        } catch (error) {
            console.error("GET_ROOM_LIST", error)
            return res.status(500).send({ response_code: 2, response_message: "Sorry something went wrong" });
        }
    }

    async updateRoom(req, res) {
        try {
            const data = req.body
                await Service.UpdateRoom(data, res)
        } catch (error) {
            console.error("UPDATE_ROOM", error)
            return res.status(500).send({ response_code: 2, response_message: "Sorry something went wrong" });
        }
    }

    async deleteRoom(req, res) {
        try {
            const data = req.body
            await Service.DeleteRoom(data, res)
        } catch (error) {
            // console.error("DELETE_ROOM", error)
            return res.status(500).send({ response_code: 2, response_message: "Sorry something went wrong" });
        }
    }
}
export default new RoomService();