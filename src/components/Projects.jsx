import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ProjectModal from './ProjectModal';
import MagicBento from './MagicBento';
import { useBodyScrollLock } from '../hooks/useBodyScrollLock';
import { useImagePreloader } from '../hooks/useImagePreloader';

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
        technologies: [
            "Next.js",
            "Express.js",
            "Prisma",
            "PostgreSQL",
            "SendGrid",
            "Twilio",
            "OpenAI API",
            "AWS",
            "GHL",
            "Cloudinary",
            "JWT",
            "Chart.js"
        ],
        features: ["Real-time multi-location availability", "Advanced sales analytics", "Automated payroll processing", "Employee management and scheduling", "Integrated Point of Sale", "Dynamic financial reporting", "Biometric time tracking", "HIPAA-compliant data management"],
        links: { github: null, live: null },
        privacyNote: "Due to client confidentiality, the source code and live demo are not public.",
        gridLayout: { colSpan: 1, rowSpan: 1 } // Large horizontal card
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
        privacyNote: "The source code is private due to the proprietary nature of the algorithms.",
        gridLayout: { colSpan: 1, rowSpan: 1 } // Standard card
    },{
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
        technologies: [
            "GHL",
            "Google Ads",
            "Meta Ads",
            "n8n",
            "Twilio",
            "SendGrid",
            "HTML5",
            "CSS3",
            "JavaScript",
            "S3",
            "Vimeo API",
            "OpenAI API",
            "Prisma"
        ],
        features: ["White-Label SaaS Platform", "Integrated CRM System", "Partner Training Academy", "Stripe Connected Accounts", "Drag-and-Drop Form Builder", "Employee & Service Management", "Automated Commission System", "Google Calendar & Zoom Integration", "User Authentication & Roles"],
        links: { github: null, live: null },
        privacyNote: "The platform is proprietary, so the source code and a live demo are available only upon request.",
        gridLayout: { colSpan: 1, rowSpan: 2 } // Tall vertical card
    },
    {
        id: 5,
        title: "VerifyLead",
        category: "SaaS Platform",
        summary: "Advanced lead management platform with email & SMS campaigns, OTP verification, and embedded forms.",
        description: "VerifyLead is a comprehensive lead management and verification platform designed for businesses to capture, validate, and nurture leads effectively. The system features embeddable forms with OTP verification, multi-channel campaign management (Email & SMS), real-time SMTP validation, and intelligent lead scoring. Built with scalability in mind, it processes thousands of leads daily with automated workflows and detailed analytics.",
        image: "images/projects/verifylead.png",
        images: [
            "images/projects/verifylead.png",
            "images/projects/verifylead2.png",
            "images/projects/verifylead3.png",
            "images/projects/verifylead4.png"
        ],
        technologies: [
            "Next.js",
            "React",
            "TypeScript",
            "Node.js",
            "PostgreSQL",
            "Redis",
            "Twilio API",
            "SendGrid",
            "Prisma",
            "Tailwind CSS",
        ],
        features: [
            "Real-time lead capture with embeddable forms",
            "OTP verification system for lead validation",
            "SMTP validation to verify email deliverability",
            "Multi-channel campaigns (Email & SMS)",
            "Drag-and-drop form builder with custom fields",
            "Advanced lead segmentation and filtering",
            "Automated workflow triggers and sequences",
            "Real-time analytics and conversion tracking",
            "A/B testing for campaigns and forms",
            "Lead scoring and qualification system",
            "Webhook integrations with third-party tools",
            "Role-based access control (RBAC)",
            "API rate limiting and security measures",
            "Export leads to CSV/Excel formats",
            "Duplicate lead detection and merging"
        ],
        links: { github: null, live: null },
        privacyNote: "This is a proprietary SaaS platform. Source code and live demo are available upon request for potential clients or collaborators.",
        gridLayout: { colSpan: 2, rowSpan: 1 }
    },
    
    {
        id: 4,
        title: "Portal Entry / Blender + Three.js",
        category: "3D & Graphics",
        summary: "Immersive 3D gallery to showcase creative projects.",
        description: "A 3D gallery space built with Three.js, allowing users to navigate a virtual environment to view projects. Features custom shaders for an engaging user experience.",
        image: "images/projects/portal.png",
        images: ["images/projects/3d-gallery.jpg", "images/projects/3d-gallery-2.jpg", "images/projects/3d-gallery-3.jpg"],
        technologies: ["Three.js", "Blender", "JavaScript", "GLSL Shaders", "HTML5", "CSS3"],
        features: ["Immersive 3D environment", "Custom GLSL shaders", "Intuitive navigation", "Dynamic content loading", "Mobile-optimized performance"],
        links: { github: "https://github.com/josevilla/3d-gallery", live: "https://3d-gallery-demo.com" },

        iframeUrl: "https://portal-chi-five.vercel.app/",
        gridLayout: { colSpan: 1, rowSpan: 1 } // Standard card
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
        iframeUrl: "https://galaxy-generator-animated-amber.vercel.app/",
        gridLayout: { colSpan: 2, rowSpan: 1 } // Large horizontal card
    },

];

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

    const handleSelectProject = (project) => setSelectedProject(project);
    const handleCloseModal = () => setSelectedProject(null);

    const headerVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" }}
    };

    return (
        <section
            id="projects"
            className="py-24 sm:py-32 relative transition-colors duration-300"
            style={{
                background: 'linear-gradient(to bottom, #0f172a66, #1e293b5a)'
            }}
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
                        style={{ color: '#ffffff' }}
                    >
                        Featured Projects
                    </h2>
                    <p 
                        className="mt-4 text-lg max-w-2xl mx-auto"
                        style={{ color: '#94a3b8' }}
                    >
                        A curated selection of my work, showcasing my skills in web development, automation, and 3D graphics.
                    </p>
                </motion.div>

                <MagicBento
                    projects={projectsData}
                    onProjectClick={handleSelectProject}
                    textAutoHide={true}
                    enableStars={true}
                    enableSpotlight={true}
                    enableBorderGlow={true}
                    enableTilt={false}
                    enableMagnetism={true}
                    clickEffect={true}
                    spotlightRadius={300}
                    particleCount={12}
                    glowColor="96, 165, 250"
                />
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