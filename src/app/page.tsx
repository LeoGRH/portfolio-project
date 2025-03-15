"use client";

import { useState, useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import MainSection from "./components/MainSection/MainSection";
import NavBar from "./components/NavBar/NavBar";
import AboutMe from "./components/AboutMe/AboutMe";

export default function Home() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [circlePosition, setCirclePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const controls = useAnimation();

  useEffect(() => {
    const sequence = async () => {
      await controls.start("visible");
    };
    sequence();
  }, [controls]);

  const navVariants = {
    hidden: { y: -100, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5 } },
  };

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      setMousePosition({ x: event.clientX, y: event.clientY });
    };

    const handleMouseDown = () => {
      setIsClicked(true);
    };

    const handleMouseUp = () => {
      setIsClicked(false);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, []);

  useEffect(() => {
    const updateCirclePosition = () => {
      setCirclePosition((prevPosition) => {
        const dx = mousePosition.x - prevPosition.x;
        const dy = mousePosition.y - prevPosition.y;
        return {
          x: prevPosition.x + dx * 0.2,
          y: prevPosition.y + dy * 0.2,
        };
      });
    };

    const animationFrame = requestAnimationFrame(updateCirclePosition);

    return () => cancelAnimationFrame(animationFrame);
  }, [mousePosition]);

  return (
    <div>
      <main className="flex flex-col max-w-full overflow-hidden">
        <motion.div initial="hidden" animate={controls} variants={navVariants}>
          <NavBar setIsHovering={setIsHovering} />
        </motion.div>
        <MainSection setIsHovering={setIsHovering} />
        <AboutMe />
      </main>
      <motion.div
        className={`circle max-[640px]:hidden ${isHovering || isClicked ? 'circle-hover' : ''}`}
        style={{
          left: `${circlePosition.x}px`,
          top: `${circlePosition.y}px`,
        }}
      />
    </div>
  );
}
