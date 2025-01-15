import React, { useEffect, useState } from "react";
import ContentSection from "../components/contentSection";
import ContentSectionMaps from "../components/contentSectionMaps";
import { fetchAgentList } from "../services/agentService";
import { fetchMapList } from "../services/mapService";

export default function Home() {
    const [agents, setAgents] = useState([]);
    const [selectedAgent, setSelectedAgent] = useState("e370fa57-4757-3604-3648-499e1f642d3f");
    const [selectedAgentData, setSelectedAgentData] = useState(null);
    const [maps, setMaps] = useState([]);
    const [selectedMap, setSelectedMap] = useState("7eaecc1b-4337-bbf6-6ab9-04b8f06b3319");
    const [selectedMapData, setSelectedMapData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAgents = async () => {
            const data = await fetchAgentList();
            setAgents(data);
        };

        const fetchMaps = async () => {
            const data = await fetchMapList();
            setMaps(data);
        };

        fetchAgents();
        fetchMaps();
        setLoading(false);
    }, []);

    const handleAgentChange = (event) => {
        const { value } = event.target;
        if (selectedAgent === value) {
            setSelectedAgent(null);
        } else {
            setSelectedAgent(value);
        }
    };

    const handleMapChange = (event) => {
        const { value } = event.target;
        if (selectedMap === value) {
            setSelectedMap(null);
        } else {
            setSelectedMap(value);
        }
    };

    useEffect(() => {
        const agent = agents.find((agent) => agent.uuid === selectedAgent);
        setSelectedAgentData(agent);
    }, [selectedAgent, agents]);

    useEffect(() => {
        const map = maps.find((map) => map.uuid === selectedMap);
        setSelectedMapData(map);
    }, [selectedMap, maps]);

    if (loading) {
        return (
            <div className="h-screen flex flex-col items-center justify-center bg-gray-900 text-white">
                <div className="w-20 h-20 border-8 border-t-8 border-gray-800 border-t-blue-500 rounded-full animate-spin mb-4"></div>

                <p className="text-lg font-semibold animate-pulse">Loading, please wait...</p>
            </div>
        );
    }


    return (
        <div className="flex flex-col">
            <div className="min-h-screen flex bg-gray-900 p-8">
                <ContentSection
                    title="Agents"
                    description={selectedAgentData?.description}
                    agentName={selectedAgentData?.displayName}
                    image={selectedAgentData?.fullPortrait}
                    agents={agents}
                    selectedAgent={selectedAgent}
                    role={selectedAgentData?.role.displayName}
                    roleImg={selectedAgentData?.role.displayIcon}
                    handleAgentChange={handleAgentChange}
                />
            </div>
            <div className="min-h-screen flex bg-gray-900 p-8">
                <ContentSectionMaps
                    title="Maps"
                    description={selectedMapData?.tacticalDescription}
                    mapName={selectedMapData?.displayName}
                    image={selectedMapData?.displayIcon}
                    maps={maps}
                    selectedMap={selectedMap}
                    handleMapChange={handleMapChange}
                />
            </div>
        </div>
    );
}
