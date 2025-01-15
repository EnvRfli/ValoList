import { fetchWithCacheAndRetry } from "./fetchCacheRetry";

const fetchWeaponList = async () => {
    try {
        return await fetchWithCacheAndRetry("https://valorant-api.com/v1/weapons");
    } catch (error) {
        console.error("Error fetching weapon list:", error);
        return [];
    }
}

const fetchWeaponData = async (uuid) => {
    try {
        return await fetchWithCacheAndRetry(`https://valorant-api.com/v1/weapons/${uuid}`);
    } catch (error) {
        console.error("Error fetching weapon data:", error);
        return null;
    }
}

const fetchWeaponSkinList = async () => {
    try {
        return await fetchWithCacheAndRetry("https://valorant-api.com/v1/weapons/skins");
    } catch (error) {
        console.error("Error fetching weapon skin list:", error);
        return [];
    }
}

const fetchWeaponSkinData = async (uuid) => {
    try {
        return await fetchWithCacheAndRetry(`https://valorant-api.com/v1/weapons/skins/${uuid}`);
    } catch (error) {
        console.error("Error fetching weapon skin data:", error);
        return null;
    }
}

const fetchWeaponSkinChromaList = async () => {
    try {
        return await fetchWithCacheAndRetry("https://valorant-api.com/v1/weapons/skinchromas");
    } catch (error) {
        console.error("Error fetching weapon skin chroma list:", error);
        return [];
    }
}

const fetchWeaponSkinChromaData = async (uuid) => {
    try {
        return await fetchWithCacheAndRetry(`https://valorant-api.com/v1/weapons/skinchromas/${uuid}`);
    } catch (error) {
        console.error("Error fetching weapon skin chroma data:", error);
        return null;
    }
}

const fetchWeaponSkinLevelList = async () => {
    try {
        return await fetchWithCacheAndRetry("https://valorant-api.com/v1/weapons/skinlevels");
    } catch (error) {
        console.error("Error fetching weapon skin level list:", error);
        return [];
    }
}

const fetchWeaponSkinLevelData = async (uuid) => {
    try {
        return await fetchWithCacheAndRetry(`https://valorant-api.com/v1/weapons/skinlevels/${uuid}`);
    } catch (error) {
        console.error("Error fetching weapon skin level data:", error);
        return null;
    }
}

export { fetchWeaponList, fetchWeaponData, fetchWeaponSkinList, fetchWeaponSkinData, fetchWeaponSkinChromaList, fetchWeaponSkinChromaData, fetchWeaponSkinLevelList, fetchWeaponSkinLevelData };