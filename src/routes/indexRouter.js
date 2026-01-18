import { Router } from "express";
import { renderIndexPage } from "../controllers/indexComtroller.js";

const indexRouter = Router();

indexRouter.get("/", renderIndexPage);

export default indexRouter;
