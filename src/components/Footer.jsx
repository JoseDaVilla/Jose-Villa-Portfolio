import { motion } from 'framer-motion';

// --- Icon Components ---
const GitHubIcon = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0 -1 0 -3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
        <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
);
const LinkedInIcon = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
        <rect width="4" height="12" x="2" y="9" />
        <circle cx="4" cy="4" r="2" />
    </svg>
);
const ArrowUpIcon = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <line x1="12" y1="19" x2="12" y2="5"></line>
        <polyline points="5 12 12 5 19 12"></polyline>
    </svg>
);

export default function Footer() {
    const currentYear = new Date().getFullYear();
    
    const socialLinks = [
        { name: 'GitHub', icon: GitHubIcon, url: 'https://github.com/your-username' },
        { name: 'LinkedIn', icon: LinkedInIcon, url: 'https://linkedin.com/in/your-profile' },
    ];

    const scrollToTop = (e) => {
        e.preventDefault();
        document.getElementById('hero')?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <footer className="relative bg-[#0a0f19] text-white border-t-2 border-red-500/20 shadow-[0_-10px_40px_-15px_rgba(239,68,68,0.2)]">
            
            {/* Background Grid and Scanline Effect */}
            <div className="absolute inset-0 w-full h-full pointer-events-none">
                <div 
                    className="absolute inset-0 w-full h-full bg-[radial-gradient(rgb(120,120,120,0.08)_1px,transparent_1px)] [background-size:32px_32px]"
                    style={{
                        maskImage: 'radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)'
                    }}
                />
                <div className="absolute inset-0 w-full h-full bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)]"></div>
                <div className="absolute inset-0 w-full h-full opacity-40 mix-blend-soft-light" style={{
                    animation: 'scanline 10s linear infinite',
                    backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, #000 2px, #000 4px)'
                }}></div>
                <style>{`
                    @keyframes scanline {
                        0% { background-position: 0 0; }
                        100% { background-position: 0 100%; }
                    }
                `}</style>
            </div>
            
            <div className="container px-6 py-12 mx-auto relative z-10">
                <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-8">
                    {/* Logo and Tagline */}
                    <div>
                        <h2 className="text-3xl font-bold text-gray-100">
                            JV<span className="text-blue-400">.</span>
                        </h2>
                        <p className="mt-2 text-gray-500 text-sm">
                            Crafting digital experiences that inspire and engage.
                        </p>
                    </div>

                    {/* Social Links */}
                    <div className="flex items-center gap-5">
                        {socialLinks.map(link => (
                            <motion.a
                                key={link.name}
                                href={link.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-gray-400 hover:text-blue-400 transition-colors"
                                title={link.name}
                                whileHover={{ scale: 1.1, y: -2 }}
                                transition={{ type: 'spring', stiffness: 300 }}
                            >
                                <link.icon className="w-6 h-6" />
                            </motion.a>
                        ))}
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="mt-10 pt-8 border-t border-gray-400/20 flex flex-col sm:flex-row items-center justify-between">
                    <p className="text-sm text-gray-500 mb-4 sm:mb-0">
                        © {currentYear} Jose Daniel Villa. Built with passion in Envigado, Colombia. 🇨🇴
                    </p>
                    
                    <motion.a 
                        href="#hero" 
                        onClick={scrollToTop}
                        className="group flex items-center justify-center w-12 h-12 bg-gray-800/50 rounded-full ring-1 ring-blue-400/30 transition-all"
                        whileHover={{
                            scale: 1.1,
                            backgroundColor: 'rgba(59, 130, 246, 0.2)', // bg-blue-500/20
                            boxShadow: '0 0 15px rgba(59, 130, 246, 0.4)'
                        }}
                        title="Back to Top"
                    >
                        <ArrowUpIcon className="w-5 h-5 text-blue-400 transition-transform group-hover:-translate-y-0.5" />
                    </motion.a>
                </div>
            </div>
        </footer>
    );
}