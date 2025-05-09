import { Router } from "express";
import { UserController } from "../controller/user.controller.js";
import { JwtAuthGuard } from "../middleware/jwt-auth.guard.js";
import { SuperAdminGuard } from "../middleware/super-admin.guard.js";

const router = Router();
const controller = new UserController();

router
  .post("/create", controller.createSuperAdmin)
  .post("/signin", controller.singinAdmin)
  .post("/confirmsignin", controller.confirmsignIn)
  .post("/accesstoken", controller.accessToken)
  .post("/signout", controller.signoutAdmin)
  .get("/:id", JwtAuthGuard, SuperAdminGuard, controller.getById)
  .patch("/:id",JwtAuthGuard, SuperAdminGuard, controller.updateById)
  .delete("/:id",JwtAuthGuard, SuperAdminGuard, controller.deleteById);

export { router as superAdminRouter };
