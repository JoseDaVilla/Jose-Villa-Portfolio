import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

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
    const [isDark, setIsDark] = useState(document.documentElement.classList.contains('dark'));

    useEffect(() => {
        const observer = new MutationObserver(() => {
            setIsDark(document.documentElement.classList.contains('dark'));
        });

        observer.observe(document.documentElement, {
            attributes: true,
            attributeFilter: ['class']
        });

        return () => observer.disconnect();
    }, []);

    // Use the selected hero color (keeps consistency with App sectionColors)
    const heroBase = '#60a5fa'; // selected hero color
    const textColor = isDark ? '#ffffff' : '#111827';
    const mutedColor = isDark ? '#9ca3af' : '#4b5563';
    // Compose soft glow stops (lighter for light mode, slightly richer in dark)
    const glowStart = isDark ? 'rgba(96,165,250,0.14)' : 'rgba(96,165,250,0.22)';
    const glowMiddle = isDark ? 'rgba(96,165,250,0.09)' : 'rgba(96,165,250,0.12)';
    const glowEnd = isDark ? 'rgba(96,165,250,0.04)' : 'rgba(96,165,250,0.06)';

    return (
        <section
            id="hero"
            className="relative h-screen overflow-hidden cursor-crosshair transition-colors duration-300 bg-gradient-to-b from-white via-[#eef2ff] to-[#f7f9fc] dark:bg-transparent dark:from-transparent dark:via-transparent dark:to-transparent"
        >

            {/* pass theme-aware hero color stops */}
            <CenterGlow start={glowStart} middle={glowMiddle} end={glowEnd} />

            {/* Text and CTA are layered on top and centered */}
            <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut", delay: 0.5 }}
                >
                    <h1
                        className="text-4xl sm:text-5xl lg:text-7xl font-thin tracking-[0.5em] sm:tracking-[1em] uppercase transition-colors duration-300"
                        style={{
                            color: textColor,
                            textShadow: isDark ? `0 0 14px rgba(96,165,250,0.14)` : `0 4px 20px rgba(96,165,250,0.06)`
                        }}
                    >
                        <span style={{ marginRight: '-0.5em' }}>Jose Villa</span>
                    </h1>
                    <p
                        className="mt-4 text-sm font-light tracking-[0.3em] uppercase transition-colors duration-300"
                        style={{ color: mutedColor }}
                    >
                        Creative <span className="mx-2 opacity-50">|</span> Technologist <span className="mx-2 opacity-50">|</span> Developer
                    </p>
                    <div className="mt-10 flex flex-wrap justify-center items-center gap-4">
                        <a
                            href="#contact"
                            className="inline-flex items-center justify-center gap-2 bg-[var(--color-button-primary)] text-white px-8 py-3 rounded-lg font-semibold shadow-lg hover:bg-[var(--color-button-primary-hover)] transition-all duration-300 transform hover:scale-105 pointer-events-auto"
                        >
                            <MailIcon />
                            Get in Touch
                        </a>
                        <div className="flex items-center gap-4 pointer-events-auto">
                            <a
                                href="https://github.com/JoseDaVilla"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover:text-[var(--color-accent)] transition-colors duration-300"
                                title="GitHub"
                                style={{ color: mutedColor }}
                            >
                                <GitHubIcon className="w-8 h-8" />
                            </a>
                            <a
                                href="https://www.linkedin.com/in/jose-daniel-villa-712133204"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover:text-[var(--color-accent)] transition-colors duration-300"
                                title="LinkedIn"
                                style={{ color: mutedColor }}
                            >
                                <LinkedInIcon className="w-8 h-8" />
                            </a>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}