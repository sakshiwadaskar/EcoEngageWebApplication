import express from "express";
import * as eventController from '../controllers/event-controller.js';

const router = express.Router();

router.route('/')
  .get(eventController.retrieveAllEvents)
  .post(eventController.newEvent);

router.route('/:id')
  .get(eventController.searchEventById)
  .patch(eventController.updateEventById)
  .delete(eventController.deleteEventById);

router.route('/user')
  .post(eventController.getEventsByUserId);

export default router;