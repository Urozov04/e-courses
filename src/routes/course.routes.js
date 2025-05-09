import { Router } from "express";
import { CourseController } from "../controller/course.controller.js";

const router = Router ();
const controller = new CourseController ();

router
    .post("/create", controller.create)
    .get("/getAll", controller.getAll)
    .get("/:id", controller.getById)
    .patch("/:id", controller.updateById)
    .delete("/:id", controller.deleteById)

export { router as courseRouter }