"use client";

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import './NavBar.css';

interface NavbarProps {
    setIsHovering: (isHovering: boolean) => void;
}

const Navbar = ({ setIsHovering }: NavbarProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const darkMode = localStorage.getItem('dark-mode') === 'true';
        setIsDarkMode(darkMode);
        document.body.classList.toggle('dark-mode', darkMode);
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 0);
        };

        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    const toggleMenu = () => {
        setIsOpen((prev) => {
            const newState = !prev;
            document.body.style.overflow = newState ? 'hidden' : 'auto';
            return newState;
        });
    };

    const closeMenu = () => {
        setIsOpen(false);
        document.body.style.overflow = 'auto';
    };

    const toggleDarkMode = () => {
        const newDarkMode = !isDarkMode;
        setIsDarkMode(newDarkMode);
        document.body.classList.toggle('dark-mode', newDarkMode);
        localStorage.setItem('dark-mode', newDarkMode.toString());
    };

    return (
        <nav
            className={`py-6 px-16 max-[640px]:px-6 min-w-full z-50 fixed transition-all duration-300 ${
                isScrolled ? 'bg-[var(--background)] shadow-[0_10px_100px_rgba(0,0,0,0.1)]' : 'bg-transparent'
            }`}
            aria-label="Main Navigation"
        >
            <div className="max-w-[1400px] mx-auto flex items-center justify-between">
                <h1
                    className="flex justify-start relative"
                    onMouseEnter={() => setIsHovering(true)}
                    onMouseLeave={() => setIsHovering(false)}
                >
                    <Link href="/">
                        <Image
                            className='z-[2] relative'
                            src={isDarkMode ? "/leo-henrique-logo-dark.svg" : "/leo-henrique-logo.svg"}
                            alt="Leo Henrique Logo"
                            width={120}
                            height={40}
                            priority
                        />
                    </Link>
                    <Image
                        className="absolute bottom-0"
                        width={122}
                        height={7}
                        src="/leo-henrique-logo-hover.svg"
                        alt="Leo Henrique Logo Hover"
                    />
                </h1>
                <ul className="hidden md:flex justify-center gap-12 flex-grow nav-list" role="menubar">
                    {['Home', 'About me', 'Projects', 'Contact'].map((item, index) => (
                        <li key={index} role="none" className="nav-item">
                            <Link
                                href={`/#${item.toLowerCase().replace(' ', '-')}`}
                                className="nav-link"
                                role="menuitem"
                                onMouseEnter={() => setIsHovering(true)}
                                onMouseLeave={() => setIsHovering(false)}
                            >
                                {item}
                            </Link>
                        </li>
                    ))}
                </ul>
                <div className="flex items-center gap-4">
                    <button onClick={toggleDarkMode} aria-label="Toggle Dark Mode" className="text-black dark:text-white">
                        {isDarkMode ? (
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                                <path fill="var(--foreground)" d="M12 19a1 1 0 0 1 .993.883L13 20v1a1 1 0 0 1-1.993.117L11 21v-1a1 1 0 0 1 1-1m6.313-2.09l.094.083l.7.7a1 1 0 0 1-1.32 1.497l-.094-.083l-.7-.7a1 1 0 0 1 1.218-1.567zm-11.306.083a1 1 0 0 1 .083 1.32l-.083.094l-.7.7a1 1 0 0 1-1.497-1.32l.083-.094l.7-.7a1 1 0 0 1 1.414 0M4 11a1 1 0 0 1 .117 1.993L4 13H3a1 1 0 0 1-.117-1.993L3 11zm17 0a1 1 0 0 1 .117 1.993L21 13h-1a1 1 0 0 1-.117-1.993L20 11zM6.213 4.81l.094.083l.7.7a1 1 0 0 1-1.32 1.497l-.094-.083l-.7-.7A1 1 0 0 1 6.11 4.74zm12.894.083a1 1 0 0 1 .083 1.32l-.083.094l-.7.7a1 1 0 0 1-1.497-1.32l.083-.094l.7-.7a1 1 0 0 1 1.414 0M12 2a1 1 0 0 1 .993.883L13 3v1a1 1 0 0 1-1.993.117L11 4V3a1 1 0 0 1 1-1m0 5a5 5 0 1 1-4.995 5.217L7 12l.005-.217A5 5 0 0 1 12 7" />
                            </svg>
                        ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                                <path fill="var(--foreground)" d="M12 22c5.523 0 10-4.477 10-10c0-.463-.694-.54-.933-.143a6.5 6.5 0 1 1-8.924-8.924C12.54 2.693 12.463 2 12 2C6.477 2 2 6.477 2 12s4.477 10 10 10" />
                            </svg>
                        )}
                    </button>
                    <Link
                        href="/"
                        target="_blank"
                        className="bg-white uppercase font-weight-500 max-[640px]:hidden text-black rounded-[8px] flex items-center gap-2 px-4 py-1 opacity-100 transition duration-200 hover:bg-[#9A9A9A]"
                        onMouseEnter={() => setIsHovering(true)}
                        onMouseLeave={() => setIsHovering(false)}
                    >
                        Let's Talk
                    </Link>
                </div>
                <button className="md:hidden flex items-center justify-center absolute top-6 right-6" onClick={toggleMenu} aria-label={isOpen ? "Fechar menu" : "Abrir menu"} aria-expanded={isOpen} aria-controls="mobile-menu">
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                    </svg>
                </button>
            </div>

            {isOpen && (
                <div id="mobile-menu" className={`fixed top-0 left-0 min-h-[100vh] min-w-[100vw] bg-[#080808] flex flex-col px-6 justify-start pt-6 md:hidden transition-all duration-300 ease-in-out ${isOpen ? 'opacity-100' : 'opacity-0'}`} style={{ zIndex: 9999, }} aria-label="Mobile Navigation">
                    <button className="absolute top-6 right-6" onClick={closeMenu} aria-label="Fechar menu">
                        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                    <Link href="/" onClick={closeMenu} className="mb-8">
                        <Image
                            src={isDarkMode ? "/leo-henrique-logo-dark.svg" : "/leo-henrique-logo.svg"}
                            alt="Leo Henrique Logo"
                            width={120}
                            height={40}
                            priority
                            onMouseEnter={() => setIsHovering(true)}
                            onMouseLeave={() => setIsHovering(false)}
                        />
                    </Link>
                    <ul className="flex flex-col gap-6 nav-list" role="menu">
                        {['Home', 'About me', 'Projects', 'Contact'].map((item, index) => (
                            <li key={index} role="none" className="nav-item">
                                <Link
                                    href={`/#${item.toLowerCase().replace(' ', '-')}`}
                                    className="text-white text-lg nav-link"
                                    onClick={closeMenu}
                                    role="menuitem"
                                    onMouseEnter={() => setIsHovering(true)}
                                    onMouseLeave={() => setIsHovering(false)}
                                >
                                    {item}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
