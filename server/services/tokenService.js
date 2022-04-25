const jwt = require("jsonwebtoken");
const Token = require("../models/Token");


class TokenService {
    
    generateToken(payload) {
        const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {
            expiresIn:"30m",
        });
        const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {
            expiresIn:"30d",
        });
        return {
            accessToken,
            refreshToken,
        };
    }

    validateAccessToken(token) {
        try {
            const userData = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
            return userData;
        } catch (e) {
            return null;
        }
    }

    idByAccessToken(token) {
        try {
            const userData = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
            return userData.id;
        } catch (e) {
            return null;
        }
    }

    validateRefreshToken(token) {
        try {
            const userData = jwt.verify(
                token.refreshToken,
                process.env.JWT_REFRESH_SECRET
            );
            return userData;
        } catch (e) {
            return null;
        }
    }

    async saveToken(userId, refreshToken) {
        const tokenData = await Token.findOne({where:{user_id:userId}});
        if(tokenData) {
            tokenData.refreshToken = refreshToken;
            return tokenData.save();
        }
        const token = await Token.create({user_id:userId, refreshToken});
        return token;
    }

    async removeToken(refreshToken) {
        const tokenData = await Token.destroy({where:refreshToken});
        return tokenData;
    }

    async findToken(token) {
        const tokenFind = await Token.findOne({
            where:{refreshToken:token.refreshToken},
        });
        return tokenFind;
    }
}


module.exports = new TokenService();
