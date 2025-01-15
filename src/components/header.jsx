import React, { useState } from 'react';
import { FaBars } from 'react-icons/fa'; // Import ikon burger

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false); // State untuk membuka/tutup dropdown

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen); // Toggle menu ketika ikon burger diklik
    };

    return (
        <header className="bg-gray-900 text-white py-4 px-4 sm:px-8 flex justify-between items-center shadow-md">
            <div className='mr-4 flex items-center'>
                <a href="/">
                    <h1 className='font-sans text-2xl font-bold'>ValoList</h1>
                </a>
            </div>

            {/* Navbar yang tampil di atas md */}
            <nav className="hidden md:flex items-center space-x-4">
                <ul className="flex items-center">
                    <li className='mr-4'>
                        <a href='/agents/e370fa57-4757-3604-3648-499e1f642d3f' className='hover:bg-gray-700 hover:font-bold font-medium px-2 py-1 rounded'>
                            Agents
                        </a>
                    </li>
                    <li className='mr-4'>
                        <a href='/maps/224b0a95-48b9-f703-1bd8-67aca101a61f' className='hover:bg-gray-700 hover:font-bold font-medium px-2 py-1 rounded'>
                            Maps
                        </a>
                    </li>
                    <li className='mr-4'>
                        <a href='/weapons' className='hover:bg-gray-700 hover:font-bold font-medium px-2 py-1 rounded'>
                            Weapons
                        </a>
                    </li>
                    <li className='mr-4'>
                        <a href='/about' className='hover:bg-gray-700 hover:font-bold font-medium px-2 py-1 rounded'>
                            About
                        </a>
                    </li>
                </ul>
            </nav>

            {/* Tombol Burger untuk layar bawah md */}
            <button className="text-white text-2xl md:hidden" onClick={toggleMenu}>
                <FaBars />
            </button>

            {/* Dropdown Menu ketika tombol burger diklik */}
            {isMenuOpen && (
                <div className="absolute top-16 right-4 bg-gray-900 text-white shadow-md rounded-md w-48 md:hidden z-50">
                    <ul className="flex flex-col space-y-2 p-4">
                        <li>
                            <a href='/agents/e370fa57-4757-3604-3648-499e1f642d3f' className='hover:bg-gray-700 hover:font-bold font-medium px-2 py-1 rounded'>
                                Agents
                            </a>
                        </li>
                        <li>
                            <a href='/maps/224b0a95-48b9-f703-1bd8-67aca101a61f' className='hover:bg-gray-700 hover:font-bold font-medium px-2 py-1 rounded'>
                                Maps
                            </a>
                        </li>
                        <li>
                            <a href='/weapons' className='hover:bg-gray-700 hover:font-bold font-medium px-2 py-1 rounded'>
                                Weapons
                            </a>
                        </li>
                        <li>
                            <a href='/about' className='hover:bg-gray-700 hover:font-bold font-medium px-2 py-1 rounded'>
                                About
                            </a>
                        </li>
                    </ul>
                </div>
            )}
        </header>
    );
};

export default Header;
