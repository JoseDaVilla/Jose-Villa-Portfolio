import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';

import {
    SiReact, SiThreedotjs, SiTypescript, SiTailwindcss, SiJavascript, SiNextdotjs, SiHtml5, SiCss3,
    SiNodedotjs, SiExpress, SiMongodb, SiDocker, SiWebgl,
    SiGit, SiSelenium, SiOpengl, SiStripe, SiWordpress,
    SiTwilio,
} from 'react-icons/si';
import { GiBrain } from 'react-icons/gi';
import { RiTimerFill } from 'react-icons/ri';
import { FiServer, FiSettings } from 'react-icons/fi';

/* ---------------- Icons ---------------- */
const CodeIcon = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
        fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <polyline points="16 18 22 12 16 6"></polyline>
        <polyline points="8 6 2 12 8 18"></polyline>
    </svg>
);

const DatabaseIcon = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
        fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <ellipse cx="12" cy="5" rx="9" ry="3"></ellipse>
        <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"></path>
        <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"></path>
    </svg>
);

const WrenchIcon = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
        fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"></path>
    </svg>
);

const PlaywrightIcon = () => (
    <img src="/logos/playwright.svg" alt="Playwright" className="w-full h-full object-contain" />
);
const RestApiIcon = (props) => <FiServer {...props} />;

const SendGridIcon = () => (
    <img src="/logos/sendgrid.svg" alt="SendGrid" className="w-full h-full object-contain" />
);
const CommioIcon = () => (
    <img src="/logos/commio.png" alt="Commio" className="w-full h-full object-contain" />
);
const BlenderIcon = () => (
    <img src="/logos/blender.svg" alt="Blender" className="w-full h-full object-contain" />
);
const PostgresIcon = () => (
    <img src="/logos/postgre.svg" alt="PostgreSQL" className="w-full h-full object-contain" />
);
const FigmaIcon = () => (
    <img src="/logos/figma.svg" alt="Figma" className="w-full h-full object-contain" />
);
const ZendeskIcon = (props) => {
    const { theme } = useTheme();
    const isDark = theme === 'dark';
    const src = isDark ? '/logos/zendesk.svg' : '/logos/zendesk-black.svg';
    return <img src={src} alt="Zendesk" className="w-full h-full object-contain" {...props} />;
};
const PythonIcon = () => (
    <img src="/logos/python.svg" alt="Python" className="w-full h-full object-contain" />
);

const ShadcnIcon = (props) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 256 256"
        className="w-full h-full object-contain"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="32"
        {...props}
    >
        <line x1="208" y1="128" x2="128" y2="208" />
        <line x1="192" y1="40" x2="40" y2="192" />
    </svg>
);

const PaypalIcon = () => (
    <img src="/logos/paypal.svg" alt="PayPal" className="w-full h-full object-contain" />
);

const FirebaseIcon = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 73 91" className="w-full h-full object-contain" fill="none" {...props}>
        <path d="M22.5752 87.933C26.3634 89.4568 30.4722 90.3615 34.7873 90.5132C40.6261 90.717 46.1816 89.5089 51.1455 87.2147C45.1923 84.8757 39.8009 81.4554 35.1974 77.2024C32.2171 81.9798 27.805 85.7506 22.5752 87.933Z" fill="#FF9100" />
        <path d="M35.1996 77.2049C24.6952 67.4909 18.3219 53.4295 18.8613 38.0059C18.8787 37.5063 18.906 37.0042 18.9359 36.5046C17.0542 36.0174 15.0905 35.7216 13.0697 35.6495C10.1764 35.5476 7.37501 35.908 4.73026 36.6512C1.92643 41.5629 0.233686 47.1979 0.0224039 53.2356C-0.521958 68.8158 8.90619 82.4273 22.5749 87.9331C27.8047 85.7532 32.2168 81.9849 35.1996 77.2049Z" fill="#FFC400" />
        <path d="M35.1998 77.2047C37.6433 73.2973 39.1222 68.7137 39.2962 63.7772C39.7486 50.792 31.019 39.6214 18.9361 36.5044C18.9063 37.004 18.8789 37.5061 18.8615 38.0057C18.3246 53.4268 24.6954 67.4883 35.1998 77.2047Z" fill="#FF9100" />
        <path d="M37.9435 0C31.0632 5.51321 25.6271 12.7813 22.341 21.1555C20.4594 25.9529 19.2762 31.1032 18.9307 36.5045C31.0135 39.6216 39.7432 50.7922 39.2883 63.7798C39.1168 68.7163 37.6304 73.2949 35.1919 77.2074C39.7929 81.4653 45.1868 84.8806 51.14 87.2196C63.0911 81.6965 71.5697 69.81 72.0594 55.7511C72.3775 46.6411 68.8777 38.5229 63.9337 31.6699C58.7113 24.4242 37.9435 0 37.9435 0Z" fill="#DD2C00" />
    </svg>
);

