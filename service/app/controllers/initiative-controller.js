import { getInitiatives } from "../services/initiative-service.js";
import { setError, setResponse } from "./response-handler.js"

/**
 * Retrieves all initiatives.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Promise<void>} - A promise that resolves when all initiatives are retrieved.
 */
export const getAllInitiatives = async (req, res) => {
    try {
        const initiatives = await getInitiatives();
        setResponse(initiatives, res);
    } catch (err) {
        setError(err, res);
        console.log(err);
    }
}