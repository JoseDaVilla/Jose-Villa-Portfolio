import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// --- Icon Imports ---
import {
    SiReact, SiThreedotjs, SiTypescript, SiTailwindcss, SiJavascript, SiNextdotjs, SiHtml5, SiCss3,
    SiNodedotjs, SiPython, SiExpress, SiPostgresql, SiMongodb, SiDocker, SiWebgl,
    SiGit, SiSelenium, SiBlender, SiFigma, SiOpengl, SiStripe, SiWordpress
} from 'react-icons/si';

// --- Category Icon Components ---
const CodeIcon = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <polyline points="16 18 22 12 16 6"></polyline>
        <polyline points="8 6 2 12 8 18"></polyline>
    </svg>
);
const DatabaseIcon = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <ellipse cx="12" cy="5" rx="9" ry="3"></ellipse>
        <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"></path>
        <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"></path>
    </svg>
);
const WrenchIcon = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"></path>
    </svg>
);

// --- Custom SVG/Component Icons ---
const PlaywrightIcon = () => (
    <img src="/logos/playwright.svg" alt="Playwright" className="w-full h-full object-contain" />
);
const RestApiIcon = () => (
    <span className="font-bold text-gray-300 text-lg tracking-tighter">API</span>
);

// --- Data for Skills ---
const skillCategories = [
    {
        title: "Frontend & UI/UX",
        icon: CodeIcon,
        description: "Building responsive, accessible, and beautiful user interfaces with a focus on seamless 3D integration and performance.",
        skills: [
            { name: "React", logo: SiReact, color: "#61DAFB" },
            { name: "Next.js", logo: SiNextdotjs, color: "#FFFFFF" },
            { name: "Three.js", logo: SiThreedotjs, color: "#FFFFFF" },
            { name: "TypeScript", logo: SiTypescript, color: "#3178C6" },
            { name: "Tailwind CSS", logo: SiTailwindcss, color: "#06B6D4" },
            { name: "JavaScript", logo: SiJavascript, color: "#F7DF1E" },
            { name: "HTML5", logo: SiHtml5, color: "#E34F26" },
            { name: "CSS3", logo: SiCss3, color: "#1572B6" },
            { name: "Wordpress", logo: SiWordpress, color: "#21759B" },
        ]
    },
    {
        title: "Backend & Data",
        icon: DatabaseIcon,
        description: "Developing robust server-side logic and scalable data solutions that power complex applications with security and efficiency.",
        skills: [
            { name: "Node.js", logo: SiNodedotjs, color: "#339933" },
            { name: "Python", logo: SiPython, color: "#3776AB" },
            { name: "Express", logo: SiExpress, color: "#FFFFFF" },
            { name: "PostgreSQL", logo: SiPostgresql, color: "#4169E1" },
            { name: "MongoDB", logo: SiMongodb, color: "#47A248" },
            { name: "Docker", logo: SiDocker, color: "#2496ED" },
            { name: "REST APIs", logo: RestApiIcon, color: "#d1d5db" },
            { name: "WebGL", logo: SiWebgl, color: "#990000" },
        ]
    },
    {
        title: "Tools & Workflow",
        icon: WrenchIcon,
        description: "Utilizing industry-standard tools and best practices to ensure code quality, automation, and efficient development cycles.",
        skills: [
            { name: "Git", logo: SiGit, color: "#F05032" },
            { name: "Playwright", logo: PlaywrightIcon, color: "#2EAD33" },
            { name: "Selenium", logo: SiSelenium, color: "#43B02A" },
            { name: "Blender", logo: SiBlender, color: "#F5792A" },
            { name: "Figma", logo: SiFigma, color: "#F24E1E" },
            { name: "GLSL", logo: SiOpengl, color: "#5586A4" },
            { name: "Stripe", logo: SiStripe, color: "#635BFF" },
        ]
    }
];

function SkillIcon({ skill }) {
    const LogoComponent = skill.logo;
    return (
        <div className="group relative flex flex-col items-center text-center gap-2">
            <div className="w-16 h-16 p-3 bg-gray-900/50 rounded-2xl flex items-center justify-center transition-all duration-300 ring-1 ring-orange-400/20 group-hover:ring-orange-400 group-hover:-translate-y-1">
                <LogoComponent 
                    className="w-full h-full object-contain"
                    style={{ color: skill.color }}
                />
            </div>
            <p className="text-sm font-semibold text-gray-300 transition-colors group-hover:text-white">{skill.name}</p>
        </div>
    );
}

export default function Skills() {
    const [activeCategory, setActiveCategory] = useState(skillCategories[0].title);
    const currentCategory = skillCategories.find(cat => cat.title === activeCategory);

    return (
        <section id="skills" className="py-24 sm:py-32 text-white relative overflow-hidden">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[50rem] h-[50rem] bg-orange-500/10 rounded-full blur-3xl opacity-50 pointer-events-none z-5"></div>
            
            <div className="container px-4 mx-auto relative z-10">
                <motion.div
                    className="text-center mb-16"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.6 }}
                >
                    <h2 className="text-4xl sm:text-5xl font-thin tracking-[0.2em] uppercase text-gray-100" style={{textShadow: '0 0 15px rgba(245, 158, 66, 0.5)'}}>
                        My Tech Arsenal
                    </h2>
                    <p className="mt-4 text-md text-gray-400 max-w-3xl mx-auto font-light tracking-wider opacity-80">
                        An interactive look at the languages, frameworks, and tools I use to bring ideas to life.
                    </p>
                </motion.div>

                <div className="flex flex-col md:flex-row gap-10 lg:gap-16">
                    <motion.div 
                        className="w-full md:w-1/4"
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                    >
                        <div className="flex flex-row md:flex-col gap-2 sticky top-28">
                            {skillCategories.map((category) => (
                                <button
                                    key={category.title}
                                    onClick={() => setActiveCategory(category.title)}
                                    className={`relative w-full flex items-center gap-4 p-4 rounded-lg text-left transition-all duration-300 overflow-hidden ${
                                        activeCategory === category.title
                                            ? 'text-white shadow-lg'
                                            : 'bg-gray-900/50 text-gray-300 hover:bg-gray-800/60 hover:text-white'
                                    }`}
                                >
                                    <AnimatePresence>
                                        {activeCategory === category.title && (
                                             <motion.div
                                                layoutId="skill-category-bg"
                                                className="absolute inset-0 bg-gradient-to-r from-orange-500 to-amber-500 z-0"
                                                initial={false}
                                                animate={{opacity: 1}}
                                                exit={{opacity: 0}}
                                            />
                                        )}
                                    </AnimatePresence>
                                    <category.icon className={`relative z-10 w-7 h-7 flex-shrink-0 transition-colors ${activeCategory === category.title ? 'text-white' : 'text-orange-400'}`}/>
                                    <span className="relative z-10 font-semibold hidden sm:inline">{category.title}</span>
                                </button>
                            ))}
                        </div>
                    </motion.div>

                    <div className="w-full md:w-3/4">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeCategory}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 0.4 }}
                            >
                                <div className="bg-[#101727]/40 backdrop-blur-lg p-8 rounded-2xl border border-orange-400/20 shadow-2xl shadow-orange-900/20">
                                    <p className="text-gray-400 mb-8 text-base leading-relaxed">{currentCategory.description}</p>
                                    <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-x-4 gap-y-8">
                                        {currentCategory.skills.map((skill) => (
                                            <SkillIcon key={skill.name} skill={skill} />
                                        ))}
                                    </div>
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </section>
    );
}