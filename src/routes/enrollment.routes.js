import { Router } from "express";
import { EnrollmentController } from "../controller/enrollment.controller.js";

const router = Router()
const controller = new EnrollmentController();

router
    .post("/create", controller.create)
    .get("/getAll", controller.getAll)
    .get("/:id", controller.getById)
    .patch("/:id", controller.updateById)
    .delete("/:id", controller.deleteById)

export { router as enrollmentRouter }