import { Router } from "express";
import { ReviewController } from "../controller/review.controller.js";

const router = Router();
const controller = new ReviewController();

router
    .post("/create", controller.create)
    .get("/getAll", controller.getAll)
    .get("/:id", controller.getById)
    .patch("/:id", controller.updateById)
    .delete("/:id", controller.deleteById)

export { router as reviewRouter }