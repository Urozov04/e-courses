import { Router } from "express";
import { EnrollmentController } from "../controller/enrollment.controller.js";
import { JwtAuthGuard } from "../middleware/jwt-auth.guard.js";
import { UserGuard } from "../middleware/user.guard.js";

const router = Router()
const controller = new EnrollmentController();

router
    .post("/create",JwtAuthGuard, UserGuard, controller.create)
    .get("/getAll",JwtAuthGuard, UserGuard, controller.getAll)
    .get("/:id",JwtAuthGuard, UserGuard, controller.getById)
    .patch("/:id", JwtAuthGuard, UserGuard, controller.updateById)
    .delete("/:id", JwtAuthGuard, UserGuard, controller.deleteById)

export { router as enrollmentRouter }