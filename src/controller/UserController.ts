import { Request, Response } from "express";
import {prisma} from "../utlis/prisma"
import { hash } from "bcryptjs";


export class UserController {
    async index (req: Request, res: Response) {
      const users = await prisma.user.findMany();
      return res.json(users);
    }

    async store(req: Request, res: Response) {
      const {name, email, telefone, password} = req.body;

      const userExists = await prisma.user.findUnique({where: {email: email}});

      if(userExists){
        return res.json({error: "User Exists"});
      }


      const hashed_password = await hash(password, 8)
      const user = await prisma.user.create({
        data:{
            name,
            email,
            telefone,
            password: hashed_password
        },
      });

      return res.json({user});
    };
}