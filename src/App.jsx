import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);

  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState("");

  useEffect(() => {
    fetchCountries();
  }, []);

  const fetchCountries = async () => {
    try {
      const res = await axios.get(
        "https://location-selector.labs.crio.do/countries",
      );

      setCountries(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (!selectedCountry) return;

    fetchStates(selectedCountry);
  }, [selectedCountry]);

  const fetchStates = async (country) => {
    try {
      const res = await axios.get(
        `https://location-selector.labs.crio.do/country=${country}/states`,
      );

      setStates(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (!selectedCountry || !selectedState) return;

    fetchCities(selectedCountry, selectedState);
  }, [selectedState]);

  const fetchCities = async (country, state) => {
    try {
      const res = await axios.get(
        `https://location-selector.labs.crio.do/country=${country}/state=${state}/cities`,
      );

      setCities(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleCountryChange = (e) => {
    const country = e.target.value;

    setSelectedCountry(country);

    setSelectedState("");
    setSelectedCity("");
    setStates([]);
    setCities([]);
  };

  const handleStateChange = (e) => {
    const state = e.target.value;

    setSelectedState(state);

    setSelectedCity("");
    setCities([]);
  };

  const handleCityChange = (e) => {
    setSelectedCity(e.target.value);
  };

  return (
    <div
      style={{
        textAlign: "center",
        marginTop: "60px",
      }}
    >
      <h1>Select Location</h1>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "15px",
          marginTop: "20px",
        }}
      >
        {/* Country Dropdown */}
        <select value={selectedCountry} onChange={handleCountryChange}>
          <option value="">Select Country</option>

          {countries.map((country) => (
            <option key={country} value={country}>
              {country}
            </option>
          ))}
        </select>

        {/* State Dropdown */}
        <select
          value={selectedState}
          onChange={handleStateChange}
          disabled={!selectedCountry}
        >
          <option value="">Select State</option>

          {states.map((state) => (
            <option key={state} value={state}>
              {state}
            </option>
          ))}
        </select>

        {/* City Dropdown */}
        <select
          value={selectedCity}
          onChange={handleCityChange}
          disabled={!selectedState}
        >
          <option value="">Select City</option>

          {cities.map((city) => (
            <option key={city} value={city}>
              {city}
            </option>
          ))}
        </select>
      </div>

      {selectedCountry && selectedState && selectedCity && (
        <h2 style={{ marginTop: "30px" }}>
          <strong>You selected {selectedCity}</strong>, {selectedState},{" "}
          {selectedCountry}
        </h2>
      )}
    </div>
  );
}

export default App;
