import { Router } from "express";
import { UserController } from "../controller/user.controller.js";
import { JwtAuthGuard } from "../middleware/jwt-auth.guard.js";
import { AuthorGuard } from "../middleware/author.guard.js"

const router = Router();
const controller = new UserController();

router
  .post("/create", controller.createAuthor)
  .post("/signin", controller.singinAdmin)
  .post("/confirmsignin", controller.confirmsignIn)
  .post("/signout", controller.signoutAdmin)
  .post("/accesstoken", controller.accessToken)
  .get("/all", controller.getAllAuthors)
  .get("/:id", controller.getById)
  .patch("/:id", JwtAuthGuard, AuthorGuard, controller.updateById)
  .delete("/:id", JwtAuthGuard, AuthorGuard, controller.deleteById)

export { router as authorRouter };
