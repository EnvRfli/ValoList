import { fetchWithCacheAndRetry } from "./fetchCacheRetry";

const fetchAgentList = async () => {
    try {
        return await fetchWithCacheAndRetry("https://valorant-api.com/v1/agents");
    } catch (error) {
        console.error("Error fetching agent list:", error);
        return [];
    }
}

const fetchAgentData = async (uuid) => {
    try {
        return await fetchWithCacheAndRetry(`https://valorant-api.com/v1/agents/${uuid}`);
    } catch (error) {
        console.error("Error fetching agent data:", error);
        return null;
    }
}

export { fetchAgentList, fetchAgentData };

