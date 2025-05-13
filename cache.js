import fs from 'fs/promises';

const CACHE_FILE = './weatherCache.json';
const CACHE_TTL = 10 * 60 * 1000; 

export async function getFromCache(city) {
  try {
    const content = await fs.readFile(CACHE_FILE, 'utf-8');
    const cache = JSON.parse(content);
    const cached = cache[city.toLowerCase()];

    if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
      return cached.data;
    }

    return null;
  } catch {
    return null;
  }
}

export async function saveToCache(city, data) {
  let cache = {};
  try {
    const content = await fs.readFile(CACHE_FILE, 'utf-8');
    cache = JSON.parse(content);
  } catch {
    cache = {};
  }

  cache[city.toLowerCase()] = {
    timestamp: Date.now(),
    data
  };

  await fs.writeFile(CACHE_FILE, JSON.stringify(cache, null, 2));
}
