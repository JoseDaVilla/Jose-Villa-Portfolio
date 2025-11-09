import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../context/ThemeContext.jsx';


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


const SunIcon = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2" />
        <path d="M12 20v2" />
        <path d="m4.93 4.93 1.41 1.41" />
        <path d="m17.66 17.66 1.41 1.41" />
        <path d="M2 12h2" />
        <path d="M20 12h2" />
        <path d="m6.34 17.66-1.41 1.41" />
        <path d="m19.07 4.93-1.41 1.41" />
    </svg>
);

const MoonIcon = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <path d="M21 12.79A9 9 0 0 1 11.21 3 7 7 0 1 0 21 12.79z" />
    </svg>
);

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [activeSection, setActiveSection] = useState('hero');
    const [scrolled, setScrolled] = useState(false);

    const [modalOpen, setModalOpen] = useState(false);
    const { theme, toggleTheme } = useTheme();

    
    const navItems = [
        { label: 'Home', sectionId: 'hero' },
        { label: 'Experience', sectionId: 'experience' },
        { label: 'Projects', sectionId: 'projects' },
        { label: 'Skills', sectionId: 'skills' },
        { label: 'About', sectionId: 'aboutme' },
        { label: 'Contact', sectionId: 'contact' }
    ];

    
    useEffect(() => {
        const handleScroll = () => {
            
            setScrolled(window.scrollY > 50);
            
            let currentSection = '';
            for (const item of navItems) {
                const section = document.getElementById(item.sectionId);
                if (section) {
                    const rect = section.getBoundingClientRect();
                    
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
        handleScroll(); 

        return () => window.removeEventListener('scroll', handleScroll);
    }, [navItems]);

    
    useEffect(() => {
        const checkModal = () => setModalOpen(document.body.classList.contains('modal-open'));
        checkModal();
        const observer = new MutationObserver(checkModal);
        observer.observe(document.body, { attributes: true, attributeFilter: ['class'] });
        return () => observer.disconnect();
    }, []);

    
    const menuVariants = {
        open: { opacity: 1, height: 'auto', transition: { staggerChildren: 0.07 } },
        closed: { opacity: 0, height: 0, transition: { staggerChildren: 0.05, staggerDirection: -1, when: "afterChildren" } }
    };

    const menuItemVariants = {
        open: { y: 0, opacity: 1, transition: { type: 'spring', stiffness: 300, damping: 24 } },
        closed: { y: 20, opacity: 0, transition: { duration: 0.2 } }
    };

    
    const headerBackground = useMemo(() => {
        const base = 'transition-all duration-300 max-w-3xl mx-auto mt-4 rounded-2xl shadow-lg backdrop-saturate-150';
        const desktopState = scrolled || isOpen
            ? 'md:bg-[var(--color-navbar)] md:backdrop-blur-lg md:border md:border-[var(--color-navbar-border)]'
            : 'md:bg-transparent md:border-transparent';
        const mobileState = isOpen
            ? 'bg-[var(--color-navbar)] backdrop-blur-lg border border-[var(--color-navbar-border)]'
            : 'bg-transparent border-transparent';
        return `${base} ${desktopState} ${mobileState}`;
    }, [isOpen, scrolled]);

    const linkBaseClasses = 'relative px-4 py-2 text-sm font-semibold tracking-wider rounded-lg transition-colors z-10';
    const linkInactiveClasses = 'text-[var(--color-text-muted)] hover:bg-[var(--color-accent-soft)] hover:text-[var(--color-text-primary)]';
    const linkActiveClasses = 'text-[var(--color-accent)] bg-[var(--color-accent-soft)]';

    return (
        !modalOpen && (
            <motion.div

                className="fixed top-0 inset-x-0 z-20"
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                transition={{ type: 'spring', stiffness: 120, damping: 20 }}
            >
                <header
                    className={headerBackground}
                >
                    <div className="flex items-center justify-between px-6 py-3">

                        <nav className="hidden md:flex items-center gap-2 justify-center flex-1">
                            {navItems.map((item) => (
                                <a
                                    key={item.label}
                                    href={`#${item.sectionId}`}
                                    className={`${linkBaseClasses} ${
                                        activeSection === item.sectionId
                                            ? linkActiveClasses
                                            : linkInactiveClasses
                                    }`}
                                >
                                    {item.label}
                                    {activeSection === item.sectionId && (
                                        <motion.div
                                            layoutId="activeNavIndicator"
                                            className="absolute inset-0 rounded-lg -z-10 bg-[var(--color-accent-soft)]"
                                            initial={false}
                                            transition={{type: 'spring', stiffness: 500, damping: 40}}
                                        />
                                    )}
                                </a>
                            ))}
                        </nav>
                        <button
                            type="button"
                            onClick={toggleTheme}
                            className="hidden md:flex items-center justify-center w-10 h-10 rounded-full border border-[var(--color-border)] text-[var(--color-text-primary)] hover:text-[var(--color-accent)] hover:border-[var(--color-accent)] transition-colors"
                            aria-label="Toggle theme"
                        >
                            {theme === 'dark' ? <SunIcon className="w-5 h-5" /> : <MoonIcon className="w-5 h-5" />}
                        </button>
                        {/* --- Mobile Navigation Button --- */}
                        <div className="md:hidden flex items-center">
                            <motion.button
                                onClick={() => setIsOpen(!isOpen)}
                                whileTap={{ scale: 0.95 }}
                                className="p-2 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] hover:border-[var(--color-accent)] transition"
                            >
                                <AnimatePresence mode="wait">
                                    {isOpen ? (
                                        <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
                                            <XIcon className="h-6 w-6 text-[var(--color-accent)]" />
                                        </motion.div>
                                    ) : (
                                        <motion.div key="menu" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}>
                                            <MenuIcon className="h-6 w-6 text-[var(--color-accent)]" />
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
                                <div className="flex items-center justify-between py-3">
                                    <span className="text-sm font-semibold text-[var(--color-text-muted)]">Appearance</span>
                                    <button
                                        type="button"
                                        onClick={toggleTheme}
                                        className="flex items-center gap-2 rounded-full border border-[var(--color-border)] px-4 py-2 text-sm font-medium text-[var(--color-text-primary)] hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] transition-colors"
                                    >
                                        {theme === 'dark' ? (
                                            <>
                                                <SunIcon className="w-4 h-4" /> Light mode
                                            </>
                                        ) : (
                                            <>
                                                <MoonIcon className="w-4 h-4" /> Dark mode
                                            </>
                                        )}
                                    </button>
                                </div>
                                <nav className="flex flex-col items-center gap-2 py-2 border-t border-[var(--color-border)]">
                                    {navItems.map((item) => (
                                        <motion.a
                                            key={item.label}
                                            href={`#${item.sectionId}`}
                                            className={`block w-full text-center py-3 font-semibold rounded-lg transition ${
                                                activeSection === item.sectionId
                                                    ? linkActiveClasses
                                                    : linkInactiveClasses
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