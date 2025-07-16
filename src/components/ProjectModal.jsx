import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// --- Icon Components (no changes needed) ---
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

// --- Main Modal Component ---
function ProjectModal({ project, onClose }) {
    const modalRef = useRef(null);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    const images = project?.images?.length > 0 ? project.images : [project.image];

    const nextImage = () => setCurrentImageIndex(prev => (prev + 1) % images.length);
    const prevImage = () => setCurrentImageIndex(prev => (prev - 1 + images.length) % images.length);

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Escape') onClose();
            if (e.key === 'ArrowRight' && images.length > 1) nextImage();
            if (e.key === 'ArrowLeft' && images.length > 1) prevImage();
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [onClose, images.length]);

    if (!project) return null;

    const backdropVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { duration: 0.2 } }
    };

    const modalVariants = {
        hidden: { opacity: 0, scale: 0.95, y: 30 },
        visible: { opacity: 1, scale: 1, y: 0, transition: { type: "spring", damping: 25, stiffness: 250 } },
        exit: { opacity: 0, scale: 0.95, y: 30, transition: { duration: 0.2 } }
    };

    return (
        <AnimatePresence>
            <motion.div
                className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
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
                    className="relative w-full max-w-6xl max-h-[90vh] bg-white rounded-md shadow-2xl flex flex-col md:flex-row overflow-hidden"
                    variants={modalVariants}
                    onClick={e => e.stopPropagation()}
                >
                    {/* --- Image Carousel --- */}
                    <div className="relative w-full md:w-3/5 bg-slate-100">
                        <AnimatePresence mode="wait">
                            <motion.img
                                key={currentImageIndex}
                                src={images[currentImageIndex]}
                                alt={`${project.title} - Image ${currentImageIndex + 1}`}
                                className="w-full h-[40vh] md:h-full object-cover"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.3 }}
                            />
                        </AnimatePresence>

                        {images.length > 1 && (
                            <>
                                <button onClick={prevImage} className="absolute left-3 top-1/2 -translate-y-1/2 p-2 bg-white/50 text-gray-800 rounded-full hover:bg-white hover:scale-110 transition-all shadow-md">
                                    <ChevronLeftIcon />
                                </button>
                                <button onClick={nextImage} className="absolute right-3 top-1/2 -translate-y-1/2 p-2 bg-white/50 text-gray-800 rounded-full hover:bg-white hover:scale-110 transition-all shadow-md">
                                    <ChevronRightIcon />
                                </button>
                                <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
                                    {images.map((_, index) => (
                                        <button key={index} onClick={() => setCurrentImageIndex(index)} className={`w-2 h-2 rounded-full transition-all duration-300 ${currentImageIndex === index ? 'bg-violet-600 scale-125' : 'bg-gray-400'}`} />
                                    ))}
                                </div>
                            </>
                        )}
                    </div>

                    {/* --- Close Button --- */}
                    <button onClick={onClose} className="absolute top-4 right-4 p-2 bg-white/50 text-gray-800 rounded-full hover:bg-white hover:scale-110 transition-all z-20 shadow-md">
                        <CloseIcon />
                    </button>

                    {/* --- Project Details --- */}
                    <div className="flex-1 md:w-2/5 p-6 sm:p-8 text-gray-800 overflow-y-auto scrollbar-thin scrollbar-thumb-violet-200 scrollbar-track-violet-50 hover:scrollbar-thumb-violet-400 transition-all duration-200"
                        style={{
                            scrollbarWidth: 'thin',
                            scrollbarColor: '#c4b5fd #f5f3ff'
                        }}
                    >
                        <h2 className="text-3xl font-bold text-gray-900 mb-2">{project.title}</h2>
                        <p className="text-gray-600 mb-6 leading-relaxed">{project.description}</p>

                        <div className="mb-6">
                            <h3 className="font-semibold text-lg text-gray-800 mb-3">Key Features</h3>
                            <ul className="space-y-2">
                                {project.features?.map((feature, index) => (
                                    <li key={index} className="flex items-start text-gray-600">
                                        <CheckCircleIcon className="w-5 h-5 mr-3 mt-0.5 text-violet-500 flex-shrink-0" />
                                        <span>{feature}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="mb-6">
                            <h3 className="font-semibold text-lg text-gray-800 mb-3">Technologies</h3>
                            <div className="flex flex-wrap gap-2">
                                {project.technologies.map(tech => (
                                    <span key={tech} className="px-3 py-1 text-sm font-medium rounded-full bg-violet-100 text-violet-700">
                                        {tech}
                                    </span>
                                ))}
                            </div>
                        </div>

                        <div className="pt-6 border-t border-gray-200">
                            {project.privacyNote && (!project.links?.github && !project.links?.live) ? (
                                <p className="text-sm text-gray-500 italic">{project.privacyNote}</p>
                            ) : (
                                <div className="flex flex-wrap gap-4">
                                    {project.links?.github && (
                                        <a href={project.links.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-4 py-2 font-semibold bg-gray-100 text-gray-800 rounded-lg hover:bg-gray-200 transition-colors">
                                            <GitHubIcon className="text-gray-600" /> View Code
                                        </a>
                                    )}
                                    {project.links?.live && (
                                        <a href={project.links.live} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-4 py-2 font-semibold bg-violet-600 text-white rounded-lg hover:bg-violet-700 transition-transform transform hover:scale-105">
                                            <ExternalLinkIcon /> Live Demo
                                        </a>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
}

export default ProjectModal;