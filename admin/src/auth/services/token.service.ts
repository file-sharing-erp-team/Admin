import {Injectable} from "@nestjs/common";
import jwt from "jsonwebtoken";
import {Token} from "../token.model";

@Injectable()
export class TokenService {

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
      return jwt.verify(token, process.env.JWT_ACCESS_SECRET);
    } catch (e) {
      return null;
    }
  }

  idByAccessToken(token) {
    try {
      return jwt.verify(token, process.env.JWT_ACCESS_SECRET);
    } catch (e) {
      return null;
    }
  }

  validateRefreshToken(token) {
    try {
      return jwt.verify(
          token.refreshToken,
          process.env.JWT_REFRESH_SECRET
      );
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
    return await Token.create({user_id: userId, refreshToken});
  }

  async removeToken(refreshToken) {
    return await Token.destroy({where: refreshToken});
  }

  async findToken(token) {
    return await Token.findOne({
      where: {refreshToken: token.refreshToken},
    });
  }

}
