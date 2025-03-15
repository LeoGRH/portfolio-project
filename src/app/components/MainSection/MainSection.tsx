"use client";

import React, { useState, useLayoutEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import "./MainSection.css";

const words = ["Software Developer", "Web Developer", "UX / UI Designer", "Gamer in spare time"];

interface MainSectionProps {
    setIsHovering: (isHovering: boolean) => void;
}

const MainSection = ({ setIsHovering }: MainSectionProps) => {
    const [currentWordIndex, setCurrentWordIndex] = useState(0);
    const [displayedText, setDisplayedText] = useState("");
    const [isDeleting, setIsDeleting] = useState(false);
    const [typingSpeed, setTypingSpeed] = useState(150);

    useLayoutEffect(() => {
        const currentWord = words[currentWordIndex];

        const handleTyping = () => {
            if (isDeleting) {
                setDisplayedText((prev) => prev.slice(0, prev.length - 1));
                setTypingSpeed(50);
            } else {
                setDisplayedText((prev) => currentWord.slice(0, prev.length + 1));
                setTypingSpeed(150);
            }

            if (!isDeleting && displayedText === currentWord) {
                setTimeout(() => setIsDeleting(true), 1000);
            } else if (isDeleting && displayedText === "") {
                setIsDeleting(false);
                setCurrentWordIndex((prev) => (prev + 1) % words.length);
            }
        };

        const timer = setTimeout(handleTyping, typingSpeed);
        return () => clearTimeout(timer);
    }, [displayedText, isDeleting, currentWordIndex]);

    const sidebarVariants = {
        hidden: { x: -100, opacity: 0 },
        visible: { x: 0, opacity: 1, transition: { duration: 0.5, delay: 0.5 } },
    };

    const scrollVariants = {
        hidden: { y: 100, opacity: 0 },
        visible: { y: 0, opacity: 1, transition: { duration: 0.5, delay: 0.5 } },
    };

    const textContainerVariants = {
        hidden: {},
        visible: {
            transition: {
                staggerChildren: 0.5,
                delayChildren: 1,
            },
        },
    };

    const textVariants = {
        hidden: { y: 100, opacity: 0 },
        visible: { y: 0, opacity: 1, transition: { duration: 0.5 } },
    };

    return (
        <section className="flex flex-col items-center justify-center relative overflow-hidden min-h-[100vh] gap-[10px] p-[1.5rem]">
            <motion.div
                className="social-midia-sidebar flex flex-col items-center gap-8 max-[640px]:hidden"
                initial="hidden"
                animate="visible"
                variants={sidebarVariants}
            >
                <Image onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)} src="/email-dark.svg" alt="Email" width={30} height={30} className="social-icon" />
                <Image onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)} src="/linkedin-dark.svg" alt="LinkedIn" width={30} height={30} className="social-icon" />
                <Image onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)} src="/github-dark.svg" alt="GitHub" width={30} height={30} className="social-icon" />
            </motion.div>
            <motion.div
                className="scroll-here"
                initial="hidden"
                animate="visible"
                variants={scrollVariants}
            >
                <div className="scroll-mouse"></div>
                <span className="scroll-text">- SCROLL TO SEE MY JOURNEY-</span>
            </motion.div>
            <motion.div
                className="flex flex-col items-center justify-center gap-[1rem]"
                initial="hidden"
                animate="visible"
                variants={textContainerVariants}
            >
                <motion.div
                    className="flex flex-col items-center justify-center max-w-[45rem]"
                    variants={textVariants}
                >
                    <span
                        className="main-subtitle"
                        onMouseEnter={() => setIsHovering(true)}
                        onMouseLeave={() => setIsHovering(false)}
                    >
                        Hello world! I am
                    </span>
                </motion.div>
                <motion.h1
                    className="main-text-h1"
                    style={{ userSelect: "none" }}
                    variants={textVariants}
                    onMouseEnter={() => setIsHovering(true)}
                    onMouseLeave={() => setIsHovering(false)}
                >
                    LEO HENRIQUE
                </motion.h1>
                <motion.div
                    className="mt-[10px] max-[640px]:mt-0 flex flex-col items-center justify-center max-w-[45rem]"
                    variants={textVariants}
                >
                    <span
                        className="main-subtitle text-center"
                        onMouseEnter={() => setIsHovering(true)}
                        onMouseLeave={() => setIsHovering(false)}
                    >
                        A <span style={{ color: "var(--main)", fontWeight: "500" }}>{displayedText}</span>
                        <span className="animate-blink" style={{ color: "var(--main)" }}>|</span>venturing out into the world.
                    </span>
                </motion.div>
            </motion.div>
            <div className="noise"></div>
        </section>
    );
};

export default MainSection;
