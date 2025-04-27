import { usaStatesAndCitiesData } from "./demo-data";

// Helper function to create slug from state name
function createStateSlug(stateName: string): string {
  return stateName.toLowerCase().replace(/\s+/g, '-');
}

// Get all state slugs for dynamic routes
export function getAllStateRoutes() {
  return usaStatesAndCitiesData.states.map(state => ({
    params: { state: createStateSlug(state.name) }
  }));
}

// Get all city slugs for dynamic routes
export function getAllCityRoutes() {
  const routes: { params: { state: string; city: string } }[] = [];
  
  usaStatesAndCitiesData.states.forEach(state => {
    state.cities.forEach(city => {
      routes.push({
        params: {
          state: createStateSlug(state.name),
          city: city.slug.toLowerCase()
        }
      });
    });
  });
  
  return routes;
}

// Get state name from slug
export function getStateNameFromSlug(stateSlug: string): string {
  const state = usaStatesAndCitiesData.states.find(
    state => createStateSlug(state.name) === stateSlug.toLowerCase()
  );
  
  return state ? state.name : "";
}

// Get state abbreviation from slug
export function getStateAbbreviationFromSlug(stateSlug: string): string {
  const state = usaStatesAndCitiesData.states.find(
    state => createStateSlug(state.name) === stateSlug.toLowerCase()
  );
  
  return state ? state.abbreviation : "";
}

// Get city name from slug
export function getCityNameFromSlug(stateSlug: string, citySlug: string): string {
  const state = usaStatesAndCitiesData.states.find(
    state => createStateSlug(state.name) === stateSlug.toLowerCase()
  );
  
  if (!state) return "";
  
  const city = state.cities.find(
    city => city.slug.toLowerCase() === citySlug.toLowerCase()
  );
  
  return city ? city.name : "";
}

// Get all states with cities for display
export function getAllStatesWithCities() {
  return usaStatesAndCitiesData.states.map(state => ({
    name: state.name,
    slug: createStateSlug(state.name),
    abbreviation: state.abbreviation,
    cities: state.cities.map(city => ({
      name: city.name,
      slug: city.slug.toLowerCase()
    }))
  }));
}

// Generate URL for state page
export function getStateUrl(stateSlug: string): string {
  return `/us/escorts/${stateSlug}`;
}

// Generate URL for city page
export function getCityUrl(stateSlug: string, citySlug: string): string {
  return `/us/escorts/${stateSlug}/${citySlug}`;
}

/**
 * Generate a URL for an ad using the new format: /ad/{title}/?={id}
 */
export const getAdUrl = (title: string, id: number): string => {
  const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  return `/ad/${slug}/?=${id}`;
};
