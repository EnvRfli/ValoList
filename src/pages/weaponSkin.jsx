import React, { useState, useEffect } from "react";
import { fetchWeaponData } from "../services/weaponService";
import { useParams } from "react-router-dom";
import WeaponCardStats from "../components/weaponStatCard";
import { div } from "framer-motion/client";

export default function WeaponSkin() {
    const { uuid } = useParams();
    const [weaponList, setWeaponList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchWeapon = async () => {
            try {
                const data = await fetchWeaponData(uuid);
                setWeaponList(data);
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        fetchWeapon();
    }, [uuid]);

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
        <div className="min-h-screen flex flex-col bg-gray-900 p-8">
            <div className="w-full h-full">
                <div className="flex flex-col items-center w-full h-full p-4">
                    <img
                        src={weaponList.displayIcon}
                        alt={weaponList.displayName}
                        className="w-1/2 h-auto"
                    />
                </div>
                <div className="flex flex-col w-full h-full p-4">
                    <h1 className="text-4xl mb-4 font-bold text-white text-center uppercase">
                        {weaponList.displayName}
                    </h1>
                    <h1 className="text-2xl text-white">
                        Weapon Statistics
                    </h1>
                    {weaponList.weaponStats?.adsStats && (
                        <div className="w-full h-full">
                            <div className="w-full h-full grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 mt-4">
                                <WeaponCardStats title="FIRE RATE" value={weaponList.weaponStats?.fireRate} unit="RDS/SEC" />
                                <WeaponCardStats title="RUN SPEED" value={weaponList.weaponStats?.runSpeedMultiplier} unit="M/SEC" />
                                <WeaponCardStats title="MAGAZINE SIZE" value={weaponList.weaponStats?.magazineSize} unit="RDS" />
                                <WeaponCardStats title="EQUIP SPEED" value={weaponList.weaponStats?.equipTimeSeconds} unit="SEC" />
                                <WeaponCardStats title="RELOAD SPEED" value={weaponList.weaponStats?.reloadTimeSeconds} unit="SEC" />
                                <WeaponCardStats
                                    title="FIRST BULLET SPEED"
                                    value={`${weaponList.weaponStats?.firstBulletAccuracy} / ${weaponList.weaponStats?.adsStats?.firstBulletAccuracy ?? "-"}`}
                                    unit="M/SEC"
                                />

                            </div>
                            <div className="w-full h-full grid grid-cols-1 lg:grid-cols-2 gap-4 mt-4">
                                <div className="w-full h-full flex border-2 border-gray-500">
                                    <div className="">
                                        <div className="bg-gray-800 w-auto p-2">
                                            <p className="text-white font-bold text-center">DAMAGE</p>
                                        </div>
                                        <div className="p-2">
                                            <p className="text-white text-center">HEAD</p>
                                        </div>
                                        <div className="p-2">
                                            <p className="text-white text-center">BODY</p>
                                        </div>
                                        <div className="p-2">
                                            <p className="text-white text-center">LEGS</p>
                                        </div>
                                    </div>
                                    {weaponList.weaponStats
                                        ?.damageRanges.map((damage) => (
                                            <div key={damage.rangeStartMeters} className="w-full h-full border-l-2 border-gray-500">
                                                <div className="bg-gray-800 w-auto p-2">
                                                    <p className="text-white font-bold text-center">{`${damage.rangeStartMeters}-${damage.rangeEndMeters}`}M</p>
                                                </div>
                                                <div className="p-2">
                                                    <p className="text-white text-center">{damage.headDamage}</p>
                                                </div>
                                                <div className="p-2">
                                                    <p className="text-white text-center">{damage.bodyDamage}</p>
                                                </div>
                                                <div className="p-2">
                                                    <p className="text-white text-center">{damage.legDamage}</p>
                                                </div>
                                            </div>
                                        ))}
                                </div>
                                <div className="w-full h-full border-2 border-gray-500">
                                    <div className="bg-gray-800 w-full h-auto p-2">
                                        <p className="text-white font-bold text-center">OTHER INFORMATION</p>
                                    </div>
                                    <div className="w-full h-full items-center justify-center p-2">
                                        <div className="flex items-center justify-center">
                                            <p className="text-white text-center mr-2">PRICE : </p>
                                            <img src="https://media.valorant-api.com/currencies/e59aa87c-4cbf-517a-5983-6e81511be9b7/displayicon.png"
                                                alt="" className="w-5 h-5 mr-1" />
                                            <p className="text-white text-center">{weaponList.shopData?.cost}</p>
                                        </div>
                                        <p className="text-white text-center p-2">TYPE : {weaponList.shopData?.category}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) || (
                            <div className="w-full h-48 flex items-center justify-center bg-gray-800 rounded-lg shadow-md">
                                <p className="text-white text-center">No Stats Available</p>
                            </div>
                        )
                    }
                    <h1 className="text-2xl text-white my-4">
                        Weapon Skins
                    </h1>
                    <div className="w-full h-full grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 mt-4">
                        {weaponList.skins.map((skin) => (
                            skin.displayIcon && skin.contentTierUuid &&
                            <a href={`/weapon-skins/${uuid}/${skin.uuid}`} key={skin.uuid}>
                                <div className="flex flex-col w-full bg-transparent rounded-md h-40 px-4 py-6 relative cursor-pointer hover:bg-gray-800 transition-colors duration-200">
                                    <img
                                        src={skin.displayIcon}
                                        alt={skin.displayName}
                                        className="w-full h-full object-contain"
                                    />
                                    <p className="text-white text-center">{skin.displayName}</p>
                                </div>
                            </a>
                        ))}
                    </div>
                </div>

            </div>
        </div >
    )
}