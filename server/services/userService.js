const ApiStatus = require("../handlers/apiStatus");
const User = require("../models/User");
const UsernameDto = require("../dto/usernameDTO");
const bcrypt = require("bcrypt");
const uuid = require("uuid");
const UserDTO = require("../dto/userDto");
const mailService = require("./mailService");


class UserService {

    async getUserById(userId) {
        try {
            const user = await User.findByPk(userId);
            if(user) {
                return {user};
            } else {
                throw ApiStatus.badRequest("Пользователь не найден");
            }
        } catch (e) {
            throw ApiStatus.internal(`Ошибка сервера: ${e}`);
        }
    }

    async createUser(email, password, role, first_name, middle_name, last_name) {
        try{
            const candidate = await User.findOne({where:{email}});
            if(candidate) {
                throw ApiStatus.badRequest("Пользователь с таким email уже существует");
            }
            const hashedPassword = await bcrypt.hash(password, 5);
            const activationLink = uuid.v4();
            const user = await User.create({
                email,
                password:hashedPassword,
                activationLink,
                role,
                first_name, 
                middle_name, 
                last_name
            });
            const userLink = process.env.API_URL + "/ecosystem-adm/auth/activate/" + activationLink;
            await mailService.sendActivationMail(email, userLink);
            const userDTO = new UserDTO(user);
            return {user:userDTO};
        } catch (e) {
            throw ApiStatus.internal(`Ошибка сервера: ${e}`);
        }

    }

    async getUsernameById(userId) {
        try {
            const user = await User.findByPk(userId);
            if(user) {
                const usernameDTO = new UsernameDto(user);
                return {usernameDTO};
            } else {
                throw ApiStatus.badRequest("Пользователь не найден");
            }
        } catch (e) {
            throw ApiStatus.internal(`Ошибка сервера: ${e}`);
        }
    }

    async addUserToGroup(groupId, userId) {
        try {
            const user = await User.findByPk(userId);
            if(user) {
                user.GroupId = groupId;
                await user.save();
                return user;
            } else {
                throw ApiStatus.badRequest("Пользователь не найден");
            }
        } catch (e) {
            throw ApiStatus.internal(`Ошибка сервера: ${e}`);
        }
    }

    async setFIO(userId, firstName, middleName, lastName) {
        try {
            const user = await User.findByPk(userId);
            if(user) {
                user.first_name = firstName;
                user.middle_name = middleName;
                user.last_name = lastName;
                await user.save();
                return user;
            } else {
                throw ApiStatus.badRequest("Пользователь не найден");
            }
        } catch (e) {
            throw ApiStatus.internal(`Ошибка сервера: ${e}`);
        }
    }
}

module.exports = new UserService();
