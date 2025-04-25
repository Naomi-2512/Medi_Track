import { NextFunction, Request, Response } from "express";
import { TokenDetails } from "../interfaces/medic.interface";
import jwt from "jsonwebtoken";

export interface ExtendedRequest extends Request {
  info?: TokenDetails
}

export const verifyToken = async (req: ExtendedRequest, res: Response, next: NextFunction) => {
  try {  
    const authHeader = req.headers['authorization'] as string;
    
    if (!authHeader) {
      res.status(401).json({
        'success': false,
        'error': 'You are not allowed to access this service. Login.'
      });
    }
  
    let token = authHeader.split(" ")[1];
  
    jwt.verify(token, process.env.SECRET_KEY as string, (err, data) => {
      if (err) {
        if (err.name === "TokenExpiredError") {
          res.status(401).json({
            error: "Your session has expired, please log in again"
          });
        } else if (err.name === "JsonWebTokenError") {
          res.status(401).json({
            error: "Invalid token, please log in again"
          });
        } else {
          res.status(501).json({
            error: "An error occurred while verifying the token"
          });
        }
      }
      req.info = data as TokenDetails;
      next();
    });    
  } catch (error) {
    res.status(501).json({
      'success': false,
      'error': 'Invalid token provided.'
    });
  }
}

export const getIdFromToken = (req: ExtendedRequest): string => {
  let details = req.info as TokenDetails;

  if (!details) return '';

  let doctorId = details.doctorId;

  if (doctorId == '') return doctorId;
  
  return doctorId;
}