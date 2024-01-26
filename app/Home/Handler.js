import Service from "./Service";

class HomeService {

    async addHome(req, res) {
        try {
            const data = req.body
            const userId = req.user.userId
            const { homeName } = data
            if (!homeName) {
                return res.send({ response_code: 2, response_message: "Home name is missing", response_code: 1 });
            }  else {
                await Service.AddHome(data, res, userId)
            }
        } catch (error) {
            console.error("ADD_HOME", error)
            return res.status(500).send({ response_code: 2, response_message: "Sorry something went wrong" });
        }
    }

    async getHomeList(req, res) {
        try {
            await Service.GetHomeList(res)
        } catch (error) {
            console.error("GET_Home_LIST", error)
            return res.status(500).send({ response_code: 2, response_message: "Sorry something went wrong" });
        }
    }

    async updateHome(req, res) {
        try {
            const data = req.body
            const { homeName, id } = data
                await Service.UpdateHome(data, res)
        } catch (error) {
            console.error("UPDATE_HOME", error)
            return res.status(500).send({ response_code: 2, response_message: "Sorry something went wrong" });
        }
    }

    async deleteHome(req, res) {
        try {
            const data = req.body
            await Service.DeleteHome(data, res)
        } catch (error) {
            console.error("DELETE_HOME", error)
            return res.status(500).send({ response_code: 2, response_message: "Sorry something went wrong" });
        }
    }
}
export default new HomeService();