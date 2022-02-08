import express from "express";
import FormController from "../apis/controllers/form";

const formController = new FormController();
const routes = express.Router();

routes.post("/forms/list", formController.list);
routes.post("/forms", formController.save);
routes.put("/forms", formController.update);

export default routes;
