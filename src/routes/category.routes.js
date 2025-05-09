import { Router } from "express";
import { CategoryController } from "../controller/category.controller.js";

const router = Router();
const controller = new CategoryController()

router
    .post("/create", controller.create)
    .get("/getAll", controller.getAll)
    .get("/:id", controller.getById)
    .patch("/:id", controller.updateById)
    .delete("/:id", controller.deleteById)


export { router as categoryRouter }