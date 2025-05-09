import { Router } from "express";
import { ReviewController } from "../controller/review.controller.js";
import { JwtAuthGuard } from "../middleware/jwt-auth.guard.js";
import { UserGuard } from "../middleware/user.guard.js";

const router = Router();
const controller = new ReviewController();

router
    .post("/create",JwtAuthGuard, UserGuard, controller.create)
    .get("/getAll", controller.getAll)
    .get("/:id", controller.getById)
    .patch("/:id",JwtAuthGuard, UserGuard, controller.updateById)
    .delete("/:id",JwtAuthGuard, UserGuard, controller.deleteById)

export { router as reviewRouter }