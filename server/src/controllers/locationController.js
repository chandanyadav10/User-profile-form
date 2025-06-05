import axios from 'axios';

// Get list of countries from external API
export const getCountries = async (req, res) => {
  try {
    const response = await axios.get('https://countriesnow.space/api/v0.1/countries/positions');
    // data.data is an array of countries (with name, iso2, etc)
    const countries = response.data.data.map(country => ({ name: country.name }));
    res.json(countries);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch countries', error: error.message });
  }
};

// Get states by country name
export const getStates = async (req, res) => {
  try {
    const { countryName } = req.params;
    const response = await axios.post('https://countriesnow.space/api/v0.1/countries/states', {
      country: countryName
    });
    if (response.data.error) {
      return res.status(404).json({ message: 'Country not found' });
    }
    // data.data.states is an array of state objects {name: "..."}
    const states = response.data.data.states.map(state => ({ name: state.name }));
    res.json(states);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch states', error: error.message });
  }
};

// Get cities by country and state name
export const getCities = async (req, res) => {
  try {
    const { countryName, stateName } = req.params;
    const response = await axios.post('https://countriesnow.space/api/v0.1/countries/state/cities', {
      country: countryName,
      state: stateName
    });
    if (response.data.error) {
      return res.status(404).json({ message: 'State or Country not found' });
    }
    // data.data is an array of city names
    const cities = response.data.data;
    res.json(cities);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch cities', error: error.message });
  }
};
