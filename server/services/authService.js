const User = require("../models/User");
const bcrypt = require("bcrypt");
const ApiStatus = require("../handlers/apiStatus");
const AuthDTO = require("../dto/authDTO")
const UserDTO = require("../dto/userDto");
const tokenService = require("./tokenService");

class AuthService {

    async login(email, password) {
        try{
            const user = await User.findOne({where:{email}});
            if(!user) {
                throw ApiStatus.badRequest("Пользователь с таким email не был найден");
            }
            const isPassEquals = await bcrypt.compare(password, user.password);
            if(!isPassEquals) {
                throw ApiStatus.badRequest("Неверные данные");
            }
            const authDTO = new AuthDTO(user);
            const userDTO = new UserDTO(user);
            const tokens = tokenService.generateToken({...authDTO});
            await tokenService.saveToken(authDTO.id, tokens.refreshToken);
            return {tokens, user:userDTO};
        } catch(e) {
            throw ApiStatus.internal(`Ошибка сервера: ${e}`);
        }
    }

    async activate(activationLink) {
        try{
            const user = await User.findOne({where:{activationLink}});
            if(!user) {
                throw ApiStatus.badRequest("Неккоректная ссылка активации");
            }
            user.isActivated = true;
            user.activationLink = null;
            await user.save();
        } catch(e) {
            throw ApiStatus.internal(`Ошибка сервера: ${e}`);
        }
    }

    async logout(refreshToken) {
        try{
            const logout = await tokenService.removeToken(refreshToken);
            return logout;
        } catch(e) {
            throw ApiStatus.internal(`Ошибка сервера: ${e}`);
        }
    }

    async refresh(refreshToken) {
        try{        
            if(!refreshToken) {
                throw ApiStatus.UnauthorizedError();
            }
            const userData = tokenService.validateRefreshToken(refreshToken);

            const tokenFromDb = await tokenService.findToken(refreshToken);
            if(!userData || !tokenFromDb) {
                throw ApiStatus.UnauthorizedError();
            }
            const user = await User.findByPk(userData.id);
            const authDTO = new AuthDTO(user);
            const tokens = tokenService.generateToken({...authDTO});
            await tokenService.saveToken(authDTO.id, tokens.refreshToken);
            return {tokens, user:authDTO};
        } catch(e) {
            throw ApiStatus.internal(`Ошибка сервера: ${e}`);
        }

    }
}

module.exports = new AuthService();
