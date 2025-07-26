import { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ProjectModal from './ProjectModal'; // Assuming this component exists
import { useBodyScrollLock } from '../hooks/useBodyScrollLock'; // Assuming this hook exists
import { useImagePreloader } from '../hooks/useImagePreloader'; // Assuming this hook exists

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
        image: "images/projects/proaxis.jpg",
        images: ["images/projects/proaxis.jpg", "images/projects/proaxis-2.jpg", "images/projects/proaxis-3.jpg"],
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
        image: "images/projects/trading-bot.jpg",
        images: ["images/projects/trading-bot.jpg", "images/projects/trading-bot-2.jpg", "images/projects/trading-bot-3.jpg"],
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
        image: "images/projects/galaxy-generator.jpg",
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
        image: "images/projects/3d-gallery.jpg",
        images: ["images/projects/3d-gallery.jpg", "images/projects/3d-gallery-2.jpg", "images/projects/3d-gallery-3.jpg"],
        technologies: ["Three.js", "JavaScript", "GLSL Shaders", "HTML5", "CSS3"],
        features: ["Immersive 3D environment", "Custom GLSL shaders", "Intuitive navigation", "Dynamic content loading", "Mobile-optimized performance"],
        links: { github: "https://github.com/josevilla/3d-gallery", live: "https://3d-gallery-demo.com" },

        iframeUrl: "https://portal-chi-five.vercel.app/"
    },
    {
        id: 5,
        title: "AI Content Summarizer",
        category: "Web App",
        summary: "SaaS platform that summarizes long-form content using AI.",
        description: "A React-based web application that leverages OpenAI's API to provide concise summaries of articles, reports, and other documents, increasing reading efficiency.",
        image: "images/projects/summarizer.jpg",
        images: ["images/projects/summarizer.jpg", "images/projects/summarizer-2.jpg", "images/projects/summarizer-3.jpg"],
        technologies: ["React", "Tailwind CSS", "Node.js", "OpenAI API", "Vercel"],
        features: ["URL and text input summarization", "Adjustable summary length", "Secure API handling", "User authentication", "History of summarized articles"],
        links: { github: "https://github.com/josevilla/ai-summarizer", live: "https://ai-summarizer-demo.com" },
        iframeUrl: "https://ai-summarizer-demo.com" // Example of another iframe
    },
];

// ... rest of the Projects.jsx component remains unchanged
const FilterButton = ({ label, isActive, onClick }) => (
    <motion.button
        onClick={onClick}
        className={`relative px-5 py-2 text-sm font-medium rounded-full transition-colors duration-300 ${
            isActive ? 'text-white' : 'text-cyan-300 bg-transparent hover:bg-cyan-500/10'
        }`}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
    >
        {isActive && (
            <motion.div
                layoutId="active-filter-pill"
                className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-teal-500 rounded-full"
                style={{ borderRadius: 9999 }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
            />
        )}
        <span className="relative z-10">{label}</span>
    </motion.button>
);

const ProjectCard = ({ project, onSelect, className = "" }) => (
    <motion.div
        layout
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ duration: 0.4, ease: "easeInOut" }}
        className={`group relative flex flex-col bg-slate-800/50 rounded-2xl overflow-hidden border border-slate-700/80 hover:border-cyan-400/60 transition-all duration-300 cursor-pointer shadow-lg ${className}`}
        onClick={() => onSelect(project)}
    >
        <div className="relative overflow-hidden flex-grow">
            <img
                src={project.image}
                alt={`${project.title} preview`}
                className="w-full h-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-105"
                loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
        </div>
        <div className="p-6 bg-slate-800/50">
            <p className="text-xs font-semibold uppercase tracking-wider text-cyan-400 mb-2">{project.category}</p>
            <h3 className="text-xl font-bold text-slate-100 mb-2 truncate">{project.title}</h3>
            <p className="text-slate-400 text-sm mb-4 h-10">{project.summary}</p>
            <div className="flex flex-wrap gap-2 pt-2 border-t border-slate-700/50">
                {project.technologies.slice(0, 4).map(tech => (
                    <span key={tech} className="px-2.5 py-1 text-xs font-medium rounded-full bg-slate-700/70 text-slate-300">
                        {tech}
                    </span>
                ))}
                {project.technologies.length > 4 && (
                    <span className="px-2.5 py-1 text-xs font-medium rounded-full bg-slate-600/70 text-slate-200">
                        +{project.technologies.length - 4} more
                    </span>
                )}
            </div>
        </div>
    </motion.div>
);

export default function Projects() {
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
            case 0: return "lg:col-span-2 lg:row-span-2";
            case 1: return "lg:col-span-1 lg:row-span-1";
            case 2: return "lg:col-span-1 lg:row-span-1";
            case 3: return "lg:col-span-2 lg:row-span-1";
            case 4: return "lg:col-span-3 lg:row-span-1";
            case 5: return "lg:col-span-1 lg:row-span-1";
            default: return "lg:col-span-1 lg:row-span-1";
        }
    };

    const headerVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" }}
    };

    return (
        <section id="projects" className="py-24 sm:py-32 text-white relative">
            <div className="container px-4 mx-auto relative z-10">
                <motion.div 
                    className="text-center mb-16"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.5 }}
                    variants={headerVariants}
                >
                    <h2 className="text-4xl sm:text-5xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-slate-100 to-slate-400">
                        Featured Projects
                    </h2>
                    <p className="mt-4 text-lg text-slate-400 max-w-2xl mx-auto">
                        A curated selection of my work, showcasing my skills in web development, automation, and 3D graphics.
                    </p>
                </motion.div>

                <motion.div 
                    layout
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 auto-rows-[22rem] gap-6"
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