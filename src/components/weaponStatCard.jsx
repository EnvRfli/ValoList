const weaponCardStats = ({ title, value, unit }) => {
    return (
        <div className="border-2 border-gray-500">
            <div className="bg-gray-800 w-full py-2">
                <p className="text-white font-bold text-center">{title}</p>
            </div>
            <div className="w-full py-2">
                <p className="text-white text-center text-2xl">{value}</p>
                <p className="text-white text-center text-gray-400">{unit}</p>
            </div>
        </div>
    )
}

export default weaponCardStats;