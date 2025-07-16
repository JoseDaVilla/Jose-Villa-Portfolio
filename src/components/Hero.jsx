import React from 'react';
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


function CenterGlow() {
    return (
        <div className="pointer-events-none absolute inset-0 z-5 flex items-center justify-center" aria-hidden="true">
            <div className="w-[60vw] h-[60vw] max-w-[900px] max-h-[900px] rounded-full" style={{background: 'radial-gradient(circle, #60a5fa55 0%, #2563eb33 40%, #0a0f1900 80%)', filter: 'blur(60px)', animation: 'pulseGlow 4s ease-in-out infinite alternate'}} />
            <style>{`@keyframes pulseGlow { 0% { opacity: 0.7; } 100% { opacity: 1; } }`}</style>
        </div>
    );
}

// --- Main Hero Component ---
export default function Hero() {
    return (
        <section id="hero" className="relative h-screen text-white overflow-hidden cursor-crosshair">

            <CenterGlow />

            {/* Text and CTA are layered on top and centered */}
            <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut", delay: 0.5 }}
                >
                    <h1 className="text-4xl sm:text-5xl lg:text-7xl font-thin tracking-[0.5em] sm:tracking-[1em] uppercase">
                        <span style={{ marginRight: '-0.5em' }}>Jose Villa</span>
                    </h1>
                    <p className="mt-4 text-sm font-light tracking-[0.3em] uppercase opacity-80">
                        Creative <span className="mx-2 opacity-50">|</span> Technologist <span className="mx-2 opacity-50">|</span> Developer
                    </p>
                    <div className="mt-10 flex flex-wrap justify-center items-center gap-4">
                        <a href="#contact" className="inline-flex items-center justify-center gap-2 bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold shadow-lg hover:bg-blue-700 transition-all duration-300 transform hover:scale-105 pointer-events-auto">
                            <MailIcon />
                            Get in Touch
                        </a>
                        <div className="flex items-center gap-4 pointer-events-auto">
                            <a href="https://github.com/your-username" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-500 transition-colors" title="GitHub">
                                <GitHubIcon className="w-8 h-8"/>
                            </a>
                            <a href="https://linkedin.com/in/your-profile" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-500 transition-colors" title="LinkedIn">
                                <LinkedInIcon className="w-8 h-8"/>
                            </a>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}