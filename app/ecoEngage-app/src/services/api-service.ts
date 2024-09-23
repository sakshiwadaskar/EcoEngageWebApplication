/**
  * Module for interacting with a RESTful API.
  * @module ApiService
*/

/**
  * Base URL of the server.
  * @constant
  * @type {string}
*/

const serverURL = import.meta.env.VITE_LOCAL_SERVER_URL;

/**
  * Fetches data from the API.
  * @async
  * @function getData
  * @template T - The type of data to retrieve.
  * @param {string} path - The path of the endpoint to fetch data from.
  * @param {object} [params={}] - Additional parameters for the request.
  * @returns {Promise<T[]>} A promise that resolves to an array of fetched data.
*/
export const getData = async <T>(path: string, params = {}): Promise<T[]> => {
  console.log("The params recieved in getData ", params);
  const query: URLSearchParams = new URLSearchParams(params);
  console.log(query.toString());
  const response = await fetch(`${serverURL}/${path}?${query}`, {
    method: 'GET',
  });
  return response.json();
}

/**
  * Updates data in the API.
  * @async
  * @function updateData
  * @template T - The type of data to update.
  * @param {string} path - The path of the endpoint to update data at.
  * @param {T} data - The data to update.
  * @returns {Promise<T>} A promise that resolves to the updated data.
  * @throws {Error} Throws an error if the update operation fails.
*/
export const updateData = async <T>(path: string, data: T): Promise<T> => {
  try {
    console.log("The data recieved in updateData ", path);
    const response = await fetch(`${serverURL}/${path}`, {
      method: 'PATCH', // Using PATCH method for updating
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error('Failed to update data'); // Throw an error if the response is not OK
    }

    return response.json();
  } catch (error) {
    console.error('Error updating data:', error);
    throw error; // Re-throw the error to propagate it to the caller
  }
};

/**
  * Creates new data in the API.
  * @async
  * @function newData
  * @template T - The type of data to create.
  * @param {string} path - The path of the endpoint to create data at.
  * @param {T} data - The data to create.
  * @returns {Promise<T>} A promise that resolves to the created data.
  * @throws {Error} Throws an error if the creation operation fails.
*/
export const newData = async <T>(path: string, data: T): Promise<T> => {
  try {
    const response = await fetch(`${serverURL}/${path}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error('Failed to create new data');
    }

    return response.json();
  } catch (error) {
    console.error('Error creating new data:', error);
    throw error;
  }
};

/**
  * Deletes data from the API.
  * @async
  * @function deleteData
  * @template T - The type of data to delete.
  * @param {string} path - The path of the endpoint to delete data from.
  * @returns {Promise<T>} A promise that resolves to the deleted data.
  * @throws {Error} Throws an error if the deletion operation fails.
*/
export const deleteData = async <T>(path: string): Promise<T> => {
  try {
    const response = await fetch(`${serverURL}/${path}`, {
      method: 'DELETE', // Using POST method for updating
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to delete data'); // Throw an error if the response is not OK
    }

    return response.json();
  } catch (error) {
    console.error('Error deleting data:', error);
    throw error; // Re-throw the error to propagate it to the caller
  }
};

/**
 * Sends a POST request to retrieve events by userId.
 * @param {string} userId - The userId to retrieve events for.
 * @returns {Promise<any>} A promise that resolves to the response from the server.
 */
export const getEventsByUserId = async (userId: string) => {
  try {

    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userId }), // Request payload containing userId
    };

    const response = await fetch(`${serverURL}/events/user`, requestOptions);
    if (!response.ok) {
      throw new Error('Failed to retrieve events by userId');
    }

    return response.json(); // Parse and return the response data
  } catch (error) {
    console.error('Error retrieving events by userId:', error);
    throw error;
  }
};
