import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import SplitText from './SplitText';

// --- Icon Components (keep these as they were) ---
const MailIcon = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" {...props}><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
);
const GitHubIcon = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0 -3.5 0 0 -1 0 -3 1.5 -2.64 -.5 -5.36 -.5 -8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" /><path d="M9 18c-4.51 2-5-2-7-2" /></svg>
);
const LinkedInIcon = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" /><rect width="4" height="12" x="2" y="9" /><circle cx="4" cy="4" r="2" /></svg>
);


function CenterGlow({ start = 'rgba(96,165,250,0.20)', middle = 'rgba(96,165,250,0.12)', end = 'rgba(96,165,250,0.06)' }) {
    return (
        <div className="pointer-events-none absolute inset-0 z-5 flex items-center justify-center" aria-hidden="true">
            <div
                className="w-[60vw] h-[60vw] max-w-[900px] max-h-[900px] rounded-full"
                style={{
                    background: `radial-gradient(circle, ${start} 0%, ${middle} 45%, ${end} 80%)`,
                    filter: 'blur(60px)',
                    animation: 'pulseGlow 4s ease-in-out infinite alternate'
                }}
            />
            <style>{`@keyframes pulseGlow { 0% { opacity: 0.7; } 100% { opacity: 1; } }`}</style>
        </div>
    );
}

// --- Main Hero Component ---
export default function Hero() {
    const [showSubtitle, setShowSubtitle] = useState(false);
    const [showCTA, setShowCTA] = useState(false);

    // Dark theme colors only
    const textColor = '#ffffff';
    const mutedColor = '#9ca3af';
    const glowStart = 'rgba(96,165,250,0.14)';
    const glowMiddle = 'rgba(96,165,250,0.09)';
    const glowEnd = 'rgba(96,165,250,0.04)';

    const handleTitleComplete = () => {
        setTimeout(() => setShowSubtitle(true), 200);
    };

    const handleSubtitleComplete = () => {
        setTimeout(() => setShowCTA(true), 300);
    };

    return (
        <section
            id="hero"
            className="relative h-screen overflow-hidden cursor-crosshair transition-colors duration-300 bg-transparent"
        >

            {/* pass theme-aware hero color stops */}
            <CenterGlow start={glowStart} middle={glowMiddle} end={glowEnd} />

            {/* Text and CTA are layered on top and centered */}
            <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4">
                <div className="max-w-5xl">
                    <SplitText
                        text="JOSE VILLA"
                        className="text-4xl sm:text-5xl lg:text-7xl font-thin tracking-[0.5em] sm:tracking-[0.5em] uppercase transition-colors duration-300"
                        delay={300}
                        duration={0.4}
                        ease="power3.out"
                        splitType="chars"
                        from={{ opacity: 0, y: 60, rotateX: -90 }}
                        to={{ opacity: 1, y: 0, rotateX: 0 }}
                        threshold={0.1}
                        rootMargin="-50px"
                        textAlign="center"
                        stagger={0.05}
                        onLetterAnimationComplete={handleTitleComplete}
                        style={{
                            color: textColor,
                            textShadow: '0 0 14px rgba(96,165,250,0.14)',
                            marginRight: '-0.5em'
                        }}
                    />

                    {/* Reserve space for subtitle to prevent layout shift */}
                    <div className="mt-6 overflow-hidden min-h-[2rem]">
                        <div style={{ opacity: showSubtitle ? 1 : 0, transition: 'opacity 0.3s ease' }}>
                            <SplitText
                                text="CREATIVE | TECHNOLOGIST | DEVELOPER"
                                className="text-sm font-light tracking-[0.3em] uppercase transition-colors duration-300"
                                delay={0}
                                duration={0.5}
                                ease="power2.out"
                                splitType="chars"
                                from={{ opacity: 0, y: 20 }}
                                to={{ opacity: 1, y: 0 }}
                                threshold={0.1}
                                rootMargin="-50px"
                                textAlign="center"
                                stagger={0.02}
                                onLetterAnimationComplete={handleSubtitleComplete}
                                style={{ color: mutedColor }}
                            />
                        </div>
                    </div>

                    {/* Reserve space for CTA buttons */}
                    <div className="mt-10 min-h-[4rem]">
                        {showCTA && (
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, ease: 'easeOut' }}
                                className="flex flex-wrap justify-center items-center gap-4"
                            >
                                <motion.a
                                    href="#contact"
                                    className="inline-flex items-center justify-center gap-2 bg-indigo-500 text-white px-8 py-3 rounded-lg font-semibold shadow-lg hover:bg-[var(--color-button-primary-hover)] transition-all duration-300 pointer-events-auto"
                                    whileHover={{ scale: 1.05, boxShadow: '0 20px 40px rgba(96, 165, 250, 0.3)' }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    <MailIcon />
                                    Get in Touch
                                </motion.a>
                                <div className="flex items-center gap-4 pointer-events-auto">
                                    <motion.a
                                        href="https://github.com/JoseDaVilla"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="hover:text-[var(--color-accent)] transition-colors duration-300"
                                        title="GitHub"
                                        style={{ color: mutedColor }}
                                        whileHover={{ scale: 1.1, y: -2 }}
                                        whileTap={{ scale: 0.9 }}
                                    >
                                        <GitHubIcon className="w-8 h-8" />
                                    </motion.a>
                                    <motion.a
                                        href="https://www.linkedin.com/in/jose-daniel-villa-712133204"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="hover:text-[var(--color-accent)] transition-colors duration-300"
                                        title="LinkedIn"
                                        style={{ color: mutedColor }}
                                        whileHover={{ scale: 1.1, y: -2 }}
                                        whileTap={{ scale: 0.9 }}
                                    >
                                        <LinkedInIcon className="w-8 h-8" />
                                    </motion.a>
                                </div>
                            </motion.div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}