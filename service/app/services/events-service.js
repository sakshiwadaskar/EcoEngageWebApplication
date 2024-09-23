import Event from '../model/event.js'

/**
  * Retrieves events from the database based on provided filters.
  * @param {string} keywords - Keywords to search for in event, name, titles, description.
  * @param {Date} startRange - Start date of the date range filter.
  * @param {Date} endRange - End date of the date range filter.
  * @returns {Promise<Array>} - A promise that resolves to an array of events matching the filter criteria.
*/
export const filterEvents_DB = async (keywords, startRange, endRange) => {
  console.log("\n++++++++++++++++++++++++++++ WE ARE IN THE SERVICE METHOD: filterEvents_DB ++++++++++++++++++++++++++++");
  console.log("Keywords passed to the method: ", keywords);
  console.log("Start Range passed to the method: ", startRange);
  console.log("End Range passed to the method: ", endRange);

  try {
    // Constructing the base query object for filtering events
    let query = {};

    // Adding keyword search conditions if keywords are provided
    if (keywords) {
      query.$or = [
        { name: { $regex: keywords, $options: 'i' } },
        { title: { $regex: keywords, $options: 'i' } },
        { description: { $regex: keywords, $options: 'i' } },
      ];
      console.log("Keyword search conditions added to the query:", query.$or);
    }

    // Adding date range conditions
    // if (startRange && endRange) {
    //   // Events within the date range
    //   query.eventStartDate = { $gte: startRange, $lte: endRange };
    //   console.log("Date range conditions added to the query:", query.eventStartDate);
    // } else if (startRange) {
    //   // Events starting from the startRange
    //   query.eventStartDate = { $gte: startRange };
    //   console.log("Only start date condition added to the query:", query.eventStartDate);
    // } else if (endRange) {
    //   // Events ending by the endRange
    //   query.eventStartDate = { $lte: endRange };
    //   console.log("Only end date condition added to the query:", query.eventStartDate);
    // }

    console.log("Final query passed to the method: ", query);
    // Executing the query to retrieve events
    const events = await Event.find(query).exec();

    console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>Back to Controller.");
    return events;
  } catch (error) {
    console.error("Error in filterEvents_DB:", error);
    throw error;
  }
}


/**
  * Adds a new event to the database.
  * @param {object} newEventData - Data of the new event to be added.
  * @returns {Promise<object>} - A promise that resolves to the added event object.
*/
export const addEvent_DB = async (newEventData) => {
  try {
    console.log("\n++++++++++++++++++++++++++++ WE ARE IN THE SERVICE METHOD: addEvent_DB ++++++++++++++++++++++++++++");
    console.log("New Event data passed to the method: ", newEventData);

    const newEvent = new Event(newEventData);
    console.log("Newly Created Event object from DB: ", newEvent);
    console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>Back to Controller.");

    return await newEvent.save();
  } catch (error) {
    console.error("Error in addEvent_DB:", error);
    throw error;
  }
}


/**
  * Updates an existing event in the database.
  * @param {string} id - ID of the event to be updated.
  * @param {object} updatedEventData - Updated data for the event.
  * @returns {Promise<object>} - A promise that resolves to the updated event object.
*/
export const updateEvent_DB = async (id, updatedEventData) => {
  try {
    console.log("\n++++++++++++++++++++++++++++ WE ARE IN THE SERVICE METHOD: updateEvent_DB ++++++++++++++++++++++++++++");
    console.log("updatedEventData passed to the method: ", id);
    console.log("updatedEventData passed to the method: ", updatedEventData);

    const updatedEvent = await Event.findByIdAndUpdate(id, updatedEventData, { new: true }).exec();
    console.log("Updated Event object from DB: ", updatedEvent);
    console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>Back to Controller.");

    return updatedEvent;
  } catch (error) {
    console.error("Error in updateEvent_DB:", error);
    throw error;
  }
}

/**
  * Deletes an event from the database.
  * @param {string} id - ID of the event to be deleted.
  * @returns {Promise<object>} - A promise that resolves to the deleted event object.
*/
export const deleteEvent_DB = async (id) => {
  try {
    console.log("\n++++++++++++++++++++++++++++ WE ARE IN THE SERVICE METHOD: deleteEvent_DB  ++++++++++++++++++++++++++++");
    console.log("Id of the Event to be deleted passed to the method: ", id);

    const deletedEvent = await Event.findByIdAndDelete(id).exec();
    console.log("Deleted Event object from DB: ", deletedEvent);
    console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>Back to Controller.");

    return deletedEvent;
  } catch (error) {
    console.error("Error in deleteEvent_DB:", error);
    throw error;
  }
}

/**
  * Retrieves a event from the database by its ID.
  * @param {string} id - ID of the event to retrieve.
  * @returns {Promise<object>} - A promise that resolves to the retrieved event object.
*/
export const getEventById_DB = async (id) => {
  console.log("\n++++++++++++++++++++++++++++ WE ARE IN THE SERVICE METHOD: getEventById_DB  ++++++++++++++++++++++++++++");
  console.log("Id of the Event to be retrived passed to the method: ", id);

  const particularEvent = await Event.findById(id).exec();
  console.log("Particule Event object from DB: ", particularEvent);
  console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>Back to Controller.");

  return particularEvent;
}

/**
 * Retrieves events from the database based on the provided userId present in usersRegistered array.
 * @param {string} userId - The userId to search for in events' usersRegistered array.
 * @returns {Promise<Array>} - A promise that resolves to an array of events with the specified userId in usersRegistered.
 */
export const getEventsByUserId_DB = async (userId) => {
  console.log("\n++++++++++++++++++++++++++++ WE ARE IN THE SERVICE METHOD: getEventsByUserId_DB ++++++++++++++++++++++++++++");
  console.log("UserId passed to the method: ", userId);

  try {
    // Constructing the query object to find events with the specified userId in usersRegistered
    const query = { usersRegistered: userId };

    console.log("Query passed to the method: ", query);
    // Executing the query to retrieve events
    const events = await Event.find(query).exec();

    console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>Back to Controller.");
    return events;
  } catch (error) {
    console.error("Error in getEventsByUserId_DB:", error);
    throw error;
  }
}
