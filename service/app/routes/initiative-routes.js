import express from 'express';
import * as initiativesController from "../controllers/initiative-controller.js"

const initiativesRouter = express.Router();

initiativesRouter.route('/')
    .get(initiativesController.getAllInitiatives);

export default initiativesRouter;