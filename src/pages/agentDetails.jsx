import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchAgentData, fetchAgentList } from "../services/agentService";
import { a, p } from "framer-motion/client";
import SpotlightCard from "../components/spotlightCard";

export default function AgentDetails() {
    const { uuid } = useParams();
    const [agent, setAgent] = useState(null);
    const [agentList, setAgentList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchAgent = async () => {
            try {
                const data = await fetchAgentData(uuid);
                setAgent(data);
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        fetchAgent();
    }, [uuid]);

    useEffect(() => {
        const fetchAgents = async () => {
            const data = await fetchAgentList();
            setAgentList(data);
        };

        fetchAgents();
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
                className="min-h-screen flex p-4 lg:p-8"
                style={{
                    background: `linear-gradient(135deg, #${agent.backgroundGradientColors[0]}, #${agent.backgroundGradientColors[1]}, #${agent.backgroundGradientColors[2]}, #${agent.backgroundGradientColors[3]})`,
                }}
            >
                <div className="bg-transparent w-full grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div className="relative">
                        {/* Gambar Latar */}
                        <img
                            src={agent.background}
                            alt={`${agent.displayName} background`}
                            className="absolute inset-0 w-full h-full object-cover opacity-50"
                            style={{ zIndex: 0 }}
                        />

                        {/* Gambar Utama */}
                        <img
                            src={agent.fullPortrait}
                            alt={agent.displayName}
                            className="relative z-10 w-full h-full object-cover"
                        />
                    </div>

                    <div className="bg-transparent">
                        <h1 className="text-4xl font-bold mb-4 text-white">{agent.displayName}</h1>
                        <p className="text-white">{agent.description}</p>
                        <div className="flex flex-wrap gap-2 mt-4 items-center text-white">
                            <p className="text-white text-lg">Role: {agent.role.displayName}</p>
                            <img
                                src={agent.role.displayIcon}
                                alt={agent.role.displayName}
                                className="h-6 w-6"
                            />
                        </div>
                        <div className="tags flex flex-wrap gap-2 mt-2">
                            {agent.characterTags && agent.characterTags.map((tag) => (
                                <span
                                    key={tag}
                                    className="text-white text-sm bg-gray-800 px-2 py-1 rounded-full mt-4"
                                >
                                    {tag}
                                </span>
                            ))}
                        </div>
                        <h1 className="text-2xl font-bold text-white mt-4">Abilities</h1>

                        <div className="mt-4 w-full grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {agent.abilities.map((ability) => (
                                <SpotlightCard className="custom-spotlight-card" spotlightColor="rgba(0, 229, 255, 0.2)">
                                    <div className="flex items-center mb-2">
                                        <h2 className="text-xl font-bold text-white">{ability.displayName}</h2>
                                        {ability.slot === "Passive" ? (
                                            <span className="bg-blue-500 text-white px-2 py-1 rounded-full ml-2">Passive</span>
                                        ) : (
                                            <img
                                                src={ability.displayIcon}
                                                alt={ability.displayName}
                                                className="h-6 w-6 ml-2"
                                            />
                                        )}
                                    </div>

                                    <p className="text-white">{ability.description}</p>
                                </SpotlightCard>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            <div className="bg-gray-900 p-8">
                <h1 className="text-4xl font-bold text-white text-center w-full mb-4">
                    Other Agents</h1>
                <div className="w-full bg-transparent mb-4">
                    <div className="flex flex-wrap gap-2 justify-center">
                        {agentList.map((agent) => (
                            agent.isPlayableCharacter && agent.uuid !== uuid &&
                            <a href={`/agents/${agent.uuid}`} key={agent.uuid}>
                                < div key={agent.uuid} className="flex items-center cursor-pointer px-2 py-1 rounded text-gray-500 font-medium text-md transition-colors duration-200 border-2 border-gray-500 hover:border-gray-800" >
                                    <img
                                        src={agent.displayIcon}
                                        alt={agent.displayName}
                                        className="h-10 w-10 rounded-lg"
                                    />
                                    <p className="text-white text-lg">{agent.displayName}</p>
                                </div>
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        </div >


    );
}


