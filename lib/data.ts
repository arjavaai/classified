// USA States and Cities data for search interface
import { usaStatesAndCitiesData, getStates as getDemoStates, getCitiesByStateCode } from "./demo-data";

export interface State {
  name: string;
  abbreviation: string;
  cities: City[];
}

export interface City {
  name: string;
  slug: string;
}

// Convert the demo data to match our existing data structure
export const usaStatesAndCities: State[] = usaStatesAndCitiesData.states.map(state => ({
  name: state.name,
  abbreviation: state.abbreviation,
  cities: state.cities
}));

// Function to get all cities as a flat array
export const getAllCities = (): City[] => {
  return usaStatesAndCities.flatMap(state => state.cities);
};

// Function to get cities by state abbreviation
export const getCitiesByState = (stateAbbreviation: string): City[] => {
  return getCitiesByStateCode(stateAbbreviation);
};

// Function to get state by abbreviation
export const getStateByAbbreviation = (abbreviation: string): State | undefined => {
  return usaStatesAndCities.find(
    (state) => state.abbreviation.toLowerCase() === abbreviation.toLowerCase()
  );
};

// Function to get state by name
export const getStateByName = (name: string): State | undefined => {
  return usaStatesAndCities.find(
    (state) => state.name.toLowerCase() === name.toLowerCase()
  );
}; 