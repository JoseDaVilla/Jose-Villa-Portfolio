import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// --- Icon Components for the mobile menu button ---
const MenuIcon = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <line x1="3" y1="12" x2="21" y2="12"></line>
        <line x1="3" y1="6" x2="21" y2="6"></line>
        <line x1="3" y1="18" x2="21" y2="18"></line>
    </svg>
);

const XIcon = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <line x1="18" y1="6" x2="6" y2="18"></line>
        <line x1="6" y1="6" x2="18" y2="18"></line>
    </svg>
);


export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [activeSection, setActiveSection] = useState('hero');
    const [scrolled, setScrolled] = useState(false);

    // Navigation items for the navbar
    const navItems = [
        { label: 'Home', sectionId: 'hero' },
        { label: 'Experience', sectionId: 'experience' },
        { label: 'Projects', sectionId: 'projects' },
        { label: 'Skills', sectionId: 'skills' },
        { label: 'About', sectionId: 'aboutme' },
        { label: 'Contact', sectionId: 'contact' }
    ];

    // Effect to handle scroll events for active link highlighting and navbar styling
    useEffect(() => {
        const handleScroll = () => {
            // Set scrolled state for navbar background effect
            setScrolled(window.scrollY > 50);
            
            let currentSection = '';
            for (const item of navItems) {
                const section = document.getElementById(item.sectionId);
                if (section) {
                    const rect = section.getBoundingClientRect();
                    // Check if the section is prominently in view
                    if (rect.top <= window.innerHeight * 0.5 && rect.bottom >= window.innerHeight * 0.5) {
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
        handleScroll(); // Initial check

        return () => window.removeEventListener('scroll', handleScroll);
    }, [navItems]);

    // Framer Motion variants for the mobile menu animation
    const menuVariants = {
        open: { opacity: 1, height: 'auto', transition: { staggerChildren: 0.07, delayChildren: 0.2 } },
        closed: { opacity: 0, height: 0, transition: { staggerChildren: 0.05, staggerDirection: -1, when: "afterChildren" } }
    };

    const menuItemVariants = {
        open: { y: 0, opacity: 1, transition: { type: 'spring', stiffness: 300, damping: 24 } },
        closed: { y: 20, opacity: 0, transition: { duration: 0.2 } }
    };

    return (
        <motion.div
            className="fixed top-0 inset-x-0 z-50 p-4"
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ type: 'spring', stiffness: 120, damping: 20, delay: 1.5 }}
        >
            <header 
                className={`max-w-5xl mx-auto rounded-xl transition-all duration-300 ${scrolled || isOpen ? 'bg-[#0a0f19]/70 backdrop-blur-lg border border-blue-400/10' : 'bg-transparent border-transparent'}`}
            >
                <div className="flex items-center justify-center px-6 py-3">
                    {/* --- Desktop Navigation Centered --- */}
                    <nav className="hidden md:flex items-center gap-2 justify-center w-full">
                        {navItems.map((item) => (
                            <a
                                key={item.label}
                                href={`#${item.sectionId}`}
                                className={`relative px-4 py-2 text-sm font-semibold tracking-wider transition-colors z-10 ${activeSection === item.sectionId ? 'text-white' : 'text-gray-400 hover:text-white'}`}
                            >
                                {item.label}
                                {activeSection === item.sectionId && (
                                    <motion.div
                                        layoutId="activeNavIndicator"
                                        className="absolute inset-0 bg-blue-500/40 rounded-lg -z-10"
                                        initial={false}
                                        transition={{type: 'spring', stiffness: 500, damping: 40}}
                                    />
                                )}
                            </a>
                        ))}
                    </nav>

                    {/* --- Mobile Navigation Button --- */}
                    <div className="md:hidden absolute right-6">
                        <motion.button onClick={() => setIsOpen(!isOpen)} whileTap={{ scale: 0.95 }} className="p-1">
                            <AnimatePresence mode="wait">
                                {isOpen ? (
                                    <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
                                        <XIcon className="h-6 w-6 text-gray-200" />
                                    </motion.div>
                                ) : (
                                    <motion.div key="menu" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}>
                                        <MenuIcon className="h-6 w-6 text-gray-200" />
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.button>
                    </div>
                </div>
                
                {/* --- Mobile Menu --- */}
                <AnimatePresence>
                    {isOpen && (
                        <motion.div
                            className="md:hidden overflow-hidden"
                            variants={menuVariants}
                            initial="closed"
                            animate="open"
                            exit="closed"
                        >
                            <nav className="flex flex-col items-center py-2 border-t border-blue-400/10">
                                {navItems.map((item) => (
                                    <motion.a
                                        key={item.label}
                                        href={`#${item.sectionId}`}
                                        className={`block w-full text-center py-3 font-semibold ${activeSection === item.sectionId ? 'text-blue-400' : 'text-gray-300'}`}
                                        onClick={() => setIsOpen(false)}
                                        variants={menuItemVariants}
                                    >
                                        {item.label}
                                    </motion.a>
                                ))}
                            </nav>
                        </motion.div>
                    )}
                </AnimatePresence>
            </header>
        </motion.div>
    );
}