import express from "express";
import { FormController } from "../apis/controllers";

const routes = express.Router();

routes.post("/forms/list", FormController.list);
routes.post("/forms", FormController.save);

export default routes;
