import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';

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


function ProjectModal({ project, onClose }) {
    const { theme } = useTheme();
    const isDark = theme === 'dark';
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
                backgroundColor: isDark ? 'rgba(15, 23, 42, 0.6)' : 'rgba(100, 116, 139, 0.25)'
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
                className="relative w-full max-w-6xl max-h-[100vh] sm:max-h-[90vh] backdrop-blur-xl rounded-none sm:rounded-2xl shadow-2xl flex flex-col md:flex-row overflow-hidden transition-colors"
                style={{
                    background: isDark 
                        ? 'linear-gradient(to bottom right, rgba(30, 41, 59, 0.8), rgba(15, 23, 42, 0.9))' 
                        : 'linear-gradient(to bottom right, #ffffff, #f8fafc, #f1f5f9)',
                    border: isDark ? '1px solid rgba(148, 163, 184, 0.2)' : '1px solid #cbd5e1',
                    boxShadow: isDark 
                        ? '0 25px 50px -12px rgba(6, 182, 212, 0.15)' 
                        : '0 25px 50px -12px rgba(59, 130, 246, 0.25)'
                }}
                variants={modalVariants}
                onClick={e => e.stopPropagation()}
            >
                {/* --- Content Area: Renders Iframe or Image Carousel --- */}
                <div
                    className="relative w-full md:w-3/5 flex-shrink-0 flex items-center justify-center min-h-[40vh] h-full sm:h-[50vh] md:h-auto md:min-h-0"
                    style={{
                        background: isDark 
                            ? 'linear-gradient(to bottom right, rgba(15, 23, 42, 0.5), rgba(30, 41, 59, 0.5))' 
                            : 'linear-gradient(to bottom right, #f8fafc, #e0f2fe, #dbeafe)',
                        maxHeight: '100vh',
                        minHeight: '40vh',
                        ...(window.innerWidth < 768 ? { height: '50vh', minHeight: '40vh', maxHeight: '60vh' } : {})
                    }}
                >
                    {project.iframeUrl ? (
                        <iframe
                            src={project.iframeUrl}
                            title={`${project.title} Live Demo`}
                            className="w-full h-full border-0"
                            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            style={{
                                minHeight: '40vh',
                                height: '100%',
                                maxHeight: '100vh',
                                borderRadius: 0
                            }}
                        ></iframe>
                    ) : (
                        <>
                            <AnimatePresence mode="wait">
                                <motion.img
                                    key={currentImageIndex}
                                    src={images[currentImageIndex]}
                                    alt={`${project.title} - Image ${currentImageIndex + 1}`}
                                    className="w-full object-contain block"
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                                    style={{
                                        display: 'block',
                                        width: '100%',
                                        maxHeight: '100%',
                                        objectFit: 'contain',
                                        borderRadius: 0
                                    }}
                                />
                            </AnimatePresence>

                            {images.length > 1 && (
                                <>
                                    <button 
                                        onClick={prevImage} 
                                        className="absolute left-3 top-1/2 -translate-y-1/2 p-2.5 rounded-full hover:scale-110 transition-all shadow-lg"
                                        style={{
                                            backgroundColor: isDark ? 'rgba(30, 41, 59, 0.8)' : 'rgba(255, 255, 255, 0.95)',
                                            color: isDark ? '#e2e8f0' : '#1e293b',
                                            border: isDark ? '1px solid rgba(148, 163, 184, 0.2)' : '1px solid #cbd5e1'
                                        }}
                                    >
                                        <ChevronLeftIcon />
                                    </button>
                                    <button 
                                        onClick={nextImage} 
                                        className="absolute right-3 top-1/2 -translate-y-1/2 p-2.5 rounded-full hover:scale-110 transition-all shadow-lg"
                                        style={{
                                            backgroundColor: isDark ? 'rgba(30, 41, 59, 0.8)' : 'rgba(255, 255, 255, 0.95)',
                                            color: isDark ? '#e2e8f0' : '#1e293b',
                                            border: isDark ? '1px solid rgba(148, 163, 184, 0.2)' : '1px solid #cbd5e1'
                                        }}
                                    >
                                        <ChevronRightIcon />
                                    </button>
                                    <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
                                        {images.map((_, index) => (
                                            <button 
                                                key={index} 
                                                onClick={() => setCurrentImageIndex(index)} 
                                                className="w-2.5 h-2.5 rounded-full transition-all duration-300"
                                                style={{
                                                    backgroundColor: currentImageIndex === index 
                                                        ? (isDark ? '#06b6d4' : '#3b82f6')
                                                        : (isDark ? '#475569' : '#94a3b8'),
                                                    transform: currentImageIndex === index ? 'scale(1.3)' : 'scale(1)',
                                                    boxShadow: currentImageIndex === index 
                                                        ? (isDark ? '0 0 8px #06b6d4' : '0 0 8px #3b82f6')
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

                {/* --- Project Details --- */}
                <div 
                    className="flex-1 md:w-2/5 p-4 sm:p-6 md:p-8 overflow-y-auto scrollbar-thin max-h-[55vh] md:max-h-none"
                    style={{
                        background: isDark 
                            ? 'rgba(30, 41, 59, 0.8)' 
                            : 'linear-gradient(to bottom, #ffffff, #fafbfc)',
                        scrollbarWidth: 'thin',
                        scrollbarColor: isDark ? '#475569 transparent' : '#cbd5e1 transparent',
                        minHeight: 'auto',
                        ...(window.innerWidth < 768 ? { maxHeight: '45vh' } : {})
                    }}
                >
                    <h2 
                        className="text-3xl font-bold mb-3"
                        style={{ 
                            color: isDark ? '#f1f5f9' : '#0f172a',
                            textShadow: isDark ? 'none' : '0 1px 2px rgba(0,0,0,0.05)'
                        }}
                    >
                        {project.title}
                    </h2>
                    <p 
                        className="mb-6 leading-relaxed text-base"
                        style={{ color: isDark ? '#94a3b8' : '#475569' }}
                    >
                        {project.description}
                    </p>

                    <div className="mb-6">
                        <h3 
                            className="font-bold text-lg mb-3 pb-2"
                            style={{ 
                                color: isDark ? '#e2e8f0' : '#1e293b',
                                borderBottom: isDark ? '2px solid #334155' : '2px solid #e2e8f0'
                            }}
                        >
                            ✨ Key Features
                        </h3>
                        <ul className="space-y-2.5">
                            {project.features?.map((feature, index) => (
                                <li 
                                    key={index} 
                                    className="flex items-start gap-3"
                                    style={{ color: isDark ? '#cbd5e1' : '#334155' }}
                                >
                                    <CheckCircleIcon 
                                        className="w-5 h-5 mt-0.5 flex-shrink-0" 
                                        style={{ 
                                            color: isDark ? '#06b6d4' : '#3b82f6',
                                            filter: isDark ? 'none' : 'drop-shadow(0 1px 2px rgba(59,130,246,0.3))'
                                        }}
                                    />
                                    <span className="leading-relaxed">{feature}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="mb-6">
                        <h3 
                            className="font-bold text-lg mb-3 pb-2"
                            style={{ 
                                color: isDark ? '#e2e8f0' : '#1e293b',
                                borderBottom: isDark ? '2px solid #334155' : '2px solid #e2e8f0'
                            }}
                        >
                            🛠️ Technologies
                        </h3>
                        <div className="flex flex-wrap gap-2">
                            {project.technologies.map(tech => (
                                <span 
                                    key={tech} 
                                    className="px-3 py-1.5 text-sm font-semibold rounded-lg transition-transform hover:scale-105"
                                    style={{
                                        background: isDark 
                                            ? 'linear-gradient(135deg, rgba(6, 182, 212, 0.2), rgba(8, 145, 178, 0.3))' 
                                            : 'linear-gradient(135deg, #dbeafe, #bfdbfe)',
                                        color: isDark ? '#67e8f9' : '#1e40af',
                                        border: isDark ? '1px solid rgba(6, 182, 212, 0.3)' : '1px solid #93c5fd',
                                        boxShadow: isDark ? 'none' : '0 1px 3px rgba(59, 130, 246, 0.2)'
                                    }}
                                >
                                    {tech}
                                </span>
                            ))}
                        </div>
                    </div>

                    <div 
                        className="pt-6"
                        style={{
                            borderTop: isDark ? '2px solid #334155' : '2px solid #e2e8f0'
                        }}
                    >
                        {project.privacyNote && (!project.links?.github && !project.links?.live) ? (
                            <p 
                                className="text-sm italic flex items-start gap-2"
                                style={{ color: isDark ? '#64748b' : '#64748b' }}
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
                                        className="flex items-center gap-2 px-5 py-2.5 font-semibold rounded-lg transition-all hover:scale-105"
                                        style={{
                                            background: isDark 
                                                ? 'rgba(51, 65, 85, 0.8)' 
                                                : 'linear-gradient(135deg, #f8fafc, #e2e8f0)',
                                            color: isDark ? '#e2e8f0' : '#0f172a',
                                            border: isDark ? '1px solid rgba(148, 163, 184, 0.3)' : '1px solid #cbd5e1',
                                            boxShadow: isDark ? 'none' : '0 2px 4px rgba(0, 0, 0, 0.05)'
                                        }}
                                    >
                                        <GitHubIcon /> View Code
                                    </a>
                                )}
                                {project.links?.live && (
                                    <a 
                                        href={project.links.live} 
                                        target="_blank" 
                                        rel="noopener noreferrer" 
                                        className="flex items-center gap-2 px-5 py-2.5 font-semibold text-white rounded-lg transition-all hover:scale-105"
                                        style={{
                                            background: isDark 
                                                ? 'linear-gradient(135deg, #3b82f6, #2563eb)' 
                                                : 'linear-gradient(135deg, #3b82f6, #2563eb)',
                                            boxShadow: isDark 
                                                ? '0 4px 12px rgba(59, 130, 246, 0.3)' 
                                                : '0 4px 12px rgba(59, 130, 246, 0.4)'
                                        }}
                                    >
                                        <ExternalLinkIcon /> Live Demo
                                    </a>
                                )}
                            </div>
                        )}
                    </div>
                </div>

                {/* --- Close Button --- */}
                <button
                    onClick={onClose}
                    type="button"
                    className="fixed md:absolute top-6 right-6 md:top-4 md:right-4 p-2.5 rounded-full hover:scale-110 transition-all z-50 shadow-lg"
                    style={{
                        backgroundColor: isDark ? 'rgba(30, 41, 59, 0.9)' : 'rgba(255, 255, 255, 0.95)',
                        color: isDark ? '#e2e8f0' : '#1e293b',
                        border: isDark ? '1px solid rgba(148, 163, 184, 0.3)' : '1px solid #cbd5e1',
                        zIndex: 100
                    }}
                    aria-label="Close modal"
                    tabIndex={0}
                >
                    <CloseIcon />
                </button>
            </motion.div>
        </motion.div>
    );
}

export default ProjectModal;