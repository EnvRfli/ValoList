const cache = new Map();

const fetchWithCacheAndRetry = async (url, retries = 3, delay = 5000) => {
    if (cache.has(url)) {
        console.log("Serving from cache:", url);
        return cache.get(url);
    }

    for (let i = 0; i < retries; i++) {
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`Request failed: ${response.statusText}`);
            }

            const data = await response.json();
            // Save response to cache
            cache.set(url, data.data);
            return data.data;
        } catch (error) {
            if (i < retries - 1) {
                console.log(`Retrying... (${i + 1})`);
                await new Promise((resolve) => setTimeout(resolve, delay));
            } else {
                console.error("Max retries reached for:", url);
                throw error;
            }
        }
    }
};

export { fetchWithCacheAndRetry };