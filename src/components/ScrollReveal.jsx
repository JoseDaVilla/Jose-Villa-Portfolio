import React, { useEffect, useRef } from 'react';
import { motion, useAnimation, useInView } from 'framer-motion';

// Generic ScrollReveal component that triggers animations when scrolled into view
function ScrollReveal({
    children,
    threshold = 0.1,
    animation = "fadeInUp",
    delay = 0,
    duration = 0.5,
    once = true,
    className = "",
}) {
    const controls = useAnimation();
    const ref = useRef(null);
    const inView = useInView(ref, { once, threshold });

    // Animation variants
    const animations = {
        fadeInUp: {
            hidden: { opacity: 0, y: 30 },
            visible: {
                opacity: 1,
                y: 0,
                transition: {
                    duration,
                    delay,
                    ease: "easeOut"
                }
            }
        },
        fadeIn: {
            hidden: { opacity: 0 },
            visible: {
                opacity: 1,
                transition: {
                    duration,
                    delay,
                    ease: "easeOut"
                }
            }
        },
        scaleIn: {
            hidden: { opacity: 0, scale: 0.9 },
            visible: {
                opacity: 1,
                scale: 1,
                transition: {
                    duration,
                    delay,
                    ease: "easeOut"
                }
            }
        },
        slideInLeft: {
            hidden: { opacity: 0, x: -50 },
            visible: {
                opacity: 1,
                x: 0,
                transition: {
                    duration,
                    delay,
                    ease: "easeOut"
                }
            }
        },
        slideInRight: {
            hidden: { opacity: 0, x: 50 },
            visible: {
                opacity: 1,
                x: 0,
                transition: {
                    duration,
                    delay,
                    ease: "easeOut"
                }
            }
        }
    };

    // Start animation when element comes into view
    useEffect(() => {
        if (inView) {
            controls.start("visible");
        } else if (!once) {
            controls.start("hidden");
        }
    }, [controls, inView, once]);

    return (
        <motion.div
            ref={ref}
            initial="hidden"
            animate={controls}
            variants={animations[animation]}
            className={className}
        >
            {children}
        </motion.div>
    );
}

export default ScrollReveal;
