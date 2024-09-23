/**
  * Module for handling CRUD operations for events.
  * @module EventService
*/

import { Event } from '../models/Event';
import { getData, updateData, newData, deleteData, getEventsByUserId } from './api-service';

/**
  * Endpoint for events in the API.
  * @constant
  * @type {string}
*/
const eventsAPI = 'events';

/**
  * Retrieves events from the API.
  * @async
  * @function retriveEvents
  * @param {object} [params={}] - Additional parameters for the request.
  * @returns {Promise<Event[]>} A promise that resolves to an array of events.
*/
export const retriveEvents = async (params = {}): Promise<Event[]> => {
  console.log(params);
  return await getData(eventsAPI, params);
}

/**
  * Updates a event in the API.
  * @async
  * @function updateEvent
  * @param {number} eventId - The ID of the event to update.
  * @param {Event} updatedEvent - The updated event object.
  * @returns {Promise<Event | null>} A promise that resolves to the updated event or null if an error occurs.
*/
export const updateEvent = async (eventId: string, updatedEvent: Event): Promise<Event | null> => {
  try {
    const response = await updateData(`${eventsAPI}/${eventId}`, updatedEvent);
    return response;
  } catch (error) {
    console.error('Error updating event:', error);
    return null;
  }
}

/**
  * Updates a event in the API.
  * @async
  * @function registerForEvent
  * @param {Event} event - The  event object.
  * @param {number} userId - the id of the user to register for the event.
  * @returns {Promise<Event | null>} A promise that resolves to the updated event or null if an error occurs.
*/
export const registerForEvent = async (event: Event, userId: string): Promise<Event | null> => {
  try {
    console.log('event id', event.id);
    const updatedEvent = { ...event, usersRegistered: [...event.usersRegistered, userId] };
    return await updateEvent(event.id, updatedEvent);
  } catch (error) {
    console.error('Error registering event:', error);
    return null;
  }
}

/**
  * Creates a new event in the API.
  * @async
  * @function newEvent
  * @param {Event} newCreatedEvent - The new event object to create.
  * @returns {Promise<Event | null>} A promise that resolves to the created event or null if an error occurs.
*/
export const newEvent = async (newCreatedEvent: Event): Promise<Event | null> => {
  try {
    const response = await newData(`${eventsAPI}`, newCreatedEvent);
    return response;
  } catch (error) {
    console.error('Error creating event:', error);
    return null;
  }
}

/**
  * Deletes a event from the API.
  * @async
  * @function deleteEvent
  * @param {number} eventId - The ID of the event to delete.
  * @returns {Promise<Event | null>} A promise that resolves to the deleted event or null if an error occurs.
*/
export const deleteEvent = async (eventId: number): Promise<Event | null> => {
  try {
    return await deleteData(`${eventsAPI}/${eventId}`);
  } catch (error) {
    console.error('Error deleting event:', error);
    return null;
  }
}


/**
 * Retrieves events for a specific user ID.
 * @param {string} userId - The ID of the user to retrieve events for.
 * @returns {Promise<Event[]>} A promise that resolves to an array of events for the user.
 */
export const getEventsForUser = async (userId: string): Promise<Event[]> => {
  try {
    // Call the getEventsByUserId function from the API service
    return await getEventsByUserId(userId);
  } catch (error) {
    console.error('Error retrieving events for user:', error);
    return [];
  }
};
