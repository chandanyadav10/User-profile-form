import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Step3 = ({ formData, setFormData, errors, setErrors }) => {
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8000/api/locations/countries')
      .then(res => setCountries(res.data))
      .catch(err => console.error('Error fetching countries:', err));
  }, []);

  const handleCountryChange = (e) => {
    const country = e.target.value;
    setFormData(prev => ({ ...prev, country, state: '', city: '' }));
    setStates([]);
    setCities([]);

    axios.get(`http://localhost:8000/api/locations/states/${country}`)
      .then(res => setStates(res.data))
      .catch(err => console.error('Error fetching states:', err));
  };

  const handleStateChange = (e) => {
    const state = e.target.value;
    setFormData(prev => ({ ...prev, state, city: '' }));
    setCities([]);

    axios.get(`http://localhost:8000/api/locations/cities/${formData.country}/${state}`)
      .then(res => setCities(res.data))
      .catch(err => console.error('Error fetching cities:', err));
  };

  const handleCityChange = (e) => {
    const city = e.target.value;
    setFormData(prev => ({ ...prev, city }));
  };

  return (
    <div className="flex flex-col justify-center items-center w-screen h-screen bg-gray-300">
      <div className='flex flex-col justify-center items-center px-8 pb-8 pt-6 bg-gray-50'>
        <h1 className="text-2xl text-blue-500 font-bold mb-4">Preferences 1</h1>
        <div className='w-[500px] h-[300px] bg-gray-200 border-1 border-gray-400 rounded-sm'>
          {/* Country */}
          <div className="flex flex-col mb-4 mt-10 mx-4">
            <label className="font-medium">Country</label>
            <select
              onChange={handleCountryChange}
              value={formData.country}
              className="border rounded w-full px-3 py-2"
            >
              <option value="">Select Country</option>
              {countries.map((c, idx) => <option key={idx} value={c.name}>{c.name}</option>)}
            </select>
          </div>

          {/* State */}
          {states.length > 0 && (
            <div className="flex flex-col mb-4 mt-4 mx-4">
              <label className="font-medium">State</label>
              <select
                onChange={handleStateChange}
                value={formData.state}
                className="border rounded w-full px-3 py-2"
              >
                <option value="">Select State</option>
                {states.map((s, idx) => <option key={idx} value={s.name}>{s.name}</option>)}
              </select>
            </div>
          )}

          {/* City */}
          {cities.length > 0 && (
            <div className="flex flex-col mb-4 mt-4 mx-4">
              <label className="font-medium">City</label>
              <select
                name="city"
                value={formData.city}
                onChange={handleCityChange}
                className="border rounded w-full px-3 py-2"
              >
                <option value="">Select City</option>
                {cities.map((city, idx) => <option key={idx} value={city}>{city}</option>)}
              </select>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};


export default Step3;
