import React, { useEffect, useState } from "react";
import { fetchWeaponList } from "../services/weaponService";
import { weaponMapping } from "../assets/weaponMapping";
import WeaponList from "../components/weaponList";

export default function WeaponDetails() {
    const [weapons, setWeapons] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchWeapons = async () => {
            try {
                const data = await fetchWeaponList();
                setWeapons(data);
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        fetchWeapons();
    }, []);

    if (loading) {
        return (
            <div className="h-screen flex flex-col items-center justify-center bg-gray-900 text-white">
                <div className="w-20 h-20 border-8 border-t-8 border-gray-800 border-t-blue-500 rounded-full animate-spin mb-4"></div>

                <p className="text-lg font-semibold animate-pulse">Loading, please wait...</p>
            </div>
        );
    }


    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <div>
            <div className="min-h-screen flex flex-col bg-gray-900 p-8">
                <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
                    <div className="flex flex-col items-center w-full h-full p-4">
                        <h1 className="text-4xl mb-4 font-bold text-white font-tungsten">
                            SIDEARMS</h1>
                        <WeaponList weapons={weapons} order={weaponMapping.sidearmOrder} category="EEquippableCategory::Sidearm" />
                    </div>
                    <div className="flex flex-col items-center w-full h-full p-4">
                        <h1 className="text-4xl mb-4 font-bold text-white font-tungsten">
                            SMGS</h1>
                        <WeaponList weapons={weapons} order={weaponMapping.smgOrder} category="EEquippableCategory::SMG" />
                        <h1 className="text-4xl mb-4 font-bold text-white font-tungsten mt-4">
                            SHOTGUNS</h1>
                        <WeaponList weapons={weapons} order={weaponMapping.shotgunOrder} category="EEquippableCategory::Shotgun" />
                    </div>
                    <div className="flex flex-col items-center w-full h-full p-4">
                        <h1 className="text-4xl mb-4 font-bold text-white font-tungsten">
                            RIFLES</h1>
                        <WeaponList weapons={weapons} order={weaponMapping.rifleOrder} category="EEquippableCategory::Rifle" />
                        <h1 className="text-4xl mb-4 font-bold text-white font-tungsten mt-4">
                            MELEE </h1>
                        <WeaponList weapons={weapons} order="Melee" category="EEquippableCategory::Melee" />
                    </div>
                    <div className="flex flex-col items-center w-full h-full p-4">
                        <h1 className="text-4xl mb-4 font-bold text-white font-tungsten">
                            SNIPER RIFLES</h1>
                        <WeaponList weapons={weapons} order={weaponMapping.sniperOrder} category="EEquippableCategory::Sniper" />
                        <h1 className="text-4xl mb-4 font-bold text-white font-tungsten mt-4">
                            MACHINE GUNS
                        </h1>
                        <WeaponList weapons={weapons} order={weaponMapping.heavyOrder} category="EEquippableCategory::Heavy" />
                    </div>
                </div>
            </div>
        </div>
    );
}