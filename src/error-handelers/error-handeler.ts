import { NextFunction, Request, Response } from "express";

export const ErrorHandeler = (err: object, req: Request, res: Response, next: NextFunction) =>{
  if(err instanceof Error){
    res.status(500).json(err);
  }
  else{
    res.status(400).json(err);
  }
}
