import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

function AnimatedCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [cursorVariant, setCursorVariant] = useState('default');
  
  // Update mouse position
  useEffect(() => {
    const mouseMove = (e) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY
      });
    };

    // Check if we're hovering over clickable elements
    const mouseOver = (e) => {
      const targetElement = e.target;
      if (
        targetElement.tagName === 'A' || 
        targetElement.tagName === 'BUTTON' ||
        targetElement.classList.contains('cursor-hover') ||
        targetElement.closest('button') ||
        targetElement.closest('a')
      ) {
        setCursorVariant('hover');
      } else {
        setCursorVariant('default');
      }
    };

    // Track mouse down state for click effect
    const mouseDown = () => setCursorVariant('click');
    const mouseUp = () => setCursorVariant('default');
    
    window.addEventListener('mousemove', mouseMove);
    document.addEventListener('mouseover', mouseOver);
    window.addEventListener('mousedown', mouseDown);
    window.addEventListener('mouseup', mouseUp);
    
    return () => {
      window.removeEventListener('mousemove', mouseMove);
      document.removeEventListener('mouseover', mouseOver);
      window.removeEventListener('mousedown', mouseDown);
      window.removeEventListener('mouseup', mouseUp);
    };
  }, []);

  // Cursor animation variants
  const variants = {
    default: {
      x: mousePosition.x - 10,
      y: mousePosition.y - 10,
      height: 20,
      width: 20,
      backgroundColor: "rgba(196, 74, 212, 0.3)",
      border: "2px solid rgba(196, 74, 212, 0.5)",
      transition: {
        type: "spring",
        mass: 0.3,
        stiffness: 200,
        damping: 20
      }
    },
    hover: {
      x: mousePosition.x - 16,
      y: mousePosition.y - 16,
      height: 32,
      width: 32,
      backgroundColor: "rgba(196, 74, 212, 0.5)",
      border: "2px solid rgba(196, 74, 212, 0.8)",
      transition: {
        type: "spring",
        mass: 0.5,
        stiffness: 250,
        damping: 14
      }
    },
    click: {
      x: mousePosition.x - 10,
      y: mousePosition.y - 10,
      height: 20,
      width: 20,
      backgroundColor: "rgba(196, 74, 212, 0.8)",
      border: "2px solid rgba(255, 255, 255, 0.8)",
      scale: 0.8,
      transition: {
        type: "spring",
        mass: 0.3,
        stiffness: 400,
        damping: 10
      }
    }
  };

  // Apply cursor styling to the document
  useEffect(() => {
    document.body.style.cursor = 'none';
    
    return () => {
      document.body.style.cursor = 'auto';
    };
  }, []);

  return (
    <>
      {/* Main cursor */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none rounded-full z-[9999] hidden md:block"
        animate={cursorVariant}
        variants={variants}
      />
      
      {/* Trailing dot cursor */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none rounded-full z-[9998] hidden md:block"
        animate={{
          x: mousePosition.x - 5,
          y: mousePosition.y - 5,
        }}
        transition={{
          type: "spring",
          mass: 0.1,
          stiffness: 120,
          damping: 14,
          restDelta: 0.001
        }}
        style={{
          backgroundColor: "rgba(196, 74, 212, 0.7)",
          height: "10px",
          width: "10px",
        }}
      />
    </>
  );
}

export default AnimatedCursor;
