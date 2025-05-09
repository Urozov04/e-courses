import { Router } from "express";
import { CourseController } from "../controller/course.controller.js";
import { JwtAuthGuard } from "../middleware/jwt-auth.guard.js";
import { AuthorGuard } from "../middleware/author.guard.js";
import { AdminGuard } from "../middleware/admin.guard.js";

const router = Router ();
const controller = new CourseController ();

router
    .post("/create",JwtAuthGuard, AuthorGuard, controller.create)
    .get("/getAll", controller.getAll)
    .get("/:id", controller.getById)
    .patch("/:id",JwtAuthGuard, AuthorGuard, controller.updateById)
    .delete("/:id",JwtAuthGuard, AuthorGuard, controller.deleteById)

export { router as courseRouter }