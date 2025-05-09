import { Router } from "express";
import { UserController } from "../controller/user.controller.js";

const router = Router();
const controller = new UserController();

router
  .post("/create", controller.createSuperAdmin)
  .post("/signin", controller.singinAdmin)
  .post("/confirmsignin", controller.confirmsignIn)
  .post("/signout", controller.signoutAdmin)
  .get("/:id", controller.getById)
  .get("/accesstoken", controller.accessToken)
  .patch("/:id", controller.updateById)
  .delete("/:id", controller.deleteById);

export { router as superAdminRouter };