const ZapierIcon = () => (
    <img src="/logos/zapier.svg" alt="Zapier" className="w-full h-full object-contain" />
);
const MakeIcon = () => (
    <img src="/logos/make.webp" alt="Make (Integromat)" className="w-full h-full object-contain" />
);
const WebhookIcon = () => (
    <img src="/logos/webhook.png" alt="Webhooks" className="w-full h-full object-contain" />
);

/* ---------------- Data ---------------- */
const skillCategories = [
    {
        title: "Frontend & UI/UX",
        icon: CodeIcon,
        description: "Building responsive, accessible, and beautiful user interfaces focused on performance and great user experience.",
        skills: [
            { name: "React", logo: SiReact, color: "#61DAFB" },
            { name: "Next.js", logo: SiNextdotjs, color: "#FFFFFF" },
            { name: "Three.js", logo: SiThreedotjs, color: "#FFFFFF" },
            { name: "TypeScript", logo: SiTypescript, color: "#3178C6" },
            { name: "Figma", logo: FigmaIcon, color: "#F24E1E", use: "Design handoff and prototyping" },
            { name: "Tailwind CSS", logo: SiTailwindcss, color: "#06B6D4" },
            { name: "JavaScript", logo: SiJavascript, color: "#F7DF1E" },
            { name: "HTML5", logo: SiHtml5, color: "#E34F26" },
            { name: "CSS3", logo: SiCss3, color: "#1572B6" },
            { name: "Wordpress", logo: SiWordpress, color: "#21759B" },
            { name: "shadcn/ui", logo: ShadcnIcon, color: "#E6E7EA" },
        ]
    },
    {
        title: "Backend & Data",
        icon: DatabaseIcon,
        description: "Developing robust server-side logic and scalable data solutions that power complex applications with security and efficiency.",
        skills: [
            { name: "Node.js", logo: SiNodedotjs, color: "#339933" },
            { name: "Python", logo: PythonIcon, color: "#3776AB" },
            { name: "Express", logo: SiExpress, color: "#FFFFFF" },
            { name: "PostgreSQL", logo: PostgresIcon, color: "#4169E1" },
            { name: "MongoDB", logo: SiMongodb, color: "#47A248" },
            { name: "Docker", logo: SiDocker, color: "#2496ED" },
            { name: "REST APIs", logo: RestApiIcon, color: "#d1d5db" },
            { name: "WebGL", logo: SiWebgl, color: "#990000" },
            { name: "Firebase", logo: FirebaseIcon, color: "#FFCA28" },
            { name: "AI Integrations", logo: GiBrain, color: "#FFFFFF" },
        ]
    },
    {
        title: "Tools & Workflow",
        icon: WrenchIcon,
        description: "Utilizing industry-standard tools and best practices to ensure code quality, automation, and efficient development cycles.",
        skills: [
            { name: "Git", logo: SiGit, color: "#F05032", use: "Version control, PR workflows, release management" },
            { name: "Playwright", logo: PlaywrightIcon, color: "#2EAD33", use: "End-to-end testing & CI automation" },
            { name: "Selenium", logo: SiSelenium, color: "#43B02A", use: "Browser automation for legacy flows" },
            { name: "Blender", logo: BlenderIcon, color: "#F5792A", use: "3D assets for interactive experiences" },
            { name: "Figma", logo: FigmaIcon, color: "#F24E1E", use: "Design handoff and prototyping" },
            { name: "GLSL", logo: SiOpengl, color: "#5586A4", use: "Custom shader logic for visuals" },
            { name: "Stripe", logo: SiStripe, color: "#635BFF", use: "Payment flows & recurring billing automations" },
            { name: "SendGrid", logo: SendGridIcon, color: "#0069FF", use: "Transactional emails & notification pipelines" },
            { name: "Twilio", logo: SiTwilio, color: "#FF2D55", use: "SMS/voice workflows, 2FA and message routing" },
            { name: "Commio", logo: CommioIcon, color: "#00A3A3", use: "Telephony & messaging integrations" },
            { name: "PayPal", logo: PaypalIcon, color: "#003087", use: "Payments, payouts & gateway integrations" },
            { name: "AI / LLMs", logo: GiBrain, color: "#FFFFFF" },
        ]
    },
    {
        title: "Automation & Integrations",
        icon: FiSettings,
        description: "Designing automation routines and orchestrations that combine services (webhooks, scheduling, messaging, payments, AI) to solve recurring problems.",
        skills: [
            { name: "Zapier", logo: ZapierIcon, color: "#F5A623", use: "No-code automation chains connecting apps & triggers" },
            { name: "Make (Integromat)", logo: MakeIcon, color: "#FF7AB6", use: "Complex multi-step integrations and data transformations" },
            { name: "Webhooks / REST", logo: WebhookIcon, color: "#d1d5db", use: "Event-driven integrations, inbound/outbound webhooks" },
            { name: "Firebase Functions", logo: FirebaseIcon, color: "#FFCA28", use: "Serverless event handlers and background jobs" },
            { name: "Cron / Workers", logo: RiTimerFill, color: "#FFFFFF", use: "Scheduled jobs, batch processing, maintenance tasks" },
            { name: "SendGrid", logo: SendGridIcon, color: "#0069FF", use: "Automated email workflows, retries and templates" },
            { name: "Twilio", logo: SiTwilio, color: "#FF2D55", use: "Programmable SMS/Voice flows, alerts and IVR automations" },
            { name: "Zendesk", logo: ZendeskIcon, color: "#00A884", use: "Auto-ticket creation, routing and SLA enforcement" },
            { name: "Payments (Stripe/PayPal)", logo: SiStripe, color: "#635BFF", use: "Webhook-driven billing, disputes handling and payouts" },
            { name: "AI / LLMs", logo: GiBrain, color: "#FFFFFF", use: "Automated triage, content generation, smart suggestions & agents" },
        ]
    }
];

