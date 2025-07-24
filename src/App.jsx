import React, { useEffect, useState, useMemo } from 'react';
import { Canvas } from '@react-three/fiber';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Skills from './components/Skills';
import AboutMe from './components/AboutMe';
import Contact from './components/Contact';
import Footer from './components/Footer';
import SectionSphere from './components/SectionSphere';

// --- Dynamic TechBorderCorners Component ---
function TechBorderCorners({ activeSection }) {
    const borderLength = '18rem';
    const borderThickness = '0.40rem';
    const blur = '20px';

    const sectionColors = useMemo(() => ({
        hero:       '#60a5fa', // blue
        experience: '#a855f7', // purple
        projects:   '#22d3ee', // cyan
        skills:     '#f59e42', // orange
        aboutme:    '#10b981', // green
        contact:    '#ef4444', // red
    }), []);

    const currentColor = sectionColors[activeSection] || sectionColors.hero;

    // Helper function to create the style object with smooth transitions
    const getStyle = (gradientDirection) => ({
        background: `linear-gradient(${gradientDirection}, ${currentColor} 60%, transparent 100%)`,
        filter: `blur(${blur}) drop-shadow(0 0 12px ${currentColor})`,
        transition: 'background 0.5s ease-in-out, filter 0.5s ease-in-out',
    });

    return (
        <>
            {/* Top Left */}
            <div className="fixed top-0 left-0 z-50 pointer-events-none">
                <div style={{...getStyle('90deg'), width: borderLength, height: borderThickness, borderRadius: '1rem 0 0 0', marginBottom: '-0.1rem'}} className="animate-pulse" />
                <div style={{...getStyle('180deg'), width: borderThickness, height: borderLength, borderRadius: '0', marginTop: '-0.1rem'}} className="animate-pulse" />
            </div>
            {/* Top Right */}
            <div className="fixed top-0 right-0 z-50 flex flex-col items-end pointer-events-none">
                <div style={{...getStyle('270deg'), width: borderLength, height: borderThickness, borderRadius: '0 1rem 0 0', marginBottom: '-0.1rem'}} className="animate-pulse" />
                <div style={{...getStyle('180deg'), width: borderThickness, height: borderLength, borderRadius: '0', marginTop: '-0.1rem'}} className="animate-pulse" />
            </div>
            {/* Bottom Left */}
            <div className="fixed bottom-0 left-0 z-50 flex flex-col pointer-events-none">
                <div style={{...getStyle('0deg'), width: borderThickness, height: borderLength, borderRadius: '0', marginBottom: '-0.1rem'}} className="animate-pulse" />
                <div style={{...getStyle('90deg'), width: borderLength, height: borderThickness, borderRadius: '0 0 0 1rem', marginTop: '-0.1rem'}} className="animate-pulse" />
            </div>
            {/* Bottom Right */}
            <div className="fixed bottom-0 right-0 z-50 flex flex-col items-end pointer-events-none">
                <div style={{...getStyle('0deg'), width: borderThickness, height: borderLength, borderRadius: '0', marginBottom: '-0.1rem'}} className="animate-pulse" />
                <div style={{...getStyle('270deg'), width: borderLength, height: borderThickness, borderRadius: '0 0 1rem 0', marginTop: '-0.1rem'}} className="animate-pulse" />
            </div>
        </>
    );
}


// --- Custom hook to detect the active section ---
function useActiveSection() {
    const [activeSection, setActiveSection] = useState('hero');

    useEffect(() => {
        const sections = ['hero', 'experience', 'projects', 'skills', 'aboutme', 'contact'];
        
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting && entry.target.id !== activeSection) {
                        setActiveSection(entry.target.id);
                    }
                });
            },
            { root: null, rootMargin: '0px', threshold: 0.5 }
        );

        sections.forEach((id) => {
            const element = document.getElementById(id);
            if (element) observer.observe(element);
        });

        return () => {
            sections.forEach((id) => {
                const element = document.getElementById(id);
                if (element) observer.unobserve(element);
            });
        };
    // Add activeSection as a dependency so we only update when it changes
    }, [activeSection]);

    return activeSection;
}

function App() {
    const activeSection = useActiveSection();
    const [mouse, setMouse] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const handleMouseMove = (e) => {
            setMouse({
                x: (e.clientX / window.innerWidth) * 2 - 1,
                y: -(e.clientY / window.innerHeight) * 2 + 1,
            });
        };
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    return (
        <div className="bg-[#0a0f19] antialiased">
            {/* Pass activeSection to the borders */}
            <TechBorderCorners activeSection={activeSection} />
            
            <div className="fixed top-0 left-0 w-full h-screen pointer-events-none z-0">
                <Canvas camera={{ position: [0, 0, 8], fov: 50 }}>
                    <SectionSphere
                        activeSection={activeSection}
                        mouse={mouse}
                    />
                </Canvas>
            </div>
            
            <Navbar />
            <main className="relative z-10">
                <Hero />
                <Experience />
                <Projects />
                <Skills />
                <AboutMe />
                <Contact />
            </main>
            <Footer />
        </div>
    );
}

export default App;