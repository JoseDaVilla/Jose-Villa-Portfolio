import React from 'react';
import { motion } from 'framer-motion';

// --- Icon Components (keep these as they were) ---
const DashboardIcon = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="3" y1="9" x2="21" y2="9"></line><line x1="9" y1="21" x2="9" y2="9"></line></svg>
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
    { icon: DashboardIcon, title: 'Client Dashboards', description: 'I architect and build bespoke, feature-rich dashboards that provide clients with real-time insights and performance metrics.'},
    { icon: WebScrapingIcon, title: 'Data Strategy', description: 'I leverage web scraping technologies to gather strategic market data, helping to inform and enhance client marketing campaigns.'},
    { icon: AutomationIcon, title: 'Custom Automations', description: 'I develop custom scripts and workflows to streamline client processes, reduce manual labor, and improve operational efficiency.'}
];

export default function Experience() {
    return (
        <section id="experience" className="py-24 sm:py-32 text-white relative overflow-hidden">
            <div className="container px-4 mx-auto relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl sm:text-5xl font-thin tracking-[0.2em] uppercase text-gray-100" style={{textShadow: '0 0 15px rgba(168, 85, 247, 0.5)'}}>
                        Professional Experience
                    </h2>
                    <p className="mt-4 text-md text-gray-400 max-w-2xl mx-auto font-light tracking-wider opacity-80">
                        A look at my current role and the key areas where I'm making an impact.
                    </p>
                </motion.div>

                <motion.div
                    className="max-w-5xl mx-auto bg-[#101727]/40 backdrop-blur-lg p-8 rounded-2xl border border-purple-400/20 shadow-2xl shadow-purple-900/20"
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                >
                    <div className="grid md:grid-cols-3 gap-8 md:gap-12">
                        <div className="md:col-span-1">
                            <div className="p-4 bg-gray-900/50 rounded-lg flex items-center justify-center mb-4 h-24">
                                <img src="/logos/geeks5g.webp" alt="Geeks5G Logo" className="max-h-12 invert brightness-0 opacity-80" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-100">Fullstack Developer</h3>
                            <p className="text-purple-400 font-semibold text-md">
                                <a href="https://geeks5g.com/" target="_blank" rel="noopener noreferrer" className="hover:underline">@ Geeks5G Marketing Agency</a>
                            </p>
                            <p className="text-gray-500 text-sm mt-2 font-mono">
                                Jan 2025 - Present
                            </p>
                        </div>

                        <div className="md:col-span-2 flex flex-col">
                            <div className="space-y-6 flex-grow">
                                {experienceHighlights.map((highlight) => (
                                    <div key={highlight.title} className="flex items-start gap-4">
                                        <div className="p-2 bg-purple-900/30 border border-purple-500/30 rounded-lg mt-1 flex-shrink-0">
                                            <highlight.icon className="w-6 h-6 text-purple-400" />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-lg text-gray-100">{highlight.title}</h4>
                                            <p className="text-gray-400 text-sm">{highlight.description}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="mt-8 pt-6 border-t border-purple-400/20">
                                <a href="#projects" className="group inline-flex items-center gap-2 text-sm font-semibold text-gray-400 hover:text-purple-400 transition-colors">
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