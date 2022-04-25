const AuthService = require("../services/authService");
const ApiStatus = require("../handlers/apiStatus");
const {validationResult} = require("express-validator");
const path = require("path");


class AuthController {

    //  http://localhost:7000/ecosystem-adm/auth/login
    async login(req, res, next) {
        try {
            const errors = validationResult(req);
            if(!errors.isEmpty()) {
                return next(ApiStatus.badRequest("Ошибка валидации. Неверные данные."));
            }
            const {email, password} = req.body;
            const userData = await AuthService.login(email, password);
            if(userData.user.role == 4) {
                res.cookie("refreshToken", userData.tokens.refreshToken, {
                    maxAge:30 * 24 * 60 * 60 * 1000,
                    httpOnly:false,
                });
                return res.json(userData);
            } else {
                return next(ApiStatus.badRequest("Нет доступа"));
            }
        } catch (e) {
            return next(ApiStatus.internal(`Ошибка сервера: ${e}`));
        }
    }

    //  http://localhost:7000/ecosystem-adm/auth/activate/:link
    async activate(req, res, next) {
        try {
            const errors = validationResult(req);
            if(!errors.isEmpty()) {
                return next(ApiStatus.badRequest("Ошибка. Ссылка не найдена"));
            }
            const activationLink = req.params.link;
            const link = await AuthService.activate(activationLink);
            if(!link) {
                return res.sendFile(
                    path.join(__dirname, "../public", "activated.html")
                );
            }
            return res.sendFile(
                path.join(__dirname, "../public", "activationError.html")
            );
        } catch (e) {
            return next(ApiStatus.internal(`Ошибка сервера: ${e}`));
        }
    }

    //  http://localhost:7000/ecosystem-adm/auth/refresh
    async refresh(req, res, next) {
        try {
            const errors = validationResult(req);
            if(!errors.isEmpty()) {
                return next(ApiStatus.badRequest("Ошибка. Токен не найден."));
            }
            const refreshToken = req.cookies;
            const userData = await AuthService.refresh(refreshToken);
            if(userData.user.role == 4) {
                res.cookie("refreshToken", userData.tokens.refreshToken, {
                    maxAge:30 * 24 * 60 * 60 * 1000,
                    httpOnly:false,
                });
                return res.json(userData);
            } else {
                return next(ApiStatus.badRequest("Нет доступа"));
            }
        } catch (e) {
            return next(ApiStatus.internal(`Ошибка сервера: ${e}`));
        }
    }

    //  http://localhost:7000/ecosystem-adm/auth/logout
    async logout(req, res, next) {
        try {
            const errors = validationResult(req);
            if(!errors.isEmpty()) {
                return next(ApiStatus.badRequest("Ошибка. Токен не найден."));
            }
            const refreshToken = req.cookies;
            const token = await AuthService.logout(refreshToken);
            res.clearCookie("refreshToken");
            return next(ApiStatus.ok(token));
        } catch (e) {
            return next(ApiStatus.internal(`Ошибка сервера: ${e}`));
        }
    }

}

module.exports = new AuthController();