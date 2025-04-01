import { Request, Response } from "express";
import { prisma } from "../utlis/prisma";

export class FavController {
    async index(req: Request, res: Response) {
        const favoritos = await prisma.favorite.findMany();
        return res.json(favoritos);
    }

    async store(req: Request, res: Response) {
        const { itemId } = req.body;
        const userId = parseInt(req.userId); // Obtém o userId do token JWT

        console.log("Requisição recebida no endpoint /createfav");
        console.log("Cabeçalhos:", req.headers);
        console.log("Corpo da requisição:", req.body);

        const itemExists = await prisma.item.findUnique({ where: { id: itemId} });

        if (!itemExists) {
            return res.status(400).json({ error: "Item not found" });
        }

       
        const favorito = await prisma.favorite.create({
            data: {
                userId,
                itemId
            },
        });
        console.log("Valor de item_id recebido:", itemId);
        console.log("Valor de userId recebido:", userId);
        return res.json(favorito);
        
    }

    async listarFavoritos(req: Request, res: Response) {
        const userId = parseInt(req.userId); // Obtém o userId do token JWT

        try {
            const favoritos = await prisma.favorite.findMany({
                where: { userId },
                include: {
                    item: true, // Inclui os detalhes do item relacionado
                },
            });

            return res.json(favoritos);
        } catch (error) {
            console.error("Erro ao listar favoritos:", error);
            return res.status(500).json({ error: "Erro ao listar favoritos" });
        }
    }
}