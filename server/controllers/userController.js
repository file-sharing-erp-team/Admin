const UserService = require("../services/userService");
const {validationResult} = require("express-validator");
const ApiStatus = require("../handlers/apiStatus");

class UserController {

    //  http://localhost:7000/ecosystem-adm/user/createUser
    async createUser(req, res, next) {
        try {
            const errors = validationResult(req);
            if(!errors.isEmpty()) {
                return next(ApiStatus.badRequest("Ошибка. Неккоректные данные."));
            }
            const {email, password, role, first_name, middle_name, last_name} = req.body;
            const userData = await UserService.createUser(email, password, role, first_name, middle_name, last_name);
            return res.json(userData);
        } catch (e) {
            return next(ApiStatus.internal(`Ошибка сервера: ${e}`));
        }
    }

    //  http://localhost:7000/ecosystem-adm/user/setFIO
    async setFIO(req, res, next) {
        try {
            const errors = validationResult(req);
            if(!errors.isEmpty()) {
                return next(ApiStatus.badRequest("Ошибка. Неккоректные данные."));
            }
            const {userId, firstName, middleName, lastName} = req.body;
            const setFIO = await UserService.setFIO(
                userId,
                firstName,
                middleName,
                lastName
            );
            return res.json(setFIO);
        } catch (e) {
            return next(ApiStatus.internal(`Ошибка сервера: ${e}`));
        }
    }
    
}

module.exports = new UserController();
