import { a } from "framer-motion/client";

const WeaponList = ({ weapons, order, category }) => {
    return (
        <>
            {weapons
                .filter((weapon) => weapon.category === category)
                .sort((a, b) => order.indexOf(a.displayName) - order.indexOf(b.displayName))
                .map((weapon) => (
                    <a href={`/weapons/${weapon.uuid}`} className="w-full">
                        <div
                            key={weapon.uuid}
                            className="flex flex-col w-full border border-white-200 h-36 px-4 py-6 relative mb-4 cursor-pointer hover:bg-gray-800 transition-colors duration-200"
                        >
                            <img
                                src={weapon.displayIcon}
                                alt={weapon.displayName}
                                className="w-full h-full object-contain"
                            />
                            <h1 className="text-lg uppercase absolute bottom-2 left-2 text-gray-500">
                                {weapon.displayName}
                            </h1>
                        </div>
                    </a >
                ))}
        </>
    );
};

export default WeaponList;