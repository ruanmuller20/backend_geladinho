import { Router } from "express";
import { UserController } from "./controller/UserController";
import { AuthController } from "./controller/AuthController";
import { AuthMiddlewares } from "./middlewares/auth";
import { ItemController } from "./controller/ItemController";
import { FavController } from "./controller/FavController";

const userController = new UserController();
const authController = new AuthController();
const itemController = new ItemController();
const favController = new FavController();

export const router = Router();

router.post("/create", userController.store);
router.get("/users", AuthMiddlewares, userController.index);
router.post("/login", authController.authenticate);
router.get("/users2", userController.index);

router.post("/createitem", itemController.store);
router.get("/items", itemController.index);

router.post("/createfav", AuthMiddlewares, favController.store);
router.get("/favoritos", AuthMiddlewares, favController.index);
router.get("/favoritos2", AuthMiddlewares, favController.listarFavoritos);


