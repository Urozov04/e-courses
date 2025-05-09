import express from "express";
import { connectDB } from "./db/index.js";
import logger from "./utils/logger/logger.js";
import { userRouter, adminRouter, superAdminRouter, authorRouter } from "./routes/index.js";
import cookieParser from "cookie-parser";
import { categoryRouter } from "./routes/category.routes.js";
import { courseRouter } from "./routes/course.routes.js";
import { enrollmentRouter } from "./routes/enrollment.routes.js";
import { reviewRouter } from "./routes/review.routes.js";

const app = express();
await connectDB();
app.use(cookieParser());

app.use(express.json());
const PORT = +process.env.PORT;

app.use("/user", userRouter);
app.use("/admin", adminRouter)
app.use("/superadmin", superAdminRouter)
app.use("/author", authorRouter)
app.use("/category", categoryRouter)
app.use("/course", courseRouter)
app.use("/enrollment", enrollmentRouter)
app.use("/review", reviewRouter)


app.use((err, res, next) => {
  if (err) {
    return res
      .status(500)
      .json({ error: err.message || "Internal server error" });
  } else {
    return next();
  }
});

app.listen(PORT, logger.info(`Server is running on port ${PORT}`));
