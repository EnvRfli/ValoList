import React from "react";
import { useInView } from "react-intersection-observer";
import { motion } from "framer-motion";
import GradientText from "./gradientText";

const ContentSection = ({ title, agentName, description, image, agents, selectedAgent, role, roleImg, handleAgentChange }) => {
    const { ref, inView } = useInView({ triggerOnce: false });

    return (
        <div ref={ref} className="min-h-screen flex bg-gray-900 p-8 w-full grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-transparent">
                <motion.h1
                    initial={{ opacity: 0, y: 50 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 1 }}
                    className="text-4xl font-bold mb-4 text-white"
                >
                    {title}
                </motion.h1>
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.8, delay: 0.1 }}
                    className="rounded-lg p-4 mb-4"
                >
                    <div className="w-full bg-transparent mb-4">
                        <div className="flex flex-wrap gap-2">
                            {agents?.map(
                                (agent) =>
                                    agent.isPlayableCharacter && (
                                        <div key={agent.uuid}>
                                            <label
                                                className={`flex items-center cursor-pointer px-2 py-1 rounded text-gray-500 font-medium text-md transition-colors duration-200 border-2 ${selectedAgent === agent.uuid
                                                    ? "border-blue-500 text-blue-500"
                                                    : "border-gray-500 hover:border-gray-800"
                                                    }`}
                                            >
                                                <input
                                                    type="radio"
                                                    className="hidden"
                                                    value={agent.uuid}
                                                    onChange={handleAgentChange}
                                                    checked={selectedAgent === agent.uuid}
                                                />
                                                <p className="leading-none">{agent.displayName}</p>
                                            </label>
                                        </div>
                                    )
                            )}
                        </div>
                    </div>
                </motion.div>
                <motion.h2
                    initial={{ opacity: 0, y: 50 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="text-2xl px-4 font-bold text-white"
                >
                    {agentName}
                </motion.h2>
                <motion.p
                    initial={{ opacity: 0, x: -50 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.8, delay: 0.3 }}
                    className="text-lg max-w-xl px-4 text-white mt-4"
                >
                    {description}
                </motion.p>
                <div className="flex justify-start px-4 mt-4 items-center">
                    <motion.img
                        src={roleImg}
                        alt={role}
                        initial={{ scale: 0, x: 1, opacity: 0 }}
                        animate={inView ? { scale: 1, x: 0, opacity: 1 } : {}}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="object-cover rounded-lg w-10 h-10"
                    />
                    <motion.p
                        initial={{ opacity: 0, x: -50 }}
                        animate={inView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.8, delay: 0.5 }}
                        className="text-lg font-bold text-white ml-4"
                    >
                        {role}
                    </motion.p>
                </div>
                <div className="flex justify-end mt-4 items-center">
                    <a href={`/agents/${selectedAgent}`} className="flex items-center">
                        <GradientText
                            colors={["#40ffaa", "#4079ff", "#40ffaa", "#4079ff", "#40ffaa"]}
                            animationSpeed={3}
                            showBorder={false}
                            className="custom-class text-lg font-bold text-right"
                        >
                            See Agent Details &gt;
                        </GradientText>
                    </a>
                </div>
            </div>

            {/* Mobile-first: Gambar berada di bawah div pertama */}
            <div className="w-full bg-transparent h-full order-last lg:order-none">
                <motion.img
                    src={image}
                    alt={title}
                    loading="lazy"
                    initial={{ scale: 0, x: 1, opacity: 0 }}
                    animate={inView ? { scale: 1, x: 0, opacity: 1 } : {}}
                    transition={{ duration: 0.8, delay: 0.6 }}
                    className="object-cover rounded-lg"
                />
            </div>
        </div>

    );
};

export default ContentSection;
