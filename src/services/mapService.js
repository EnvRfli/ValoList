import { fetchWithCacheAndRetry } from './fetchCacheRetry';

const fetchMapList = async () => {
    try {
        return await fetchWithCacheAndRetry("https://valorant-api.com/v1/maps");
    } catch (error) {
        console.error("Error fetching map list:", error);
        return [];
    }
}

const fetchMapData = async (uuid) => {
    try {
        return await fetchWithCacheAndRetry(`https://valorant-api.com/v1/maps/${uuid}`);
    } catch (error) {
        console.error("Error fetching map data:", error);
        return null;
    }
}

export { fetchMapList, fetchMapData };