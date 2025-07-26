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
    // Track modal open state
    const [modalOpen, setModalOpen] = useState(false);

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

    // Effect to detect if modal is open by checking body class
    useEffect(() => {
        const checkModal = () => setModalOpen(document.body.classList.contains('modal-open'));
        checkModal();
        const observer = new MutationObserver(checkModal);
        observer.observe(document.body, { attributes: true, attributeFilter: ['class'] });
        return () => observer.disconnect();
    }, []);

    // Framer Motion variants for the mobile menu animation
    const menuVariants = {
        open: { opacity: 1, height: 'auto', transition: { staggerChildren: 0.07 } },
        closed: { opacity: 0, height: 0, transition: { staggerChildren: 0.05, staggerDirection: -1, when: "afterChildren" } }
    };

    const menuItemVariants = {
        open: { y: 0, opacity: 1, transition: { type: 'spring', stiffness: 300, damping: 24 } },
        closed: { y: 20, opacity: 0, transition: { duration: 0.2 } }
    };

    // Remove animation delay for navbar
    return (
        !modalOpen && (
            <motion.div
                className="fixed top-0 inset-x-0 z-20"
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                transition={{ type: 'spring', stiffness: 120, damping: 20 }}
            >
                <header
                    className={
                        // Desktop: show bg when scrolled or open
                        // Mobile: show bg ONLY when open
                        `max-w-3xl mx-auto mt-4 rounded-2xl shadow-lg transition-all duration-300
                        ${
                            (scrolled || isOpen)
                                ? 'md:bg-[#101828]/80 md:backdrop-blur-lg md:border md:border-blue-400/10'
                                : 'md:bg-transparent md:border-transparent'
                        }
                        ${
                            isOpen
                                ? 'bg-[#101828]/80 backdrop-blur-lg border border-blue-400/10'
                                : 'bg-transparent border-transparent'
                        }`
                    }
                >
                    <div className="flex items-center justify-between px-6 py-3">

                        <nav className="hidden md:flex items-center gap-2 justify-center flex-1">
                            {navItems.map((item) => (
                                <a
                                    key={item.label}
                                    href={`#${item.sectionId}`}
                                    className={`relative px-4 py-2 text-sm font-semibold tracking-wider rounded-lg transition-colors z-10 ${
                                        activeSection === item.sectionId
                                            ? 'text-cyan-400 bg-cyan-500/10'
                                            : 'text-slate-200 hover:bg-slate-700/30'
                                    }`}
                                >
                                    {item.label}
                                    {activeSection === item.sectionId && (
                                        <motion.div
                                            layoutId="activeNavIndicator"
                                            className="absolute inset-0 bg-cyan-500/20 rounded-lg -z-10"
                                            initial={false}
                                            transition={{type: 'spring', stiffness: 500, damping: 40}}
                                        />
                                    )}
                                </a>
                            ))}
                        </nav>
                        {/* --- Mobile Navigation Button --- */}
                        <div className="md:hidden flex items-center">
                            <motion.button
                                onClick={() => setIsOpen(!isOpen)}
                                whileTap={{ scale: 0.95 }}
                                className="p-2 rounded-lg bg-slate-800/60 hover:bg-slate-700/80 transition"
                            >
                                <AnimatePresence mode="wait">
                                    {isOpen ? (
                                        <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
                                            <XIcon className="h-6 w-6 text-cyan-400" />
                                        </motion.div>
                                    ) : (
                                        <motion.div key="menu" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}>
                                            <MenuIcon className="h-6 w-6 text-cyan-400" />
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
                                className="md:hidden overflow-hidden px-4 pb-4"
                                variants={menuVariants}
                                initial="closed"
                                animate="open"
                                exit="closed"
                            >
                                <nav className="flex flex-col items-center gap-2 py-2 border-t border-blue-400/10">
                                    {navItems.map((item) => (
                                        <motion.a
                                            key={item.label}
                                            href={`#${item.sectionId}`}
                                            className={`block w-full text-center py-3 font-semibold rounded-lg transition ${
                                                activeSection === item.sectionId
                                                    ? 'text-cyan-400 bg-cyan-500/10'
                                                    : 'text-slate-200 hover:bg-slate-700/30'
                                            }`}
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
        )
    );
}