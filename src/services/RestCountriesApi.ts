export interface Country {
    name: {
      common: string;
      official: string;
    };
    region: string;
    flags: {
      png: string;
    };
  }
  
  export const fetchContinents = async (): Promise<string[]> => {
    try {
      const response = await fetch('https://restcountries.com/v3.1/all');
      const data: Country[] = await response.json();
      
      const continents: string[] = [...new Set(data.map((country) => country.region))];
      
      return continents;
    } catch (error) {
      console.error('Error fetching continents:', error);
      return [];
    }
  };
  
  export const fetchCountriesByContinent = async (continent: string): Promise<Country[]> => {
    try {
      const response = await fetch(`https://restcountries.com/v3.1/region/${continent}`);
      const data: Country[] = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching countries by continent:', error);
      return [];
    }
  };
  
  export const fetchCountryDetails = async (countryName: string): Promise<Country | null> => {
    try {
      const response = await fetch(`https://restcountries.com/v3.1/name/${countryName}`);
      const data: Country[] = await response.json();
      return data[0] || null;
    } catch (error) {
      console.error('Error fetching country details:', error);
      return null;
    }
  };