/* ---------------- Small components ---------------- */
function SkillIcon({ skill }) {
    const LogoComponent = skill.logo;
    const { theme } = useTheme();
    const isDark = theme === 'dark';

    // Names that should render black in light mode
    const forceBlackNames = new Set([
        'Three.js',
        'Zendesk',
        'Next.js',
        'shadcn/ui',
        'Express',
        'AI Integrations',
        'REST APIs',
        'AI / LLMs',
        'Cron / Workers'
    ]);

    // Determine the color to pass to the logo: prefer black in light mode for listed names
    const logoColor = !isDark && (forceBlackNames.has(skill.name) || skill.color === '#FFFFFF') ? '#0a0f19' : skill.color;

    // For image-based logos that need forcing to black (Zendesk), apply a filter
    const imageFilter = (!isDark && skill.name === 'Zendesk') ? 'brightness(0) saturate(100%)' : undefined;

    const containerStyle = {
        backgroundColor: isDark ? 'rgba(15,23,42,0.6)' : '#ffffff',
        boxShadow: isDark ? 'none' : '0 1px 3px rgba(0,0,0,0.06)'
    };
    const labelColor = isDark ? '#cbd5e1' : '#475569';

    return (
        <div className="group relative flex flex-col items-center text-center gap-2" title={skill.use || skill.name}>
            <div className="w-20 h-20 p-3 rounded-2xl flex items-center justify-center transition-all duration-300 group-hover:-translate-y-1" style={containerStyle}>
                <LogoComponent
                    className="w-full h-full object-contain"
                    style={{ color: logoColor, filter: imageFilter }}
                />
            </div>
            <p className="text-sm font-semibold transition-colors group-hover:text-[var(--color-accent)]" style={{ color: labelColor }}>
                {skill.name}
            </p>
        </div>
    );
}

