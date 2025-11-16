export const SWAPI_BASE = "https://swapi.dev/api";


const cache = new Map();


async function cachedFetch(url) {
if (cache.has(url)) return cache.get(url);
const res = await fetch(url);
if (!res.ok) throw new Error("Network error");
const json = await res.json();
cache.set(url, json);
return json;
}


export async function fetchPeople(page = 1, search = "") {
const q = `${SWAPI_BASE}/people/?page=${page}${search ? `&search=${encodeURIComponent(search)}` : ""}`;
return cachedFetch(q);
}


export async function fetchResource(url) {
return cachedFetch(url);
}