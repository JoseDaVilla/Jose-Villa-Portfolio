import React from 'react';
import { motion } from 'framer-motion';

// --- Icon Components (keep these as they were) ---
const DashboardIcon = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="3" y1="9" x2="21" y2="9"></line><line x1="9" y1="21" x2="9" y2="9"></line></svg>
);
const TeamIcon = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M22 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
);
const ClientIcon = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
);
const WebScrapingIcon = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M10 17a5 5 0 0 1-5-5 5 5 0 0 1 5-5h8a5 5 0 0 1 5 5 5 5 0 0 1-5 5h-8z"></path><path d="M16 7a1 1 0 0 1-1-1 1 1 0 0 1 1-1h4a1 1 0 0 1 1 1 1 1 0 0 1-1 1h-4z"></path></svg>
);
const AutomationIcon = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M12 20V10"></path><path d="M18 20V4"></path><path d="M6 20V16"></path></svg>
);
const ArrowRightIcon = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" {...props}><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
);

const experienceHighlights = [
    { icon: DashboardIcon, title: 'Full-Stack Platform Development', description: 'Led end-to-end development of client platforms and dashboards, from initial planning and architecture through deployment and maintenance.'},
    { icon: TeamIcon, title: 'Project & Team Leadership', description: 'Managed development team operations, coordinating tasks, establishing timelines, and ensuring on-time delivery of high-quality solutions.'},
    { icon: ClientIcon, title: 'Client Solution Architecture', description: 'Collaborated directly with clients to gather requirements, define technical specifications, and deliver tailored solutions aligned with business objectives.'},
    { icon: AutomationIcon, title: 'Automation & Data Engineering', description: 'Engineered custom automations and data pipelines to streamline operations, enhance marketing performance, and drive measurable business impact.'}
];

export default function Experience() {
    return (
        <section
            id="experience"
            className="py-24 sm:py-32 relative overflow-hidden transition-colors duration-300 bg-transparent"
        >
            <div className="container px-4 mx-auto relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <h2 
                        className="text-4xl sm:text-5xl font-thin tracking-[0.2em] uppercase transition-colors"
                        style={{ 
                            color: '#ffffff',
                            textShadow: '0 0 15px rgba(168, 85, 247, 0.2)'
                        }}
                    >
                        Professional Experience
                    </h2>
                    <p 
                        className="mt-4 text-md max-w-2xl mx-auto font-light tracking-wider opacity-80"
                        style={{ color: '#cbd5e1' }}
                    >
                        Leading full-stack development and team coordination at a premier digital marketing agency.
                    </p>
                </motion.div>

                <motion.div
                    className="max-w-5xl mx-auto bg-[var(--color-surface-strong)] backdrop-blur-lg p-8 rounded-2xl border border-[var(--color-border-strong)] shadow-2xl shadow-purple-900/10"
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                >
                    <div className="grid md:grid-cols-3 gap-8 md:gap-12">
                        <div className="md:col-span-1">
                            <div className="p-4 bg-gray-900/60 rounded-lg flex items-center justify-center mb-4 h-24 border-transparent">
                                <img src="/logos/geeks5g.webp" alt="Geeks5G Logo" className="max-h-12 invert brightness-0 " />
                            </div>
                            <h3 
                                className="text-xl font-bold"
                                style={{ color: '#ffffff' }}
                            >
                                Fullstack Developer
                            </h3>
                            <p className="text-[var(--color-accent)] font-semibold text-md">
                                <a href="https://geeks5g.com/" target="_blank" rel="noopener noreferrer" className="hover:underline">@ Geeks5G Digital Marketing Agency</a>
                            </p>
                            <p 
                                className="text-sm mt-2 font-mono"
                                style={{ color: '#94a3b8' }}
                            >
                                January 2025 - Present | Medellín, Colombia
                            </p>
                            <div className="mt-2 flex items-center gap-3 text-sm">
                                <a href="https://www.instagram.com/geeks5g_official/" target="_blank" rel="noopener noreferrer" aria-label="Geeks5G Instagram" className="text-[var(--color-accent)] hover:underline">
                                    Instagram
                                </a>
                                <span className="text-[var(--color-accent)]">•</span>
                                <a href="https://maps.app.goo.gl/UX4o4DXgrZvnuUBWA" target="_blank" rel="noopener noreferrer" aria-label="Geeks5G on Google Maps" className="text-[var(--color-accent)] hover:underline">
                                    Google Maps
                                </a>
                                <span className="text-[var(--color-accent)]">•</span>
                                <a href="https://geeks5g.com/" target="_blank" rel="noopener noreferrer" aria-label="Geeks5G Website" className="text-[var(--color-accent)] hover:underline">
                                    Website
                                </a>
                            </div>
                        </div>

                        <div className="md:col-span-2 flex flex-col">
                            <div className="space-y-6 flex-grow">
                                {experienceHighlights.map((highlight) => (
                                    <div key={highlight.title} className="flex items-start gap-4">
                                        <div className="p-2 bg-[var(--color-accent-soft)] border border-[var(--color-border-strong)] rounded-lg mt-1 flex-shrink-0">
                                            <highlight.icon className="w-6 h-6 text-[var(--color-accent)]" />
                                        </div>
                                        <div>
                                            <h4 
                                                className="font-bold text-lg"
                                                style={{ color: '#ffffff' }}
                                            >
                                                {highlight.title}
                                            </h4>
                                            <p 
                                                className="text-sm"
                                                style={{ color: '#cbd5e1' }}
                                            >
                                                {highlight.description}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="mt-8 pt-6 border-t border-[var(--color-border-strong)]">
                                <a 
                                    href="#projects" 
                                    className="group inline-flex items-center gap-2 text-sm font-semibold transition-colors"
                                    style={{ 
                                        color: '#94a3b8'
                                    }}
                                    onMouseEnter={(e) => e.currentTarget.style.color = 'var(--color-accent)'}
                                    onMouseLeave={(e) => e.currentTarget.style.color = '#94a3b8'}
                                >
                                    See these skills in action in the projects below
                                    <ArrowRightIcon className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                                </a>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}