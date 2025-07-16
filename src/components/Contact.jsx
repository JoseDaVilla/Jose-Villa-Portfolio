import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

// --- Icon Components ---
const UserIcon = (props) => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>;
const MailIcon = (props) => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><rect x="2" y="4" width="20" height="16" rx="2"></rect><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path></svg>;
const SendIcon = (props) => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>;
const CheckCircleIcon = (props) => <svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>;
const LinkedInIcon = (props) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" {...props}><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>;
const GitHubIcon = (props) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" {...props}><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>;

// --- Reusable Form Field Component ---
const FormField = ({ id, label, type = 'text', placeholder, value, onChange, icon: Icon, required = false }) => (
    <motion.div 
        className="relative"
        variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0 }
        }}
    >
        <label htmlFor={id} className="sr-only">{label}</label>
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Icon className="text-gray-500" />
        </div>
        <input
            type={type}
            id={id}
            name={id}
            value={value}
            onChange={onChange}
            required={required}
            className="w-full pl-12 pr-4 py-3 bg-gray-900/50 text-gray-200 placeholder-gray-500 border-2 border-red-400/20 rounded-lg focus:ring-2 focus:ring-red-500/50 focus:border-red-500 transition-all outline-none"
            placeholder={placeholder}
        />
    </motion.div>
);

export default function Contact() {
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });
    const [status, setStatus] = useState('idle'); // 'idle', 'sending', 'success', 'error'

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('sending');
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));
        console.log('Form submitted:', formData);
        setStatus('success');
    };

    const formVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.2,
            }
        }
    };

    return (
        <section id="contact" className="py-24 sm:py-32 text-white relative overflow-hidden">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[50rem] h-[50rem] bg-red-500/10 rounded-full blur-3xl opacity-50 pointer-events-none z-5"></div>

            <div className="container px-4 mx-auto relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.6 }}
                    className="mb-16 text-center"
                >
                    <h2 className="text-4xl sm:text-5xl font-thin tracking-[0.2em] uppercase text-gray-100" style={{textShadow: '0 0 15px rgba(239, 68, 68, 0.5)'}}>
                        Let's Work Together
                    </h2>
                    <p className="mx-auto mt-4 max-w-2xl text-md text-gray-400 font-light tracking-wider opacity-80">
                        Have a project in mind or just want to say hello? I'd love to hear from you.
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.7 }}
                    className="max-w-2xl mx-auto bg-[#101727]/40 backdrop-blur-lg p-6 sm:p-8 rounded-2xl shadow-2xl border border-red-400/20 shadow-red-900/20"
                >
                    <AnimatePresence mode="wait">
                        {status === 'success' ? (
                            <motion.div
                                key="success"
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.8 }}
                                className="text-center py-10"
                            >
                                <CheckCircleIcon className="text-red-500 mx-auto mb-4" />
                                <h3 className="text-2xl font-bold text-gray-100 mb-2">Message Sent!</h3>
                                <p className="text-gray-400">Thank you for reaching out. I'll get back to you as soon as possible.</p>
                            </motion.div>
                        ) : (
                            <motion.div 
                                key="form" 
                                variants={formVariants}
                                initial="hidden"
                                animate="visible"
                                exit={{ opacity: 0, y: -20 }}
                            >
                                <div className="flex justify-between items-center mb-6">
                                    <div>
                                        <h3 className="text-xl sm:text-2xl font-bold text-gray-100">Send a Message</h3>
                                        <p className="text-gray-400 text-sm">Or connect on social media</p>
                                    </div>
                                    <div className="flex gap-4">
                                        <a href="#" className="text-gray-400 hover:text-red-400 transition-colors"><LinkedInIcon /></a>
                                        <a href="#" className="text-gray-400 hover:text-red-400 transition-colors"><GitHubIcon /></a>
                                    </div>
                                </div>
                                <form onSubmit={handleSubmit} className="space-y-5">
                                    <FormField id="name" label="Name" placeholder="Your Name" value={formData.name} onChange={handleChange} icon={UserIcon} required />
                                    <FormField id="email" label="Email" type="email" placeholder="your.email@example.com" value={formData.email} onChange={handleChange} icon={MailIcon} required />
                                    <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}>
                                        <label htmlFor="message" className="sr-only">Message</label>
                                        <textarea id="message" name="message" value={formData.message} onChange={handleChange} required rows="4" placeholder="Tell me about your project..." className="w-full px-4 py-3 bg-gray-900/50 text-gray-200 placeholder-gray-500 border-2 border-red-400/20 rounded-lg focus:ring-2 focus:ring-red-500/50 focus:border-red-500 transition-all outline-none resize-y"></textarea>
                                    </motion.div>
                                    <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}>
                                        <button
                                            type="submit"
                                            disabled={status === 'sending'}
                                            className="w-full inline-flex items-center justify-center gap-2 px-6 py-4 bg-gradient-to-r from-red-600 to-pink-600 text-white font-semibold rounded-lg shadow-lg hover:from-red-700 hover:to-pink-700 transition-all transform hover:scale-105 disabled:from-red-400 disabled:to-pink-400 disabled:cursor-not-allowed"
                                        >
                                            {status === 'sending' ? 'Sending...' : 'Send Message'}
                                            <SendIcon />
                                        </button>
                                    </motion.div>
                                </form>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.div>
            </div>
        </section>
    );
}