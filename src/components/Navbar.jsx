import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);


export default function Navbar() {
    const [activeSection, setActiveSection] = useState('hero');
    const [modalOpen, setModalOpen] = useState(false);
    
    const navRef = useRef(null);
    const navItemsRef = useRef([]);
    const indicatorRef = useRef(null);

    const navItems = [
        { label: 'Home', sectionId: 'hero' },
        { label: 'Experience', sectionId: 'experience' },
        { label: 'Projects', sectionId: 'projects' },
        { label: 'Skills', sectionId: 'skills' },
        { label: 'About', sectionId: 'aboutme' },
        { label: 'Contact', sectionId: 'contact' }
    ];

    // GSAP entrance animation
    useEffect(() => {
        if (!navRef.current || window.innerWidth < 768) return;

        const ctx = gsap.context(() => {
            gsap.fromTo(
                navRef.current,
                { x: -100, opacity: 0 },
                { 
                    x: 0, 
                    opacity: 1, 
                    duration: 1,
                    ease: 'power3.out',
                    delay: 1
                }
            );

            gsap.fromTo(
                navItemsRef.current.filter(item => item !== null),
                { x: -30, opacity: 0 },
                {
                    x: 0,
                    opacity: 1,
                    duration: 0.6,
                    stagger: 0.1,
                    ease: 'power3.out',
                    delay: 1.3
                }
            );
        }, navRef);

        return () => ctx.revert();
    }, []);

    // Active section detection
    useEffect(() => {
        const handleScroll = () => {
            let currentSection = '';
            
            for (const item of navItems) {
                const section = document.getElementById(item.sectionId);
                if (section) {
                    const rect = section.getBoundingClientRect();
                    if (rect.top <= window.innerHeight * 0.4 && rect.bottom >= window.innerHeight * 0.4) {
                        currentSection = item.sectionId;
                        break;
                    }
                }
            }
            
            if (currentSection) {
                setActiveSection(currentSection);
            }
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll();

        return () => window.removeEventListener('scroll', handleScroll);
    }, [navItems]);

    // Animate indicator line
    useEffect(() => {
        const activeIndex = navItems.findIndex(item => item.sectionId === activeSection);
        const activeElement = navItemsRef.current[activeIndex];
        
        if (activeElement && indicatorRef.current) {
            gsap.to(indicatorRef.current, {
                y: activeElement.offsetTop,
                height: activeElement.offsetHeight,
                duration: 0.4,
                ease: 'power2.out'
            });
        }
    }, [activeSection, navItems]);

    // Modal detection
    useEffect(() => {
        const checkModal = () => setModalOpen(document.body.classList.contains('modal-open'));
        checkModal();
        
        const observer = new MutationObserver(checkModal);
        observer.observe(document.body, { 
            attributes: true, 
            attributeFilter: ['class'] 
        });
        
        return () => observer.disconnect();
    }, []);

    if (modalOpen) return null;

    return (
        <nav 
            ref={navRef}
            className="hidden md:flex fixed left-8 top-1/2 -translate-y-1/2 z-50 flex-col gap-1"
            style={{ opacity: 0 }}
        >
            {/* Active indicator line */}
            <div
                ref={indicatorRef}
                className="absolute left-0 w-0.5 rounded-full transition-colors duration-300"
                style={{
                    backgroundColor: '#60a5fa',
                    boxShadow: '0 0 10px rgba(96, 165, 250, 0.5)'
                }}
            />

            {/* Navigation items */}
            {navItems.map((item, index) => (
                <a
                    key={item.label}
                    href={`#${item.sectionId}`}
                    ref={(el) => (navItemsRef.current[index] = el)}
                    className="group relative pl-4 py-2 text-sm font-medium tracking-wide transition-all duration-300"
                    style={{
                        color: activeSection === item.sectionId ? '#60a5fa' : '#64748b',
                        transform: 'translateX(-30px)',
                        opacity: 0
                    }}
                >
                    {/* Hover dot */}
                    <span 
                        className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-1 rounded-full transition-all duration-300 group-hover:w-2 group-hover:h-2"
                        style={{
                            backgroundColor: activeSection === item.sectionId ? '#60a5fa' : '#475569',
                            boxShadow: activeSection === item.sectionId ? '0 0 8px rgba(96, 165, 250, 0.6)' : 'none'
                        }}
                    />
                    
                    {/* Label */}
                    <span className="group-hover:translate-x-1 inline-block transition-transform duration-300">
                        {item.label}
                    </span>
                </a>
            ))}
        </nav>
    );
}