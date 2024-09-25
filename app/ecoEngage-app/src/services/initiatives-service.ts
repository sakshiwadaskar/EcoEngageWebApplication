import { BASE_URL } from "./auth-service"
const API_URL = import.meta.env.VITE_BACKEND_SERVER_URL;

export const InitiativeService = {
  async getInitiatives() {
    try {
      const response = await fetch(`${API_URL}/initiatives`, {
        method: 'GET',
      });

      const data = await response.json();
      return data;
    } catch (err) {
      console.error("Error fetching initiatives:", err);
      throw err;
    }
  }
};
