# Skluva

*Automatically synced with your [v0.dev](https://v0.dev) deployments*

[![Deployed on Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black?style=for-the-badge&logo=vercel)](https://vercel.com/threeatomss-projects/v0-skluva)
[![Built with v0](https://img.shields.io/badge/Built%20with-v0.dev-black?style=for-the-badge)](https://v0.dev/chat/projects/W7rujNUHMhi)

## Overview

This repository will stay in sync with your deployed chats on [v0.dev](https://v0.dev).
Any changes you make to your deployed app will be automatically pushed to this repository from [v0.dev](https://v0.dev).

## Deployment

Your project is live at:

**[https://vercel.com/threeatomss-projects/v0-skluva](https://vercel.com/threeatomss-projects/v0-skluva)**

## Build your app

Continue building your app on:

**[https://v0.dev/chat/projects/W7rujNUHMhi](https://v0.dev/chat/projects/W7rujNUHMhi)**

## How It Works

1. Create and modify your project using [v0.dev](https://v0.dev)
2. Deploy your chats from the v0 interface
3. Changes are automatically pushed to this repository
4. Vercel deploys the latest version from this repository

# Escort Directory Demo Data

This repository contains demo data for an escort directory application, including:

- USA states and cities data
- Sample escort listings with detailed profiles
- Search and filtering functions

## Data Structure

### States and Cities

The `lib/demo-data.ts` file contains a structured JSON representation of USA states and cities:

```typescript
export const usaStatesAndCitiesData = {
  "states": [
    {
      "name": "California",
      "abbreviation": "CA",
      "cities": [
        { "name": "Los Angeles", "slug": "los-angeles" },
        { "name": "San Francisco", "slug": "san-francisco" },
        // more cities...
      ]
    },
    // more states...
  ]
};
```

### Escort Listings

The same file contains sample escort listings with realistic profile details:

```typescript
export const demoListings: EscortListing[] = [
  {
    id: 1,
    title: "HIGH PROFILE SERVICE AVAILABLE IN LA",
    description: "Genuine Escorts Services...",
    age: 21,
    location: "Los Angeles / Beverly Hills",
    price: 150,
    // more attributes...
  },
  // more listings...
];
```

## Helper Functions

Several utility functions are provided to work with the data:

### State and City Functions

```typescript
// Get a list of all states
const states = getStates();

// Get cities for a specific state
const californiaCities = getCitiesByStateCode("CA");

// Get a flat list of all cities with state info
const allCities = getAllCities();
```

### Search and Filtering Functions

```typescript
// Filter listings with various criteria
const results = getFilteredListings({
  query: "premium",
  state: "CA",
  city: "los-angeles",
  ethnicity: ["Caucasian", "Asian"],
  services: ["Massage", "Outcall"],
  minAge: 21,
  maxAge: 30,
  minPrice: 100,
  maxPrice: 300
});
```

## Using in Search Components

The data is designed to work with the search components in the application:

1. Import the functions from the data files
2. Use them to retrieve and filter data based on user input
3. Display the results in listing cards

Example:

```typescript
import { getFilteredListings } from "./lib/demo-data";

// Use in a search component
const searchResults = getFilteredListings({
  query: searchText,
  state: selectedState,
  city: selectedCity,
  // Add other filters as needed
});

// Render the results
return (
  <div>
    {searchResults.map(listing => (
      <ListingCard key={listing.id} listing={listing} />
    ))}
  </div>
);
```

## License

This demo data is for educational purposes only.