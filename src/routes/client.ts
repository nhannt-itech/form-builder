import express from "express";
import { FormController } from "../apis/controllers";
import { FormValidator } from "../middleware/validators";

const routes = express.Router();

routes.post("/forms/list", FormController.list);
routes.post("/forms", FormValidator.save, FormController.save);

export default routes;
