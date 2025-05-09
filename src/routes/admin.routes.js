import { Router } from "express";
import { UserController } from "../controller/user.controller.js";
import { JwtAuthGuard } from "../middleware/jwt-auth.guard.js";
import { SuperAdminGuard } from "../middleware/super-admin.guard.js"
import { AdminGuard } from "../middleware/admin.guard.js"

const router = Router();
const controller = new UserController();

router
  .post("/create", JwtAuthGuard, controller.createAdmin)
  .post("/signin", controller.singinAdmin)
  .post("/confirmsignin", controller.confirmsignIn)
  .post("/signout", controller.signoutAdmin)
  .post("/accesstoken", controller.accessToken)
  .get("/all", JwtAuthGuard, SuperAdminGuard, controller.getAllAdmins)
  .get("/:id",JwtAuthGuard, AdminGuard, controller.getById)
  .patch("/:id",JwtAuthGuard, AdminGuard, controller.updateById)
  .delete("/:id",JwtAuthGuard, AdminGuard, controller.deleteById)
export {router as adminRouter};
