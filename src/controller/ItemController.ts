import { Request, Response } from "express";
import {prisma} from "../utlis/prisma"



export class ItemController {
    async index (req: Request, res: Response) {
      const items = await prisma.item.findMany();
      return res.json(items);
    }

    async store(req: Request, res: Response) {
      const {name, caracteristic, description, price, price_promo, image} = req.body;
      const item = await prisma.item.create({
        data:{
            name,
            caracteristic,
            description,
            price,
            price_promo,
            image
        },
      });

      return res.json({item});
    };
}