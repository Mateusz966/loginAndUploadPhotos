import * as jwt from 'jsonwebtoken';
import user from '../users/userInterface';
import dataInToken from './dataInTokenInterface';
import tokenData from './tokenDataInterface';
import {Request, Response, NextFunction} from 'express';

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

  private verifyToken = (token: string) => {
    const isCorrect = jwt.verify(token, process.env.JWT_SECRET);
    return isCorrect;
  }
  
  public authMiddleware = (request: Request, response: Response, next: NextFunction) => {
    const token = request.cookies.token;
    const isTokenCorrect = this.verifyToken(token);
    
    if(isTokenCorrect) {
      next();
    }

  }

  public getUserId = (token: string) => {
    const decoded: any = jwt.decode(token, {complete: true});
    return decoded.payload._id;
  }
  
}

export default authService;
