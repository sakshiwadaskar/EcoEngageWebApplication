import Initiative from "../model/initiative.js";

/**
 * Retrieves all initiatives from the database.
 * @param {Array} initiatives - The array of initiatives.
 * @returns {Promise<Array>} - A promise that resolves to an array of initiatives.
 */

export const getInitiatives = async (initiatives) => {
    try {
        return await Initiative.find({});
    } catch (err) {
        console.log(err);
    }
}