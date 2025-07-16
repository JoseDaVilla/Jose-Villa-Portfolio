import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ProjectModal from './ProjectModal';
import { useBodyScrollLock } from '../hooks/useBodyScrollLock';
import { useImagePreloader } from '../hooks/useImagePreloader';

const projectsData = [
    // The project data remains the same...
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
        links: {
            github: "https://github.com/josevilla/galaxy-generator",
            live: "https://galaxy-generator-demo.com"
        }
    },
    {
        id: 4,
        title: "3D Portfolio Gallery",
        category: "3D & Graphics",
        summary: "Immersive 3D gallery to showcase creative projects.",
        description: "A 3D gallery space built with Three.js, allowing users to navigate a virtual environment to view projects. Features custom shaders for an engaging user experience.",
        image: "images/projects/3d-gallery.jpg",
        images: ["images/projects/3d-gallery.jpg", "images/projects/3d-gallery-2.jpg", "images/projects/3d-gallery-3.jpg"],
        technologies: ["Three.js", "JavaScript", "GLSL Shaders", "HTML5", "CSS3"],
        features: ["Immersive 3D environment", "Custom GLSL shaders", "Intuitive navigation", "Dynamic content loading", "Mobile-optimized performance"],
        links: {
            github: "https://github.com/josevilla/3d-gallery",
            live: "https://3d-gallery-demo.com"
        }
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
        links: {
            github: "https://github.com/josevilla/ai-summarizer",
            live: "https://ai-summarizer-demo.com"
        }
    },
];

const FilterButton = ({ label, isActive, onClick }) => (
    <motion.button
        onClick={onClick}
        className={`relative px-5 py-2 text-sm font-semibold rounded-full transition-all duration-300 overflow-hidden ${
            isActive ? 'text-white' : 'text-cyan-300 bg-gray-900/50 ring-1 ring-cyan-400/30 hover:text-white'
        }`}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
    >
        <AnimatePresence>
            {isActive && (
                <motion.div
                    layoutId="filter-active-bg"
                    className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-teal-500 z-0"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                />
            )}
        </AnimatePresence>
        <span className="relative z-10">{label}</span>
    </motion.button>
);


function ProjectCard({ project, onSelect }) {
    return (
        <motion.div
            layout
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="group relative bg-[#101727]/40 backdrop-blur-lg rounded-2xl overflow-hidden border border-cyan-400/20 shadow-lg hover:shadow-cyan-900/40 hover:border-cyan-400/50 transition-all duration-300 cursor-pointer"
            onClick={() => onSelect(project)}
        >
            <div className="overflow-hidden">
                <motion.img
                    src={project.image}
                    alt={`${project.title} preview`}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                />
            </div>
            <div className="p-5">
                <h3 className="text-lg font-bold text-gray-100 mb-1">{project.title}</h3>
                <p className="text-gray-400 text-sm mb-4 h-10">{project.summary}</p>
                <div className="flex flex-wrap gap-2">
                    {project.technologies.slice(0, 3).map(tech => (
                        <span key={tech} className="px-2.5 py-1 text-xs font-medium rounded-full bg-cyan-900/50 text-cyan-200">
                            {tech}
                        </span>
                    ))}
                    {project.technologies.length > 3 && (
                        <span className="px-2.5 py-1 text-xs font-medium rounded-full bg-gray-700/50 text-gray-300">
                            +{project.technologies.length - 3}
                        </span>
                    )}
                </div>
            </div>
            <div className="absolute top-4 right-4 px-3 py-1 text-xs font-semibold rounded-full bg-black/50 text-white backdrop-blur-sm">
                {project.category}
            </div>
        </motion.div>
    );
}

export default function Projects() {
    const [selectedProject, setSelectedProject] = useState(null);
    const [activeFilter, setActiveFilter] = useState("All");

    useImagePreloader(projectsData);
    useBodyScrollLock(!!selectedProject);

    const projectCategories = useMemo(() => ["All", ...new Set(projectsData.map(p => p.category))], []);

    const filteredProjects = useMemo(() =>
        activeFilter === "All"
            ? projectsData
            : projectsData.filter(p => p.category === activeFilter),
        [activeFilter]
    );

    return (
        // FIXED: Removed the opaque `bg-[#0a0f19]` class from this section
        <section id="projects" className="py-24 sm:py-32 text-white relative overflow-hidden">
            {/* Background glow element, now with a z-index to sit behind content */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[50rem] h-[50rem] bg-cyan-500/10 rounded-full blur-3xl opacity-50 pointer-events-none z-5"></div>

            <div className="container px-4 mx-auto relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl sm:text-5xl font-thin tracking-[0.2em] uppercase text-gray-100" style={{textShadow: '0 0 15px rgba(34, 211, 238, 0.5)'}}>
                        My Projects
                    </h2>
                    <p className="mt-4 text-md text-gray-400 max-w-2xl mx-auto font-light tracking-wider opacity-80">
                        Here's a selection of my work. Feel free to explore the details of each project.
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="flex justify-center flex-wrap gap-3 mb-12"
                >
                    {projectCategories.map(category => (
                        <FilterButton
                            key={category}
                            label={category}
                            isActive={activeFilter === category}
                            onClick={() => setActiveFilter(category)}
                        />
                    ))}
                </motion.div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    <AnimatePresence>
                        {filteredProjects.map(project => (
                            <ProjectCard
                                key={project.id}
                                project={project}
                                onSelect={setSelectedProject}
                            />
                        ))}
                    </AnimatePresence>
                </div>
            </div>

            <AnimatePresence>
                {selectedProject && (
                    <ProjectModal
                        project={selectedProject}
                        onClose={() => setSelectedProject(null)}
                    />
                )}
            </AnimatePresence>
        </section>
    );
}