
import { getWeather } from './api.js';
import { getFromCache, saveToCache } from './cache.js';

const city = process.argv[2];

if (!city) {
  console.log('Please provide a city name. Example: node index.js "city name"');
  process.exit(1);
}

try {
  const cached = await getFromCache(city);
  const weather = cached || await getWeather(city);

  if (!cached) {
    await saveToCache(city, weather);
  }

  console.log(`**Weather in ${city}:`);
  console.log(`**Temperature: ${weather.temperature}°C`);
  console.log(`**Condition: ${weather.condition}`);
  console.log(`**Wind Speed: ${weather.wind} m/s`);
} catch (err) {
  console.error(`Error: ${err.message}`);
}
