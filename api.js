import fetch from 'node-fetch';
import dotenv from 'dotenv';

dotenv.config();

export async function getWeather(city) {
  const apiKey = process.env.API_KEY;
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${apiKey}&units=metric`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`City "${city}" not found`);
  }

  const data = await response.json();
  return {
    temperature: data.main.temp,
    condition: data.weather[0].main,
    wind: data.wind.speed
  };
}
