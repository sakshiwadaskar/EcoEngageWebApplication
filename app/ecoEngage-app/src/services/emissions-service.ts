import axios from "axios";

const emissionsUrl = "https://api.v2.emissions-api.org/api/v2/";

export enum Gas {
  Methane = 'methane',
  CarbonMonoxide = 'carbonmonoxide',
  Ozone = 'ozone',
  NitrogenDioxide = 'nitrogendioxide',
}

interface GasEmissions {
  gas: Gas;
  emissionsPerSquareMeter: number; // mol/m²
}

const totalEmissions = (emissions: GasEmissions): number => {
  const surfaceAreaEarthSqMeters = 510.1e12; // Earth's surface area in square meters

  let gasMolarMass = 0;
  switch (emissions.gas) {
    case Gas.Methane:
      gasMolarMass = 16.04; // CH₄ molar mass in g/mol
      break;
    case Gas.CarbonMonoxide:
      gasMolarMass = 28.01; // CO molar mass in g/mol
      break;
    case Gas.Ozone:
      gasMolarMass = 48.00; // O₃ molar mass in g/mol
      break;
    case Gas.NitrogenDioxide:
      gasMolarMass = 46.01; // NO₂ molar mass in g/mol
      break;
    default:
      console.error('Invalid gas type.');
      return 0;
  }

  // Convert emissions from mol/m² to tonnes over Earth's surface
  const emissionsTonnes = emissions.emissionsPerSquareMeter * surfaceAreaEarthSqMeters * (gasMolarMass / 1000000);

  // Convert tonnes to million tonnes
  const emissionsMillionTonnes = emissionsTonnes / 1e6;
  return emissionsMillionTonnes;
}

// Helper function to format date to 'YYYY-MM-DD' format
function formatDate(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export const EmissionsService = {
  /**
  * Asynchronously retrieves emissions data for a specific gas type and time period.
  * @param gas - The type of gas for which emissions data is requested.
  * @param time - The time period for which emissions data is requested ('year', 'month', 'week', or 'day').
  * @returns A Promise that resolves to the total emissions in million tonnes for the specified gas and time period.
  * @throws Error if an invalid time parameter is provided or if there is an error fetching the data.
  */
  async getEmissions(gas: Gas, time: string) {
    try {
      let beginDate = new Date(); // Get current date
      let endDate = new Date();
      switch (time) {
        case 'year':
          beginDate = new Date(2023, 0, 1); // January 1st, 2023
          endDate = new Date(2023, 11, 22); // Decement 22nd, 2023
          break;
        case 'month':
          beginDate = new Date(2023, 0, 1); // January 1st, 2023
          endDate = new Date(2023, 1, 1); // February 1st, 2023
          break;
        case 'week':
          beginDate = new Date(2023, 0, 1); // January 1st, 2023
          endDate = new Date(2023, 0, 7); //  January 7th, 2023
          break;
        case 'day':
          beginDate = new Date(2023, 0, 1); // January 1st, 2023
          endDate = new Date(2023, 0, 2); //  January 2nd, 2023
          break;
        default:
          throw new Error('Invalid time parameter.');
      }

      // Format the date strings in 'YYYY-MM-DD' format
      const beginDateString = formatDate(beginDate);
      const endDateString = formatDate(endDate);

      const apiUrl = `${emissionsUrl}/${gas}/average.json?interval=day&begin=${beginDateString}&end=${endDateString}`;

      try {
        // Fetch emissions data from the API
        const response = await axios.get(apiUrl);
        const data = response.data as { average: number }[];

        // Calculate the sum of average emissions
        const sum = data.reduce((total, item) => total + item.average, 0);

        // Create GasEmissions object
        const emissionsData: GasEmissions = {
          gas: gas,
          emissionsPerSquareMeter: sum
        };

        // Calculate total emissions in million tonnes and return the result
        return totalEmissions(emissionsData);
      } catch (err) {
        console.error('Error getting emissions:', err);
        throw err;
      }
    } catch (err) {
      console.error("Error getting emissions: ", err);
      throw err;
    }
  }
}
