import { isValidEmail, isValidPassword, isValidPasswordMaxLength, isValidPhoneNumber, isValidUsername, isValidateMaxLength, isValidateUserMaxLength } from "../../util";
import Service from "./Service";

class UserHandler {
    async UserRegister(req, res) {
        try {
                await Service.UserRegister(data, res)
            
        } catch (error) {
            console.error("USER_REGISTER",error)
            return res.status(500).send({ response_code: 2, response_message: "Sorry something went wrong" });
        }
    }

    async UserLogin(req, res) {
        try {
            const data = req.body
            const { email, password } = data
            if (!email) {
                return res.send({ response_code: 2, response_message: "email is missing", response_code: 1 });
            } else if (!isValidEmail(email)) {
                return res.send({ response_code: 2, response_message: "email is should be in correct format", response_code: 1 });
            } else if (!password) {
                return res.send({ response_code: 2, response_message: "password is missing", response_code: 1 });
            } else {
                await Service.UserLogin(data, res)
            }
        } catch (error) {
            console.error("USER_LOGIN",error)
            return res.status(500).send({ response_code: 2, response_message: "Sorry something went wrong" });
        }
    }
    
}
export default new UserHandler();