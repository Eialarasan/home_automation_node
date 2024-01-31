import Entity from '../../Entity/index'

class HomeService {
    async AddHome(data, res, userId) {
        try {
            const { homeName } = data
            const checkHome = await Entity.Home.findOne({
                where: {
                    homeName: homeName
                }
            })
            if (checkHome) {
                return res.send({ status: "failed", message: "Home already exists", response_code: 1 })
            } else {
                const payload = {
                    homeName: homeName,
                    userId:userId,
                    createdDate: new Date(),
                }
                await Entity.Home.create(Object.assign({}, payload))
                return res.send({ status: "success", message: "Home added successfully", response_code: 0 })
            }
        } catch (error) {
            console.error("ADD_HOME", error)
            return res.status(500).send({ response_code: 2, response_message: "Sorry something went wrong" });
        }
    }

    async GetHomeList(res,userId) {
        try {
            const HomeList = await Entity.Home.findAll({
               where:{
                userId:userId
               }
            })
            return res.send({ status: 'success', message: 'success', response: HomeList, response_code: 0 })
        } catch (error) {
            console.error("GET_HOME_LIST", error)
            return res.status(500).send({ response_code: 2, response_message: "Sorry something went wrong" });
        }
    }
    async UpdateHome(data, res) {
        try {
            const { id, homeName, is_active } = data
            const findId = await Entity.Home.findOne({
                where: {
                    id: id
                }
            })
            if (!findId) {
                res.send({ status: 'failed', message: "Home not found", response_code: 1 })
            } else {
                const payload = {
                    homeName: homeName,
                    isActive: is_active
                }
                await findId.update(Object.assign({}, payload))
                return res.send({ status: "success", message: "Home updated successfully", response_code: 0 })
            }
        } catch (error) {
            console.error("UPDATE_HOME", error)
            return res.status(500).send({ response_code: 2, response_message: "Sorry something went wrong" });
        }
    }

    async DeleteHome(data, res) {
        try {
            const { id } = data
            const findId = await Entity.Home.findOne({
                where: {
                    id: id
                }
            })
            if (!findId) {
                return res.send({ status: "failed", message: "Home not found", response_code: 1 })
            } else {
                await findId.destroy()
                return res.send({ status: "success", message: "Home deleted successfully",response_code: 0 })
            }
        } catch (error) {
            console.error("DELETE_HOME",error)
            return res.status(500).send({ response_code: 2, response_message: "Sorry something went wrong" });
        }
    }
}
export default new HomeService();