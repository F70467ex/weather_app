import React, { useState } from "react";
import "./App.css";

const App = () => {
  const [selectedCity, setSelectedCity] = useState(""); // Ville par défaut avec pays
  const [weather, setWeather] = useState(null); // Données météo
  const [error, setError] = useState(null); // Gestion des erreurs

  const cities = [
    "Rabat, MA",
    "Oujda, MA",
    "Tanger, MA",
    "Kenitra, MA",
    "Casablanca, MA",
    "Marrakech, MA",
  ]; // Liste des villes avec pays

  const fetchWeather = async (city) => {
    const apiKey = process.env.REACT_APP_API_KEY || "140187a613313bfa65eef85936f4f23f";
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=fr`;

    try {
      setError(null); // Réinitialise les erreurs
      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error("Ville non trouvée. Vérifiez le nom de la ville !");
      }
      const data = await response.json();
      setWeather(data);
    } catch (error) {
      setWeather(null);
      setError(error.message);
    }
  };

  const handleCityChange = (event) => {
    const city = event.target.value;
    setSelectedCity(city);
    if (city) {
      fetchWeather(city);
    }
  };

  return (
<div className="app">
  <h1>🌤 Application Météo</h1>
  <div className="dropdown">
    <label htmlFor="city-select">Sélectionnez une ville : </label>
    <select id="city-select" onChange={handleCityChange} value={selectedCity}>
      <option value="">--Choisir une ville--</option>
      {cities.map((city) => (
        <option key={city} value={city}>
          {city.split(",")[0]}
        </option>
      ))}
    </select>
  </div>
  {error && <p className="error">⚠️ {error}</p>}
  {weather && (
    <div className="weather-info">
      <h2>{weather.name}</h2>
      <p>🌡️ Température : {weather.main.temp}°C</p>
      <p>💧 Humidité : {weather.main.humidity}%</p>
      <p>🌬️ Vent : {weather.wind.speed} m/s</p>
      <p>🌈 Description : {weather.weather[0].description}</p>
    </div>
  )}
</div>
  );
};

export default App;