/** Mobile sticky, grid-based category bar for mobile */
function MobileCategoryNav({ activeCategory, setActiveCategory }) {
    const { theme } = useTheme();
    const isDark = theme === 'dark';
    const mobileBg = isDark ? 'rgba(11,18,34,0.7)' : 'rgba(255,255,255,0.92)';
    const borderColor = isDark ? 'rgba(255,255,255,0.04)' : 'rgba(226,232,240,0.8)';

    return (
        <div
            className="md:hidden sticky top-0 z-40 backdrop-blur"
            style={{ top: 'calc(env(safe-area-inset-top, 0px) + 0px)', background: mobileBg, borderBottom: `1px solid ${borderColor}` }}
        >
            <div className="container mx-auto px-2">
                {/* Grid with 4 equal columns (one per category) */}
                <div className="grid grid-cols-4 gap-2 py-2">
                    {skillCategories.map((category) => {
                        const isActive = activeCategory === category.title;
                        return (
                            <button
                                key={category.title}
                                onClick={() => setActiveCategory(category.title)}
                                aria-label={category.title}
                                title={category.title}
                                className="relative w-full flex flex-col items-center justify-center py-4 rounded-lg transition-colors"
                            >
                                <AnimatePresence>
                                    {isActive && (
                                        <motion.span
                                            layoutId="mobile-cat-bg"
                                            className="absolute inset-0 rounded-lg bg-gradient-to-r from-orange-500 to-amber-500"
                                            initial={false}
                                            animate={{ opacity: 1 }}
                                            exit={{ opacity: 0 }}
                                            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                                        />
                                    )}
                                </AnimatePresence>
                                <category.icon className={`relative z-10 w-7 h-7 ${isActive ? 'text-white' : 'text-orange-500'}`} />
                                {/* keep label for screen readers only */}
                                <span className="sr-only">{category.title}</span>
                            </button>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}

/* ---------------- Main component ---------------- */
export default function Skills() {
    const { theme } = useTheme();
    const isDark = theme === 'dark';
    const [activeCategory, setActiveCategory] = useState(skillCategories[0].title);
    const currentCategory = skillCategories.find((cat) => cat.title === activeCategory) || skillCategories[0];

    return (
        <section
            id="skills"
            className="py-24 sm:py-32 relative overflow-visible transition-colors duration-300"
            style={{
                color: isDark ? '#ffffff' : 'var(--color-text-primary)',
                background: isDark ? 'transparent' : 'transparent'
            }}
        >
            {/* Soft glow background */}
            <div className="pointer-events-none absolute left-1/2 top-1/2 z-[5] h-[50rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-orange-400/10 blur-3xl opacity-40" />

            <div className="container relative z-10 mx-auto px-4">
                <motion.div
                    className="mb-16 text-center"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.6 }}
                >
                    <h2
                        className="text-4xl sm:text-5xl font-thin tracking-[0.2em] uppercase"
                        style={{ textShadow: '0 0 15px rgba(245, 158, 66, 0.2)' }}
                    >
                        My Tech Arsenal
                    </h2>
                    <p className="mt-4 max-w-3xl mx-auto text-md font-light tracking-wider text-[var(--color-text-muted)] dark:text-gray-400 opacity-80">
                        An interactive look at the languages, frameworks, and tools I use to bring ideas to life.
                    </p>
                </motion.div>

                {/* Mobile sticky nav */}
                <MobileCategoryNav activeCategory={activeCategory} setActiveCategory={setActiveCategory} />

                <div className="mt-6 flex flex-col gap-10 md:mt-0 md:flex-row lg:gap-16">
                    {/* Desktop sticky sidebar */}
                    <motion.div
                        className="hidden w-full md:block md:w-1/4"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                    >
                        <div className="sticky top-28 z-20">
                            <div className="flex flex-col gap-2">
                                {skillCategories.map((category) => {
                                    const isActive = activeCategory === category.title;
                                    return (
                                        <button
                                            key={category.title}
                                            onClick={() => setActiveCategory(category.title)}
                                            className={`relative flex w-full items-center justify-between px-8 text-end gap-4 overflow-hidden rounded-lg p-4 text-center transition-all duration-300
                        ${isActive ? 'text-white shadow-lg bg-gradient-to-r from-orange-500 to-amber-500' : (isDark ? 'bg-[#0b1222]/60 text-gray-300' : 'bg-white text-[var(--color-text-muted)] border border-[var(--color-border)] hover:text-[var(--color-text-primary)]')}`}
                                        >
                                            <AnimatePresence>
                                                {isActive && (
                                                    <motion.div
                                                        layoutId="desktop-cat-bg"
                                                        className="absolute inset-0 z-0 bg-gradient-to-r from-orange-500 to-amber-500"
                                                        initial={false}
                                                        animate={{ opacity: 1 }}
                                                        exit={{ opacity: 0 }}
                                                    />
                                                )}
                                            </AnimatePresence>
                                            <category.icon
                                                className={`relative z-10 h-7 w-7 flex-shrink-0 transition-colors ${isActive ? 'text-white' : 'text-orange-400'
                                                    }`}
                                            />
                                            <span className="relative z-10 hidden font-semibold sm:inline">{category.title}</span>
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                    </motion.div>

                    {/* Right panel */}
                    <div className="w-full md:w-3/4">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeCategory}
                                initial={{ opacity: 0, y: 12 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -12 }}
                                transition={{ duration: 0.35 }}
                            >
                                <div
                                    className="rounded-2xl border p-8 shadow-2xl shadow-orange-900/10 backdrop-blur-lg transition-colors"
                                    style={{
                                        borderColor: isDark ? 'rgba(255,255,255,0.04)' : 'var(--color-border)',
                                        background: isDark ? 'rgba(16,23,39,0.45)' : 'linear-gradient(180deg,#ffffff,#f6f7fb)'
                                    }}
                                >
                                    <p className="mb-8 text-base leading-relaxed text-[var(--color-text-muted)] dark:text-gray-400">{currentCategory.description}</p>
                                    <div className="grid grid-cols-3 gap-x-4 gap-y-8 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6">
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
