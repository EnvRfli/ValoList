import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchMapData, fetchMapList } from "../services/mapService";
import { a, span } from "framer-motion/client";

export default function MapDetails() {
    const id = useParams().uuid;
    const [map, setMap] = useState(null);
    const [mapList, setMapList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchMap = async () => {
            try {
                const data = await fetchMapData(id);
                setMap(data);
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        fetchMap();
    }, [id]);

    useEffect(() => {
        const fetchMaps = async () => {
            const data = await fetchMapList();
            setMapList(data);
        };

        fetchMaps();
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
            <div
                className="min-h-screen relative"
                style={{
                    background: `url(${map.splash})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}
            >
                <div
                    className="absolute inset-0"
                    style={{
                        background: 'rgba(0, 0, 0, 0.75)', // Overlay warna gelap
                    }}
                />
                <div className="relative text-white p-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div className="bg-transparent">
                        <img src={map.displayIcon} alt={`${map.displayName} splash`} className="w-full rounded-lg opacity-50" />
                    </div>
                    <div>
                        <h1 className="text-4xl font-bold">{map.displayName}</h1>
                        <p className="text-lg my-5">{map.coordinates}</p>
                        <p className="text-lg">{map.tacticalDescription} Format</p>
                        <div className="bg-transparent">
                            <h2 className="text-2xl font-bold mt-4">Callouts</h2>
                            <div className="tags flex flex-wrap gap-2 mt-4">
                                {map.callouts.map((callout) => (
                                    <span key={callout.regionName} className="text-white bg-gray-800 px-2 py-1 rounded">
                                        {callout.regionName}</span>
                                ))}

                            </div>
                        </div>
                    </div>

                </div>

            </div>
            <div className="bg-gray-900 p-8">
                <h1 className="text-4xl font-bold text-white text-center w-full mb-4">Other Maps</h1>
                <div className="flex grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4">
                    {mapList.map((map) => (
                        map.tacticalDescription && map.uuid !== id &&
                        <a href={`/maps/${map.uuid}`}>
                            <div key={map.uuid} className="bg-gray-800 p-4 rounded-lg hover:bg-gray-700 transition-colors duration-200 cursor-pointer">
                                <img src={map.displayIcon} alt={map.displayName} className="w-full rounded-lg" />
                                <h2 className="text-lg font-bold text-white mt-2">{map.displayName}</h2>

                            </div>
                        </a>
                    ))}
                </div>
            </div>

        </div>
    );
}
