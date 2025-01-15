import React, { useEffect, useState } from "react";
import { fetchWeaponData, fetchWeaponList } from "../services/weaponService";
import { useParams } from "react-router-dom";
import { div } from "framer-motion/client";

export default function WeaponSkinDetails() {
    const { uuid, skinUuid } = useParams();
    const [skinData, setSkinData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedIndex, setSelectedIndex] = useState(skinUuid);
    const [themeUuid, setThemeUuid] = useState([]);


    useEffect(() => {
        const fetchWeapon = async () => {
            try {
                setLoading(true);
                const data = await fetchWeaponData(uuid);
                const matchingSkin = data.skins.find((skin) => skin.uuid === skinUuid);
                setSkinData(matchingSkin);
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };
        fetchWeapon();
    }, [uuid, skinUuid]);

    useEffect(() => {
        if (!skinData?.themeUuid) return;

        const fetchTheme = async () => {
            try {
                setLoading(true);
                const data = await fetchWeaponList();

                const filteredData = data
                    .filter((item) =>
                        item.skins.some((skin) => skin.themeUuid === skinData.themeUuid)
                    )
                    .map((item) => ({
                        ...item,
                        skins: item.skins.find((skin) => skin.themeUuid === skinData.themeUuid),
                    }));

                setThemeUuid(filteredData);
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };
        fetchTheme();
    }, [skinData?.themeUuid]);

    console.log(themeUuid);

    useEffect(() => {
        if (skinData.levels?.length > 0) {
            setSelectedIndex(skinData.levels[0].uuid);
        }
    }, [skinData.levels]);



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
        <div className="min-h-screen bg-gray-900 p-8">
            <div className="w-full h-full">
                <div className="flex flex-col items-center w-full h-full p-4">
                    <img
                        src={skinData.displayIcon}
                        alt={skinData.displayName}
                        className="w-1/2 h-auto"
                    />
                </div>
                <h1 className="text-4xl mb-4 font-bold text-white text-center uppercase">
                    {skinData.displayName}
                </h1>
                <div className="flex flex-col w-full h-full p-4">
                    <div className="w-full h-full">
                        <div className="w-full mx-auto mt-10">
                            <div className="relative flex justify-between items-center">
                                {skinData.levels.map((level, index) => (
                                    <button
                                        key={level.uuid}
                                        className={`flex-1 flex justify-center px-4 py-2 text-gray-600 ${selectedIndex === level.uuid
                                            ? "text-blue-500 font-bold"
                                            : "text-gray-500 hover:font-bold"
                                            }`}
                                        onClick={() => setSelectedIndex(level.uuid)}
                                    >
                                        {level.displayName}
                                    </button>
                                ))}
                                <div
                                    className="absolute bottom-0 h-[2px] bg-blue-500 transition-all duration-300"
                                    style={{
                                        width: `${100 / skinData.levels.length}%`,
                                        transform: `translateX(${skinData.levels.findIndex((level) => level.uuid === selectedIndex) * 100
                                            }%)`,
                                    }}
                                />
                            </div>
                            <div className="mt-6">
                                {skinData.levels
                                    .filter((level) => level.uuid === selectedIndex)
                                    .map((level) => (
                                        level.streamedVideo && (
                                            <video
                                                key={level.uuid}
                                                src={level.streamedVideo}
                                                controls
                                                autoPlay
                                                className="w-full lg:w-3/4 rounded-lg shadow-md mx-auto"
                                            />
                                        ) || (
                                            <div className="w-full lg:w-3/4 mx-auto justify-center items-center flex h-96 bg-gray-800 rounded-lg shadow-md">
                                                <p className="text-white text-center">No Video Preview Available</p>
                                            </div>

                                        )

                                    ))}
                            </div>
                        </div>
                    </div>
                </div>
                <h1 className="text-2xl text-white my-4 mx-4">
                    Other Skins in this Theme
                </h1>
                <div className="w-full h-full grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 mt-4 p-4">
                    {
                        themeUuid.map((theme) => (
                            theme.uuid !== uuid &&
                            <a href={`/weapon-skins/${theme.uuid}/${theme.skins.uuid}`} key={theme.uuid}>
                                <div className="flex flex-col w-full border border-white-200 h-36 px-4 py-6 relative mb-4 cursor-pointer hover:bg-gray-800 transition-colors duration-200">
                                    <img
                                        src={theme.skins.displayIcon}
                                        alt={theme.skins.displayName}
                                        className="h-full w-full object-contain"
                                    />
                                    <p className="text-white text-center">{theme.displayName}</p>
                                </div>
                            </a>
                        ))
                    }
                </div>
            </div>
        </div>
    );
}