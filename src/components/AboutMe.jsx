import { motion } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';

// --- Custom Hook for the 3D Card Effect (Unchanged) ---
const use3dCardEffect = () => {
    const ref = useRef(null);
    const [style, setStyle] = useState({});

    useEffect(() => {
        const element = ref.current;
        if (!element) return;

        const handleMouseMove = (e) => {
            const { clientX, clientY } = e;
            const { width, height, left, top } = element.getBoundingClientRect();
            
            const mouseX = clientX - left;
            const mouseY = clientY - top;
            
            const rotateX = (mouseY / height - 0.5) * -25;
            const rotateY = (mouseX / width - 0.5) * 25;

            setStyle({
                transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`,
                transition: 'transform 0.1s ease-out'
            });
        };

        const handleMouseLeave = () => {
            setStyle({
                transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)',
                transition: 'transform 0.6s cubic-bezier(0.23, 1, 0.32, 1)'
            });
        };

        element.addEventListener('mousemove', handleMouseMove);
        element.addEventListener('mouseleave', handleMouseLeave);

        return () => {
            element.removeEventListener('mousemove', handleMouseMove);
            element.removeEventListener('mouseleave', handleMouseLeave);
        };
    }, []);

    return { ref, style };
};

// --- Icon Components (Unchanged) ---
const BrainIcon = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M12 2a4.5 4.5 0 0 0-4.5 4.5v1.4a6.5 6.5 0 0 0-1.2 11.2 6.5 6.5 0 0 0 11.4 0 6.5 6.5 0 0 0-1.2-11.2V6.5A4.5 4.5 0 0 0 12 2z"></path><path d="M12 14a2.5 2.5 0 0 0-2.5 2.5v0a2.5 2.5 0 0 0 2.5 2.5h0a2.5 2.5 0 0 0 2.5-2.5v0A2.5 2.5 0 0 0 12 14z"></path><path d="M12 14v-2"></path><path d="M17.5 9.5v-1"></path><path d="M6.5 9.5v-1"></path></svg>
);
const GlobeIcon = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/></svg>
);
const LayersIcon = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><polygon points="12 2 2 7 12 12 22 7 12 2"></polygon><polyline points="2 17 12 22 22 17"></polyline><polyline points="2 12 12 17 22 12"></polyline></svg>
);
const ZapIcon = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon></svg>
);


export default function AboutMe() {
    const card3d = use3dCardEffect();
    const { theme } = useTheme();
    const isDark = theme === 'dark';
 
    return (
        <section
            id="aboutme"
            className="py-24 sm:py-32 relative overflow-hidden transition-colors duration-300"
            style={{
                background: isDark ? 'transparent' : 'transparent',
                color: isDark ? '#ffffff' : 'var(--color-text-primary)'
            }}
        >
            <div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[50rem] h-[50rem] rounded-full blur-3xl opacity-50 pointer-events-none z-5"
                style={{ background: isDark ? 'rgba(6,182,129,0.06)' : 'rgba(16,185,129,0.06)' }}
            />
 
            <div className="container px-4 mx-auto relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <h2 
                        className="text-4xl sm:text-5xl font-thin tracking-[0.2em] uppercase"
                        style={{ textShadow: '0 0 15px rgba(16, 185, 129, 0.25)', color: isDark ? '#ffffff' : '#0f172a' }}
                    >
                        About Me
                    </h2>
                    <p
                        className="mt-4 text-md max-w-2xl mx-auto font-light tracking-wider opacity-80"
                        style={{ color: isDark ? '#cbd5e1' : '#475569' }}
                    >
                        Here’s a little bit about my journey and passions.
                    </p>
                </motion.div>
 
                <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-center">
                    <motion.div
                        className="lg:w-2/5 w-full"
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, amount: 0.2 }}
                        transition={{ duration: 0.7 }}
                    >
                        <div ref={card3d.ref} className="relative w-full max-w-sm mx-auto">
                            {/* decorative background behind the card */}
                            <div
                                className="absolute inset-0 rounded-full blur-3xl opacity-50 -z-10"
                                style={{ background: isDark ? 'rgba(6,182,129,0.06)' : 'rgba(16,185,129,0.06)' }}
                            />
                            <motion.div
                                style={{ ...card3d.style, borderRadius: '9999px' }}
                                className="relative z-10 overflow-hidden w-full shadow-2xl"
                                role="img"
                                aria-label="Profile artwork"
                            >
                                <img
                                    src="/images/projects/avatar.png"
                                    alt="A creative workspace representing Jose Villa's work"
                                    title="A creative workspace representing Jose Villa's work"
                                    aria-label="A creative workspace representing Jose Villa's work"
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute inset-0" style={{ background: isDark ? 'linear-gradient(to top, rgba(0,0,0,0.25), transparent)' : 'linear-gradient(to top, rgba(255,255,255,0.12), transparent)' }} />
                            </motion.div>
                        </div>
                     </motion.div>
 
                     <motion.div
                        className="lg:w-3/5"
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, amount: 0.2 }}
                        transition={{ duration: 0.7, delay: 0.2 }}
                    >
                        <h3
                            className="text-2xl md:text-3xl font-bold mb-6 leading-snug"
                            style={{ color: isDark ? '#ffffff' : '#0f172a' }}
                        >
                            I build digital tools that are effective, engaging, and easy to use.
                        </h3>
 
                        <div
                            className="space-y-4 mb-8 leading-relaxed font-light"
                            style={{ color: isDark ? '#cbd5e1' : '#475569' }}
                        >
                            <p>
                                I'm <strong className="font-semibold" style={{ color: isDark ? '#ffffff' : '#0f172a' }}>Jose Daniel Villa</strong>, a 23-year-old Fullstack Developer from <strong className="font-semibold">
                                    <span className="text-amber-400">Colo</span>
                                    <span className="text-blue-400">mb</span>
                                    <span className="text-red-400">ia</span>
                                </strong>. I love bringing ideas to life through technology, especially by building digital tools that are both useful and intuitive.
                            </p>
                            <p>
                                Lately, I've become fully passionate about 3D experiences and how they can solve real needs and elevate website interactions to a whole new level. I also enjoy designing and tailoring automations — composing workflows that combine APIs, webhooks, serverless functions and no-code platforms — to automate repetitive routines, provide configurable options, and solve recurring problems across systems.
                            </p>
                            <p>
                                When I'm not coding, you'll find me drawing, painting, or making music. I enjoy going to the gym, learning new languages, and I'm always curious to explore something new—whether it's a creative hobby, a fresh tech challenge, or prototyping an automation to streamline daily work.
                            </p>
                        </div>
                        
                        <div
                            className="backdrop-blur-lg p-6 rounded-xl transition-colors"
                            style={{
                                background: isDark ? 'rgba(16,23,39,0.45)' : '#ffffff',
                                border: isDark ? '1px solid rgba(16,185,129,0.12)' : '1px solid rgba(15,23,42,0.04)',
                                boxShadow: isDark ? '0 10px 30px rgba(6,182,129,0.06)' : '0 6px 20px rgba(12,16,27,0.06)'
                            }}
                        >
                             <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-6 gap-x-4">
                                {[
                                    { icon: GlobeIcon, label: "Languages", value: "Spanish (Native) · English (C1) · French (A2)" },
                                    { icon: BrainIcon, label: "Problem Solving", value: "Analytical thinker — breaks down complex problems, prototypes fast, and iterates until solutions scale." },
                                    { icon: ZapIcon, label: "Leadership & Ownership", value: "Leads by example, takes responsibility for outcomes, mentors teammates and drives projects to delivery." },
                                    { icon: LayersIcon, label: "Collaboration & Workflow", value: "Clear communicator across teams — efficient multitasking, prioritization, and cross-functional coordination." },
                                    { icon: GlobeIcon, label: "Adaptability & Growth", value: "Quick to learn new stacks and pivot when requirements change; focused on continuous improvement." },
                                ].map((item) => (
                                     <div key={item.label} className="flex items-center gap-4">
                                         <div
                                             className="p-2 rounded-lg"
                                             style={{
                                                 background: isDark ? 'rgba(6,182,129,0.06)' : '#ecfdf5',
                                                 border: isDark ? '1px solid rgba(6,182,129,0.12)' : '1px solid rgba(16,185,129,0.12)'
                                             }}
                                         >
                                             <item.icon className="w-6 h-6" style={{ color: isDark ? '#34d399' : '#059669' }} />
                                         </div>
                                         <div>
                                             <h4 style={{ color: isDark ? '#f8fafc' : '#0f172a' }} className="font-semibold">{item.label}</h4>
                                             <p className="text-sm" style={{ color: isDark ? '#cbd5e1' : '#475569' }}>{item.value}</p>
                                         </div>
                                     </div>
                                 ))}
                             </div>
                         </div>
                     </motion.div>
                 </div>
             </div>
         </section>
     );
 }