import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:8000/api/v1', // change to deployed backend if needed
});

// 📍 GET: Countries
export const fetchCountries = () => API.get('/locations/countries');

// 📍 GET: States by Country ID
export const fetchStates = (countryId) => API.get(`/locations/states/${countryId}`);

// 📍 GET: Cities by State ID
export const fetchCities = (stateId) => API.get(`/locations/cities/${stateId}`);

export const checkUsernameAvailability = (username) =>
  API.post('/check-username', { username });

// 📤 POST: Register User with FormData (includes file upload)
export const createUser = (data) =>
  API.post('/create-user', data, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
