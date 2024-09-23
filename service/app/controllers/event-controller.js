import { setResponse, setError } from './response-handler.js'
import * as eventsService from '../services/events-service.js'

/**
  * Retrieves events based on provided filters and sends the response.
  * @param {Object} request - The request object containing query parameters.
  * @param {Object} response - The response object to send back to the clien
*/
export const retrieveAllEvents = async (request, response) => {
  try {
    // Logging: Start of the controller method
    console.log("_________________________ WE ARE IN THE CONTROLLER METHOD: retrieveAllEvents ______________________");

    // Extracting query parameters from the request
    const keyword = request.query.providedKeyword;
    const startDate = request.query.startDate;
    console.log(startDate);
    const endDate = request.query.endDate;
    console.log(endDate);

    // Parsing and formatting start and end date ranges

    const formattedStartDateRange = startDate == "null" ? null : new Date(startDate);
    const formattedEndDateRange = endDate == "null" ? null : new Date(endDate);

    // Logging: Checking the type of keyword
    console.log("Checking the TypeOf Keyword: ", typeof keyword);

    // Calling the service method to retrieve events based on filters
    const foundEvents = await eventsService.filterEvents_DB(keyword, formattedStartDateRange, formattedEndDateRange);

    // Logging: Events received from the service
    // console.log("All Events received from the Events-Service: ", foundEvents);
    console.log("_______________________________________________________________________________________________________");

    // Sending the response with found events
    setResponse(foundEvents, response);
  } catch (error) {
    // Error handling: Logging and sending error response
    console.log("Catching the error from the Controller Method retrieveAllEvents: " + error);
    setError(error, response);
  }
}


/**
  * Adds a new Event to the database.
  * @param {object} request - Express request object.
  * @param {object} response - Express response object.
*/
export const newEvent = async (request, response) => {
  try {
    console.log("_________________________ WE ARE IN THE CONTROLLER METHOD: newEvent ______________________");

    const newEventData = { ...request.body };
    console.log("Checking the TypeOf newEventData: ", typeof newEventData);
    console.log("Request body spreaded as newEventData: ", newEventData);

    const newCreatedEvent = await eventsService.addEvent_DB(newEventData);
    console.log("New Event recieved from the Events-Service after newCreatedEvent: ", newCreatedEvent);
    console.log("_______________________________________________________________________________________________________");

    setResponse(newCreatedEvent, response);
  } catch (error) {
    console.log("Catching the error from the Controller Method newEvent: " + error);
    setError(error, response);
  }
}

/**
  * Updates a event by its ID in the database.
  * @param {object} request - Express request object.
  * @param {object} response - Express response object.
*/
export const updateEventById = async (request, response) => {
  try {
    console.log("_________________________ WE ARE IN THE CONTROLLER METHOD: updateEventById ______________________");

    // Check if eventId exists in the request params
    if (!request.params.id) {
      throw new Error("Event ID is missing in the request parameters.");
    }

    const id = request.params.id;
    console.log("Checking the TypeOf eventId: ", typeof id);
    console.log("Request params id as eventId: ", id);

    const data = request.body;
    console.log("Request body spreaded as data: ", data);

    const updatedEvent = await eventsService.updateEvent_DB(id, data)
    console.log("Recieved updated Event from the Events-Service after updatedEvent: ", updatedEvent);
    console.log("_______________________________________________________________________________________________________");

    setResponse(updatedEvent, response);
  } catch (error) {
    console.log("Catching the error from the Controller Method updateEventById: " + error);
    setError(error, response);
  }
}

/**
  * Deletes a event by its ID from the database.
  * @param {object} request - Express request object.
  * @param {object} response - Express response object.
*/
export const deleteEventById = async (request, response) => {
  try {
    console.log("_________________________ WE ARE IN THE CONTROLLER METHOD: deleteEventById ______________________");

    // Check if eventId exists in the request params
    if (!request.params.id) {
      throw new Error("Event ID is missing in the request parameters.");
    }

    const eventId = request.params.id;
    console.log("Checking the TypeOf eventId: ", typeof eventId);
    console.log("Request params id as eventId: ", eventId);

    const deletedEvent = await eventsService.deleteEvent_DB(eventId);
    console.log("Recieved deleted Event from the Events-Service after deletedEvent: ", deletedEvent);
    console.log("_______________________________________________________________________________________________________");

    setResponse(deletedEvent, response);
  } catch (error) {
    console.log("Catching the error from the Controller Method deleteEventById: " + error);
    setError(error, response);
  }
}

/**
  * Retrieves a event by its ID from the database.
  * @param {object} request - Express request object.
  * @param {object} response - Express response object.
*/
export const searchEventById = async (request, response) => {
  try {
    console.log("_________________________ WE ARE IN THE CONTROLLER METHOD: searchEventById ______________________");

    // Check if eventId exists in the request params
    if (!request.params.id) {
      throw new Error("Event ID is missing in the request parameters.");
    }

    const eventId = request.params.id;
    console.log("Checking the TypeOf eventId: ", typeof eventId);
    console.log("Request params id as eventId: ", eventId);

    const retrievedEvent = await eventsService.getEventById_DB(eventId)
    console.log("Recieved Event from the Events-Service after retrievedEvent: ", retrievedEvent);
    console.log("_______________________________________________________________________________________________________");

    setResponse(retrievedEvent, response);
  } catch (error) {
    console.log("Catching the error from the Controller Method searchEventById: " + error);
    setError(error, response);
  }
}


/**
 * Retrieves events by userId from the database and sends the response.
 * @param {Object} request - The request object containing userId.
 * @param {Object} response - The response object to send back to the client.
 */
export const getEventsByUserId = async (request, response) => {
  try {
    // Logging: Start of the controller method
    console.log("_________________________ WE ARE IN THE CONTROLLER METHOD: getEventsByUserId ______________________");

    // Extracting userId from the request parameters
    const { userId } = request.body;
    console.log("UserId extracted from request parameters: ", userId);

    // Calling the service method to retrieve events by userId
    const eventsWithUserId = await eventsService.getEventsByUserId_DB(userId);

    // Logging: Events received from the service
    console.log("Events with specified userId received from the Events-Service: ", eventsWithUserId);
    console.log("_______________________________________________________________________________________________________");

    // Sending the response with events having the specified userId
    setResponse(eventsWithUserId, response);
  } catch (error) {
    // Error handling: Logging and sending error response
    console.log("Catching the error from the Controller Method getEventsByUserId: " + error);
    setError(error, response);
  }
}