import * as jwt from 'jsonwebtoken';
import user from '../users/userInterface';
import dataInToken from './dataInTokenInterface';
import tokenData from './tokenDataInterface';

class authService {
  public createToken(user: user): tokenData {
    const secretKey = process.env.JWT_SECRET;
    const dataInToken: dataInToken = {
      _id: user._id
    };
    return {
      token: jwt.sign(dataInToken, secretKey),
    };
  }
}

export default authService;
