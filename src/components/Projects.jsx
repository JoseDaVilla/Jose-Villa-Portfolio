import { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ProjectModal from './ProjectModal';
import { useBodyScrollLock } from '../hooks/useBodyScrollLock';
import { useImagePreloader } from '../hooks/useImagePreloader';
import { useTheme } from '../context/ThemeContext';

// --- DATA ---
const projectsData = [
    {
        id: 1,
        title: "Spa Management Dashboard",
        category: "Web App",
        summary: "Enterprise-grade dashboard for a multi-location spa chain.",
        description: "A sophisticated full-stack web application for a premium spa chain with 20+ US locations, featuring comprehensive operations management, sales tracking, and HR automation.",
        image: "images/projects/spa.jpg",
        images: ["images/projects/spa.jpg", "images/projects/spa1.jpg", "images/projects/spa2.jpg", "images/projects/spa3.jpg", "images/projects/spa4.jpg"],
        technologies: ["Next.js", "Express.js", "PostgreSQL", "SendGrid", "Cloudinary", "JWT", "Chart.js"],
        features: ["Real-time multi-location availability", "Advanced sales analytics", "Automated payroll processing", "Employee management and scheduling", "Integrated Point of Sale", "Dynamic financial reporting", "Biometric time tracking", "HIPAA-compliant data management"],
        links: { github: null, live: null },
        privacyNote: "Due to client confidentiality, the source code and live demo are not public."
    },
    {
        id: 6,
        title: "ProAxis",
        category: "SaaS Platform",
        summary: "A 'Marketing Agency in a Box' SaaS for digital marketing partners.",
        description: "An all-in-one, white-label platform that empowers entrepreneurs to launch their own digital marketing agencies. ProAxis includes a comprehensive Training Academy, a built-in CRM for client management, team and service management tools, Stripe connected accounts for seamless payment processing, and a powerful drag-and-drop form builder. It also features integrated calendars with automated Zoom link generation and a robust commission tracking system for partners.",
        // Use the provided images (located in public/images/projects/)
        image: "images/projects/proaxislogo1.png",
        images: [
            "images/projects/proaxis.png",
            "images/projects/proaxis2.png",
            "images/projects/proaxis3.png",
            "images/projects/proaxis4.png",
            "images/projects/proaxis5.png",
            "images/projects/proaxis6.png"
        ],
        technologies: ["Next.js", "React", "Node.js", "PostgreSQL", "Stripe Connect", "Google Calendar API", "Zoom API", "Tailwind CSS", "Prisma"],
        features: ["White-Label SaaS Platform", "Integrated CRM System", "Partner Training Academy", "Stripe Connected Accounts", "Drag-and-Drop Form Builder", "Employee & Service Management", "Automated Commission System", "Google Calendar & Zoom Integration", "User Authentication & Roles"],
        links: { github: null, live: null },
        privacyNote: "The platform is proprietary, so the source code and a live demo are available only upon request."
    },
    {
        id: 2,
        title: "Trading Bot",
        category: "Automation",
        summary: "Automated trading bot using Alpaca and EODHD APIs.",
        description: "A Python-based trading bot using Alpaca for real-time trading and EODHD for historical data. It executes momentum strategies across 20+ symbols, analyzing tick data for precision.",
        image: "images/projects/tradingbot.png",
        images: [
            // Added alpaca and eodh images for the carousel
            "images/projects/tradingbot.png",
            "images/projects/alpaca.png",
            "images/projects/eodh.png",
            "images/projects/trading-bot-2.jpg",
            "images/projects/trading-bot-3.jpg"
        ],
        technologies: ["Python", "Alpaca API", "EODHD API", "Matplotlib", "Pandas", "NumPy"],
        features: ["Real-time market data processing", "Momentum-based trading strategy", "Supports 20+ trading symbols", "Tick-level data analysis", "Statistical performance tracking", "Automated order execution"],
        links: { github: null, live: null },
        privacyNote: "The source code is private due to the proprietary nature of the algorithms."
    },
    {
        id: 3,
        title: "Galaxy Generator",
        category: "3D & Graphics",
        summary: "Interactive Three.js app to generate animated galaxies with GLSL.",
        description: "A visually stunning Galaxy Generator using Three.js and custom GLSL shaders. It allows users to customize galaxy parameters and demonstrates advanced WebGL techniques.",
        image: "images/projects/galaxy.png",
        images: ["images/projects/galaxy-generator.jpg", "images/projects/galaxy-generator-2.jpg", "images/projects/galaxy-generator-3.jpg"],
        technologies: ["Three.js", "GLSL Shaders", "WebGL", "JavaScript", "HTML5", "CSS3"],
        features: ["Real-time galaxy generation", "Custom GLSL vertex and fragment shaders", "Interactive parameter controls", "Optimized for performance", "Dynamic spin and color customization"],
        links: { github: "https://github.com/josevilla/galaxy-generator", live: "https://galaxy-generator-animated-amber.vercel.app/" },
        // NEW: Added iframeUrl for live demo inside the modal
        iframeUrl: "https://galaxy-generator-animated-amber.vercel.app/"
    },
    {
        id: 4,
        title: "Portal Entry / Blender + Three.js",
        category: "3D & Graphics",
        summary: "Immersive 3D gallery to showcase creative projects.",
        description: "A 3D gallery space built with Three.js, allowing users to navigate a virtual environment to view projects. Features custom shaders for an engaging user experience.",
        image: "images/projects/portal.png",
        images: ["images/projects/3d-gallery.jpg", "images/projects/3d-gallery-2.jpg", "images/projects/3d-gallery-3.jpg"],
        technologies: ["Three.js", "JavaScript", "GLSL Shaders", "HTML5", "CSS3"],
        features: ["Immersive 3D environment", "Custom GLSL shaders", "Intuitive navigation", "Dynamic content loading", "Mobile-optimized performance"],
        links: { github: "https://github.com/josevilla/3d-gallery", live: "https://3d-gallery-demo.com" },

        iframeUrl: "https://portal-chi-five.vercel.app/"
    }
];

// ... rest of the Projects.jsx component remains unchanged
const FilterButton = ({ label, isActive, onClick }) => (
    <motion.button
        onClick={onClick}
        className={`relative px-5 py-2 text-sm font-medium rounded-full transition-all duration-300 ${
            isActive
                ? 'text-white bg-[var(--color-button-primary)] shadow-[0_12px_26px_-12px_rgba(37,99,235,0.55)]'
                : 'text-[var(--color-text-muted)] hover:bg-[var(--color-accent-soft)] hover:text-[var(--color-text-primary)]'
        }`}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
    >
        {isActive && (
            <motion.div
                layoutId="active-filter-pill"
                className="absolute inset-0 bg-gradient-to-r from-[var(--color-accent)] to-emerald-400 rounded-full"
                style={{ borderRadius: 9999 }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
            />
        )}
        <span className="relative z-10">{label}</span>
    </motion.button>
);

const ProjectCard = ({ project, onSelect, className = "" }) => {
    const { theme } = useTheme();
    const isDark = theme === 'dark';

    // --- Light-mode color variants (rotate per project) ---
    const variants = [
		{ // Indigo
			cardBg: 'linear-gradient(135deg,#eef2ff 0%, #e0e7ff 100%)',
			contentBg: 'linear-gradient(180deg, rgba(255,255,255,0.92), rgba(239,246,255,0.82))',
			footerBg: '#4338ca',
			accentColor: '#4f46e5', // indigo-600
			textColor: '#0f172a',
			border: '#c7d2fe',
			badgeBg: '#ffffff'
		},
		{ // Coral
			cardBg: 'linear-gradient(135deg,#fff5f4 0%, #ffe7e0 100%)',
			contentBg: 'linear-gradient(180deg, rgba(255,255,255,0.95), rgba(255,245,240,0.9))',
			footerBg: '#fb7185',
			accentColor: '#fb7185',
			textColor: '#042029',
			border: '#fecaca',
			badgeBg: '#ffffff'
		},
		{ // Teal
			cardBg: 'linear-gradient(135deg,#ecfeff 0%, #dffafe 100%)',
			contentBg: 'linear-gradient(180deg, rgba(255,255,255,0.94), rgba(237,253,250,0.88))',
			footerBg: '#0d9488',
			accentColor: '#14b8a6',
			textColor: '#042029',
			border: '#99f6e4',
			badgeBg: '#ffffff'
		},
		{ // Amber
			cardBg: 'linear-gradient(135deg,#fff7ed 0%, #fff1d6 100%)',
			contentBg: 'linear-gradient(180deg, rgba(255,255,255,0.95), rgba(255,250,235,0.9))',
			footerBg: '#d97706',
			accentColor: '#f59e0b',
			textColor: '#1f2937',
			border: '#fde68a',
			badgeBg: '#ffffff'
		}
	];

    // --- Dark-mode variants (matching tones, subtle glows) ---
    const darkVariants = [
        { // Indigo dark
            cardBg: 'linear-gradient(135deg, rgba(31,41,255,0.06), rgba(79,70,229,0.06))',
            contentBg: 'linear-gradient(180deg, rgba(17,24,39,0.6), rgba(15,23,42,0.65))',
            footerBg: '#4338ca',
            accentColor: '#60a5fa', // indigo-400 glow
            textColor: '#e6eef8',
            border: 'rgba(79,70,229,0.18)',
            badgeBg: 'rgba(79,70,229,0.08)'
        },
        { // Coral dark
            cardBg: 'linear-gradient(135deg, rgba(255,203,213,0.03), rgba(251,113,133,0.04))',
            contentBg: 'linear-gradient(180deg, rgba(8,10,14,0.6), rgba(15,23,42,0.65))',
            footerBg: '#fb7185',
            accentColor: '#fb7185',
            textColor: '#fdecef',
            border: 'rgba(251,113,133,0.12)',
            badgeBg: 'rgba(251,113,133,0.06)'
        },
        { // Teal dark
            cardBg: 'linear-gradient(135deg, rgba(20,184,166,0.03), rgba(20,184,166,0.04))',
            contentBg: 'linear-gradient(180deg, rgba(6,8,10,0.6), rgba(15,23,42,0.65))',
            footerBg: '#0d9488',
            accentColor: '#2dd4bf',
            textColor: '#dffaf6',
            border: 'rgba(20,184,166,0.12)',
            badgeBg: 'rgba(20,184,166,0.06)'
        },
        { // Amber dark
            cardBg: 'linear-gradient(135deg, rgba(245,158,11,0.03), rgba(245,158,11,0.04))',
            contentBg: 'linear-gradient(180deg, rgba(10,12,15,0.6), rgba(15,23,42,0.65))',
            footerBg: '#d97706',
            accentColor: '#fbbf24',
            textColor: '#fff7e6',
            border: 'rgba(245,158,11,0.12)',
            badgeBg: 'rgba(245,158,11,0.06)'
        }
    ];

    // --- Special variant for ProAxis (project.id === 6) ---
    const specialLightVariant = {
        cardBg: 'linear-gradient(135deg,#f5f3ff 0%, #efe6ff 100%)',
        contentBg: 'linear-gradient(180deg, rgba(255,255,255,0.95), rgba(245,238,255,0.9))',
        footerBg: '#7c3aed', // violet
        accentColor: '#7c3aed',
        textColor: '#0f172a',
        border: '#d6bbfb',
        badgeBg: '#ffffff'
    };

    const specialDarkVariant = {
        cardBg: 'linear-gradient(135deg, rgba(124,58,237,0.04), rgba(99,102,241,0.04))',
        contentBg: 'linear-gradient(180deg, rgba(17,24,39,0.6), rgba(15,23,42,0.65))',
        footerBg: '#7c3aed',
        accentColor: '#a78bfa',
        textColor: '#f6f2ff',
        border: 'rgba(124,58,237,0.12)',
        badgeBg: 'rgba(124,58,237,0.06)'
    };

    // Use special variant for ProAxis (id 6), otherwise rotating variants
    let variant;
    if (project.id === 6) {
        variant = isDark ? specialDarkVariant : specialLightVariant;
    } else {
        variant = !isDark ? variants[project.id % variants.length] : darkVariants[project.id % darkVariants.length];
    }

    return (
        <motion.div
            layout
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className={`group relative flex flex-col rounded-2xl overflow-hidden border transition-all duration-300 cursor-pointer shadow-lg ${className}`}
            onClick={() => onSelect(project)}
            style={{
                background: variant.cardBg,
                borderColor: variant.border,
                boxShadow: isDark ? '0 10px 30px rgba(2,6,23,0.6)' : undefined
            }}
        >
            {/* --- Image: make this area larger by using flex-auto and full-height image --- */}
            <div className="relative overflow-hidden flex-auto">
                <img
                    src={project.image}
                    alt={`${project.title} preview`}
                    // fill the container and crop (object-cover) so image appears larger
                    className={`w-full h-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-105 ${project.image === "images/projects/proaxislogo1.png" ? "bg-[#c395ba69]" : ""}`}
                    loading="lazy"
                />
                <div
                    className="absolute inset-0"
                    style={{
                        background: isDark
                            ? 'linear-gradient(to top, rgba(2,6,23,0.6), rgba(2,6,23,0.15))'
                            : 'linear-gradient(to top, rgba(2,6,23,0.03), rgba(2,6,23,0.00))'
                    }}
                />
            </div>

            {/* --- Content panel: reduce height by making it flex-none and limiting maxHeight --- */}
            <div
                className="p-4 transition-colors duration-300 flex-none"
                style={{ background: variant.contentBg, maxHeight: '6rem', overflow: 'hidden' }}
            >
                <p className="text-xs font-semibold uppercase tracking-wider mb-1" style={{ color: variant.accentColor }}>
                    {project.category}
                </p>
                <h3 className="text-lg font-bold mb-1 truncate" style={{ color: variant.textColor }}>
                    {project.title}
                </h3>
                <p className="text-sm mb-0 leading-tight" style={{ color: isDark ? '#94a3b8' : '#475569' }}>
                    {project.summary}
                </p>
            </div>

            {/* Footer: technologies + badges, unchanged aside from slightly reduced padding */}
            <div
                className="p-3 border-t transition-all duration-300 flex flex-wrap items-center gap-2"
                style={{
                    background: variant.footerBg,
                    borderTop: `1px solid ${variant.border}`,
                    alignItems: 'center',
                    color: variant.textColor
                }}
            >
                {project.technologies.slice(0, 4).map(tech => (
                    <span
                        key={tech}
                        className="px-2.5 py-1 text-xs font-medium rounded-full"
                        style={{
                            backgroundColor: variant.badgeBg,
                            color: isDark ? '#e6eef8' : 'black',
                        }}
                    >
                        {tech}
                    </span>
                ))}
                {project.technologies.length > 4 && (
                    <span
                        className="px-2.5 py-1 text-xs font-medium rounded-full"
                        style={{
                            backgroundColor: variant.badgeBg,
                            color: isDark ? '#e2e8f0' : '#1e293b',
                            border: !isDark ? `1px solid white` : `1px solid rgba(255,255,255,0.03)`
                        }}
                    >
                        +{project.technologies.length - 4} more
                    </span>
                )}
            </div>
        </motion.div>
    );
};

export default function Projects() {
    const { theme } = useTheme();
    const isDark = theme === 'dark';
    const [selectedProject, setSelectedProject] = useState(null);

    useImagePreloader(projectsData.flatMap(p => p.images));
    useBodyScrollLock(!!selectedProject);

    // Add/remove 'modal-open' class to body when modal is open
    useEffect(() => {
        if (selectedProject) {
            document.body.classList.add('modal-open');
        } else {
            document.body.classList.remove('modal-open');
        }
        return () => {
            document.body.classList.remove('modal-open');
        };
    }, [selectedProject]);

    const filteredProjects = projectsData;

    const handleSelectProject = (project) => setSelectedProject(project);
    const handleCloseModal = () => setSelectedProject(null);

    const getGridSpan = (index) => {
        const patternIndex = index % 6;
        switch (patternIndex) {
            case 0: return "lg:col-span-2 lg:row-span-1";
            case 1: return "lg:col-span-2 lg:row-span-1";
            case 2: return "lg:col-span-2 lg:row-span-1";
            case 3: return "lg:col-span-2 lg:row-span-1";
            case 4: return "lg:col-span-2 lg:row-span-1";
            case 5: return "lg:col-span-1 lg:row-span-1";
            case 6: return "lg:col-span-1 lg:row-span-1";
            default: return "lg:col-span-1 lg:row-span-1";
        }
    };

    const headerVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" }}
    };

    return (
        <section
            id="projects"
            className="py-24 sm:py-32 relative transition-colors duration-300 bg-gradient-to-b from-white via-[#edf2ff] to-[#e4ecfb] dark:bg-transparent dark:from-transparent dark:via-transparent dark:to-transparent"
        >
            <div className="container px-4 mx-auto relative z-10">
                <motion.div
                    className="text-center mb-16"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.5 }}
                    variants={headerVariants}
                >
                    <h2 
                        className="text-4xl sm:text-5xl font-bold tracking-tight transition-colors"
                        style={{ color: isDark ? '#ffffff' : '#111827' }}
                    >
                        Featured Projects
                    </h2>
                    <p 
                        className="mt-4 text-lg max-w-2xl mx-auto"
                        style={{ color: isDark ? '#94a3b8' : '#4b5563' }}
                    >
                        A curated selection of my work, showcasing my skills in web development, automation, and 3D graphics.
                    </p>
                </motion.div>

                <motion.div 
                    layout
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6  lg:auto-rows-[18rem] auto-rows-[28rem] gap-6"
                >
                    {/* AnimatePresence is correctly wrapping the map function here */}
                    <AnimatePresence>
                        {filteredProjects.map((project, index) => (
                            <ProjectCard
                                key={project.id}
                                project={project}
                                onSelect={handleSelectProject}
                                className={getGridSpan(index)}
                            />
                        ))}
                    </AnimatePresence>
                </motion.div>
            </div>

            <AnimatePresence>
                {selectedProject && (
                    <ProjectModal
                        project={selectedProject}
                        onClose={handleCloseModal}
                    />
                )}
            </AnimatePresence>
        </section>
    );
}