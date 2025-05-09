import { Router } from "express";
import { UserController } from "../controller/user.controller.js";
import { JwtAuthGuard } from "../middleware/jwt-auth.guard.js";
import { UserGuard } from "../middleware/user.guard.js"

const router = Router();
const controller = new UserController();

router
  .post("/create", controller.createUser)
  .post("/signin", controller.singinAdmin)
  .post("/confirmsignin", controller.confirmsignIn)
  .post("/signout", controller.signoutAdmin)
  .post("/accesstoken", controller.accessToken)
  .get("/all", controller.getAllUsers)
  .get("/:id",JwtAuthGuard, UserGuard, controller.getById)
  .patch("/:id", JwtAuthGuard, UserGuard, controller.updateById)
  .delete("/:id",JwtAuthGuard, UserGuard, controller.deleteById);

export { router as userRouter };
