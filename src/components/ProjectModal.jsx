import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    SiReact, SiThreedotjs, SiTypescript, SiTailwindcss, SiJavascript, SiNextdotjs, 
    SiNodedotjs, SiExpress, SiMongodb, SiDocker, SiWebgl, SiGit, SiStripe,
    SiHtml5, SiCss3, SiPython, SiNumpy, SiTwilio, SiGooglecalendar, SiPrisma, SiZoom, SiRedis, SiAmazon, SiGoogleads , SiMeta , SiVimeo, SiOpenai, SiAmazons3 ,SiN8N
} from 'react-icons/si';

// --- Icon Components (No changes needed) ---
const ChevronLeftIcon = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <polyline points="15 18 9 12 15 6"></polyline>
    </svg>
);
const ChevronRightIcon = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <polyline points="9 18 15 12 9 6"></polyline>
    </svg>
);
const CloseIcon = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <line x1="18" y1="6" x2="6" y2="18"></line>
        <line x1="6" y1="6" x2="18" y2="18"></line>
    </svg>
);
const GitHubIcon = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" {...props}>
        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
    </svg>
);
const ExternalLinkIcon = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
        <polyline points="15 3 21 9"></polyline>
        <line x1="10" y1="14" x2="21" y2="3"></line>
    </svg>
);
const CheckCircleIcon = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
        <polyline points="22 4 12 14.01 9 11.01"></polyline>
    </svg>
);

// Add small blender icon if not already present
const BlenderIcon = () => (
    <img src="/logos/blender.svg" alt="Blender" className="w-full h-full object-contain" />
);

// Technology logo mapping — add entries for new tech names
const techLogoMap = {
    'React': { icon: SiReact, color: '#61DAFB' },
    'Next.js': { icon: SiNextdotjs, color: '#FFFFFF' },
    'Three.js': { icon: SiThreedotjs, color: '#FFFFFF' },
    'TypeScript': { icon: SiTypescript, color: '#3178C6' },
    'Tailwind CSS': { icon: SiTailwindcss, color: '#06B6D4' },
    'JavaScript': { icon: SiJavascript, color: '#F7DF1E' },
    'Node.js': { icon: SiNodedotjs, color: '#339933' },
    'Express.js': { icon: SiExpress, color: '#FFFFFF' },
    'Express': { icon: SiExpress, color: '#FFFFFF' },
    'MongoDB': { icon: SiMongodb, color: '#47A248' },
    'Docker': { icon: SiDocker, color: '#2496ED' },
    'WebGL': { icon: SiWebgl, color: '#990000' },
    'Git': { icon: SiGit, color: '#F05032' },
    'Stripe': { icon: SiStripe, color: '#635BFF' },
    'Stripe Connect': { icon: SiStripe, color: '#635BFF' },
    'HTML5': { icon: SiHtml5, color: '#E34F26' },
    'CSS3': { icon: SiCss3, color: '#1572B6' },
    'Python': { icon: SiPython, color: '#3776AB' },
    'NumPy': { icon: SiNumpy, color: '#013243' },
    'Twilio API': { icon: SiTwilio, color: '#FF2D55' },
    'Google Calendar API': { icon: SiGooglecalendar, color: '#4285F4' },
    'GLSL Shaders': { icon: SiWebgl, color: '#5586A4' },
    'PostgreSQL': { src: '/logos/postgre.svg' },
    'SendGrid': { src: '/logos/sendgrid.svg' },
    'Prisma': { icon: SiPrisma, color: '#7c3aed' },
    'Redis': { icon: SiRedis, color: '#DC382D' },
    'Blender': { icon: BlenderIcon, color: '#F5792A' },
    'Zoom API': { icon: SiZoom, color: '#0A84FF' },
    'AWS': { icon: SiAmazon, color: '#FF9900' },
    'Amazon': { icon: SiAmazon, color: '#FF9900' },
    'Amazon Web Services': { icon: SiAmazon, color: '#FF9900' },
    'Cloudinary': { text: 'CL' },
    'JWT': { text: 'JWT' },
    'Chart.js': { text: 'Chart' },
    'Zustand': { text: 'Z' },
    'React Query': { text: 'RQ' },
    'Matplotlib': { text: 'MPL' },
    'Pandas': { text: 'Pandas' },
    'Alpaca API': { text: 'Alpaca' },
    'EODHD API': { text: 'EOD' },
    'Google Ads': { src: '/images/projects/googleads.webp' },
    'Meta Ads': { icon: SiMeta , color: '#1877F2' },
    'GHL': { src: '/images/projects/ghl.svg' }, // use provided GHL SVG asset
    'n8n':  { icon: SiN8N  , color: '#FF2D55' },
    'S3': { icon: SiAmazon, color: '#FF9900' },
    'Vimeo API': { icon: SiVimeo, color: '#1AB7EA' },
    'OpenAI API': { icon: SiOpenai, color: '#FFFFFF' },
    'Twilio': { icon: SiTwilio, color: '#FF2D55' }, // alias for Twilio API
};

