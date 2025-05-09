import { Router } from "express";
import { CategoryController } from "../controller/category.controller.js";
import { JwtAuthGuard } from "../middleware/jwt-auth.guard.js";
import { AdminGuard } from "../middleware/admin.guard.js";

const router = Router();
const controller = new CategoryController()

router
    .post("/create",JwtAuthGuard, AdminGuard, controller.create)
    .get("/getAll", controller.getAll)
    .get("/:id", controller.getById)
    .patch("/:id",JwtAuthGuard, AdminGuard, controller.updateById)
    .delete("/:id",JwtAuthGuard, AdminGuard, controller.deleteById)


export { router as categoryRouter }