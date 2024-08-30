import { Router } from "express";
import measureRoutes from "./measureRoutes";

const router = Router();

router.use("/", measureRoutes);

export default router;
