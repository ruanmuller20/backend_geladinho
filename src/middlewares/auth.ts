import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

type TokenPayload = {
    id: string;
    iat: number;
    exp: number;

}



export function AuthMiddlewares(
    req: Request,
    res: Response,  
    next: NextFunction
){
    console.log(req.headers);
    const {authorization} = req.headers;
    if(!authorization){
        return res.status(401).json({error: "Token not privided"});
    }

    const [, token] = authorization.split(" ");

    try{
       const decoded = verify(token, "d8d3d5af87f4682b461a012d91cacfdb");
       const {id} = decoded as TokenPayload;
       req.userId = id;
       next();

    } catch (error){
        return res.status(401).json({error: "Token invalid"});
    };
}