function TechIcon({ tech }) {
    const [showTooltip, setShowTooltip] = useState(false);
    const techInfo = techLogoMap[tech];
    
    if (!techInfo) {
        return (
            <div
                className="relative group"
                onMouseEnter={() => setShowTooltip(true)}
                onMouseLeave={() => setShowTooltip(false)}
            >
                <div
                    className="flex items-center justify-center w-12 h-12 rounded-lg text-xs font-bold transition-transform hover:scale-110 cursor-help"
                    style={{
                        background: 'rgba(51, 65, 85, 0.6)',
                        color: '#94a3b8'
                    }}
                >
                    {tech.substring(0, 2).toUpperCase()}
                </div>
                <AnimatePresence>
                    {showTooltip && (
                        <motion.div
                            initial={{ opacity: 0, y: -5 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -5 }}
                            transition={{ duration: 0.2 }}
                            className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap pointer-events-none z-50"
                            style={{
                                background: 'rgba(15, 23, 42, 0.95)',
                                color: '#ffffff',
                                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)'
                            }}
                        >
                            {tech}
                            <div
                                className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0"
                                style={{
                                    borderLeft: '4px solid transparent',
                                    borderRight: '4px solid transparent',
                                    borderTop: '4px solid rgba(15, 23, 42, 0.95)'
                                }}
                            />
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        );
    }

    if (techInfo.src) {
        return (
            <div
                className="relative group"
                onMouseEnter={() => setShowTooltip(true)}
                onMouseLeave={() => setShowTooltip(false)}
            >
                <div className="flex items-center justify-center w-12 h-12 transition-transform hover:scale-110 cursor-help">
                    <img src={techInfo.src} alt={tech} className="w-full h-full object-contain" />
                </div>
                <AnimatePresence>
                    {showTooltip && (
                        <motion.div
                            initial={{ opacity: 0, y: -5 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -5 }}
                            transition={{ duration: 0.2 }}
                            className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap pointer-events-none z-50"
                            style={{
                                background: 'rgba(15, 23, 42, 0.95)',
                                color: '#ffffff',
                                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)'
                            }}
                        >
                            {tech}
                            <div
                                className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0"
                                style={{
                                    borderLeft: '4px solid transparent',
                                    borderRight: '4px solid transparent',
                                    borderTop: '4px solid rgba(15, 23, 42, 0.95)'
                                }}
                            />
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        );
    }

    if (techInfo.text) {
        return (
            <div
                className="relative group"
                onMouseEnter={() => setShowTooltip(true)}
                onMouseLeave={() => setShowTooltip(false)}
            >
                <div
                    className="flex items-center justify-center w-12 h-12 rounded-lg text-xs font-bold transition-transform hover:scale-110 cursor-help"
                    style={{
                        background: 'rgba(51, 65, 85, 0.6)',
                        color: '#94a3b8'
                    }}
                >
                    {techInfo.text}
                </div>
                <AnimatePresence>
                    {showTooltip && (
                        <motion.div
                            initial={{ opacity: 0, y: -5 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -5 }}
                            transition={{ duration: 0.2 }}
                            className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap pointer-events-none z-50"
                            style={{
                                background: 'rgba(15, 23, 42, 0.95)',
                                color: '#ffffff',
                                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)'
                            }}
                        >
                            {tech}
                            <div
                                className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0"
                                style={{
                                    borderLeft: '4px solid transparent',
                                    borderRight: '4px solid transparent',
                                    borderTop: '4px solid rgba(15, 23, 42, 0.95)'
                                }}
                            />
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        );
    }

    const Icon = techInfo.icon;
    return (
        <div
            className="relative group"
            onMouseEnter={() => setShowTooltip(true)}
            onMouseLeave={() => setShowTooltip(false)}
        >
            <div className="flex items-center justify-center w-12 h-12 transition-transform hover:scale-110 cursor-help">
                <Icon
                    className="w-8 h-8"
                    style={{ color: techInfo.color }}
                />
            </div>
            <AnimatePresence>
                {showTooltip && (
                    <motion.div
                        initial={{ opacity: 0, y: -5 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -5 }}
                        transition={{ duration: 0.2 }}
                        className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap pointer-events-none z-50"
                        style={{
                            background: 'rgba(15, 23, 42, 0.95)',
                            color: '#ffffff',
                            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)'
                        }}
                    >
                        {tech}
                        <div
                            className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0"
                            style={{
                                borderLeft: '4px solid transparent',
                                borderRight: '4px solid transparent',
                                borderTop: '4px solid rgba(15, 23, 42, 0.95)'
                            }}
                        />
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

function ProjectModal({ project, onClose }) {
    const modalRef = useRef(null);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    const images = project?.images?.length > 0 ? project.images : [project.image];

    const nextImage = () => setCurrentImageIndex(prev => (prev + 1) % images.length);
    const prevImage = () => setCurrentImageIndex(prev => (prev - 1 + images.length) % images.length);

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Escape') onClose();
            if (e.key === 'ArrowRight' && images.length > 1 && !project.iframeUrl) nextImage();
            if (e.key === 'ArrowLeft' && images.length > 1 && !project.iframeUrl) prevImage();
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [onClose, images.length, project.iframeUrl]);

    if (!project) return null;

    const backdropVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { duration: 0.3 } }
    };

    const modalVariants = {
        hidden: { opacity: 0, scale: 0.9, y: 50 },
        visible: { opacity: 1, scale: 1, y: 0, transition: { type: "spring", damping: 25, stiffness: 200, delay: 0.1 } },
        exit: { opacity: 0, scale: 0.9, y: 50, transition: { duration: 0.2 } }
    };

    return (
        <motion.div
            className="fixed inset-0 z-30 flex items-center justify-center p-0 sm:p-4 backdrop-blur-md"
            style={{
                backgroundColor: 'rgba(15, 23, 42, 0.8)'
            }}
            variants={backdropVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            onClick={onClose}
            role="dialog"
            aria-modal="true"
        >
            <motion.div
                ref={modalRef}
                className="relative w-full max-w-7xl max-h-[100vh] sm:max-h-[92vh] backdrop-blur-xl rounded-none sm:rounded-3xl shadow-2xl flex flex-col md:flex-row overflow-hidden transition-colors"
                style={{
                    background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.95), rgba(30, 41, 59, 0.95))',
                    border: '1px solid rgba(148, 163, 184, 0.1)',
                    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
                }}
                variants={modalVariants}
                onClick={e => e.stopPropagation()}
            >
                {/* Image/Iframe Section - Now wider */}
                <div
                    className="relative w-full md:w-[58%] flex-shrink-0 flex items-center justify-center min-h-[45vh] md:min-h-0"
                    style={{
                        background: 'linear-gradient(to bottom right, rgba(15, 23, 42, 0.8), rgba(30, 41, 59, 0.6))',
                    }}
                >
                    {project.iframeUrl ? (
                        <iframe
                            src={project.iframeUrl}
                            title={`${project.title} Live Demo`}
                            className="w-full h-full border-0"
                            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            style={{ minHeight: '45vh', height: '100%' }}
                        ></iframe>
                    ) : (
                        <>
                            <AnimatePresence mode="wait">
                                <motion.img
                                    key={currentImageIndex}
                                    src={images[currentImageIndex]}
                                    alt={`${project.title} - Image ${currentImageIndex + 1}`}
                                    className="w-full h-full object-contain p-8"
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.95 }}
                                    transition={{ duration: 0.3 }}
                                />
                            </AnimatePresence>

                            {images.length > 1 && (
                                <>
                                    <button 
                                        onClick={prevImage} 
                                        className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full hover:scale-110 transition-all shadow-xl z-10"
                                        style={{
                                            backgroundColor: 'rgba(15, 23, 42, 0.95)',
                                            border: '1px solid rgba(148, 163, 184, 0.2)',
                                            color: '#60a5fa'
                                        }}
                                    >
                                        <ChevronLeftIcon />
                                    </button>
                                    <button 
                                        onClick={nextImage} 
                                        className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full hover:scale-110 transition-all shadow-xl z-10"
                                        style={{
                                            backgroundColor: 'rgba(15, 23, 42, 0.95)',
                                            border: '1px solid rgba(148, 163, 184, 0.2)',
                                            color: '#60a5fa'
                                        }}
                                    >
                                        <ChevronRightIcon />
                                    </button>
                                    <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-2 z-10">
                                        {images.map((_, index) => (
                                            <button 
                                                key={index} 
                                                onClick={() => setCurrentImageIndex(index)} 
                                                className="w-2 h-2 rounded-full transition-all duration-300"
                                                style={{
                                                    backgroundColor: currentImageIndex === index 
                                                        ? '#60a5fa'
                                                        : '#475569',
                                                    transform: currentImageIndex === index ? 'scale(1.4)' : 'scale(1)',
                                                    boxShadow: currentImageIndex === index 
                                                        ? '0 0 10px #60a5fa'
                                                        : 'none'
                                                }}
                                            />
                                        ))}
                                    </div>
                                </>
                            )}
                        </>
                    )}
                </div>

                {/* Details Section - Now narrower */}
                <div 
                    className="flex-1 md:w-[42%] p-6 md:p-8 overflow-y-auto scrollbar-thin max-h-[50vh] md:max-h-none"
                    style={{
                        background: 'rgba(15, 23, 42, 0.6)',
                        scrollbarWidth: 'thin',
                        scrollbarColor: '#475569 transparent'
                    }}
                >
                    {/* Header */}
                    <div className="mb-6">
                        <span 
                            className="inline-block px-3 py-1 rounded-full text-xs font-semibold mb-3"
                            style={{
                                background: 'rgba(96, 165, 250, 0.1)',
                                color: '#60a5fa'
                            }}
                        >
                            {project.category}
                        </span>
                        <h2 
                            className="text-3xl font-bold mb-3"
                            style={{ color: '#f1f5f9' }}
                        >
                            {project.title}
                        </h2>
                        <p 
                            className="leading-relaxed text-base"
                            style={{ color: '#94a3b8' }}
                        >
                            {project.description}
                        </p>
                    </div>

                    {/* Technologies with Icons */}
                    <div className="mb-6 pb-6" style={{ borderBottom: '1px solid #334155' }}>
                        <h3 
                            className="font-semibold text-sm uppercase tracking-wider mb-4"
                            style={{ color: '#cbd5e1' }}
                        >
                            Tech Stack
                        </h3>
                        <div className="flex flex-wrap gap-3">
                            {project.technologies.map(tech => (
                                <TechIcon key={tech} tech={tech} />
                            ))}
                        </div>
                    </div>

                    {/* Key Features */}
                    <div className="mb-6">
                        <h3 
                            className="font-semibold text-sm uppercase tracking-wider mb-4"
                            style={{ color: '#cbd5e1' }}
                        >
                            Key Features
                        </h3>
                        <ul className="space-y-2">
                            {project.features?.slice(0, 6).map((feature, index) => (
                                <li 
                                    key={index} 
                                    className="flex items-start gap-2 text-sm"
                                    style={{ color: '#cbd5e1' }}
                                >
                                    <CheckCircleIcon 
                                        className="w-4 h-4 mt-0.5 flex-shrink-0" 
                                        style={{ color: '#60a5fa' }}
                                    />
                                    <span>{feature}</span>
                                </li>
                            ))}
                            {project.features?.length > 6 && (
                                <li 
                                    className="text-sm italic"
                                    style={{ color: '#64748b' }}
                                >
                                    + {project.features.length - 6} more features
                                </li>
                            )}
                        </ul>
                    </div>

                    {/* Links or Privacy Note */}
                    <div className="mt-6 pt-6" style={{ borderTop: '1px solid #334155' }}>
                        {project.privacyNote && (!project.links?.github && !project.links?.live) ? (
                            <p 
                                className="text-sm flex items-start gap-2 px-4 py-3 rounded-lg"
                                style={{ 
                                    background: 'rgba(51, 65, 85, 0.3)',
                                    color: '#94a3b8'
                                }}
                            >
                                <span className="text-lg">🔒</span>
                                <span>{project.privacyNote}</span>
                            </p>
                        ) : (
                            <div className="flex flex-wrap gap-3">
                                {project.links?.github && (
                                    <a 
                                        href={project.links.github} 
                                        target="_blank" 
                                        rel="noopener noreferrer" 
                                        className="flex items-center gap-2 px-5 py-2.5 font-semibold rounded-xl transition-all hover:scale-105"
                                        style={{
                                            background: 'rgba(51, 65, 85, 0.8)',
                                            color: '#e2e8f0',
                                            border: '1px solid rgba(148, 163, 184, 0.2)'
                                        }}
                                    >
                                        <GitHubIcon /> Code
                                    </a>
                                )}
                                {project.links?.live && (
                                    <a 
                                        href={project.links.live} 
                                        target="_blank" 
                                        rel="noopener noreferrer" 
                                        className="flex items-center gap-2 px-5 py-2.5 font-semibold text-white rounded-xl transition-all hover:scale-105"
                                        style={{
                                            background: 'linear-gradient(135deg, #3b82f6, #2563eb)',
                                            boxShadow: '0 4px 12px rgba(59, 130, 246, 0.4)'
                                        }}
                                    >
                                        <ExternalLinkIcon /> Live Demo
                                    </a>
                                )}
                            </div>
                        )}
                    </div>
                </div>

                {/* Close Button */}
                <button
                    onClick={onClose}
                    type="button"
                    className="fixed md:absolute top-4 right-4 p-2.5 rounded-full hover:scale-110 transition-all z-50 shadow-xl"
                    style={{
                        backgroundColor: 'rgba(15, 23, 42, 0.95)',
                        color: '#60a5fa',
                        border: '1px solid rgba(148, 163, 184, 0.2)'
                    }}
                    aria-label="Close modal"
                >
                    <CloseIcon />
                </button>
            </motion.div>
        </motion.div>
    );
}

export default ProjectModal;