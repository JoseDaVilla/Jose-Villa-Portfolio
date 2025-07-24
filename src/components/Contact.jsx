import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

// Import the new Select component
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '../components/ui/select';
import { cn } from "../lib/utils"
// Import icons from lucide-react
import {
    HelpCircle,
    Handshake,
    Book,
    Mic,
    FileText,
    Users,
    MoreHorizontal,
    User,
    Mail,
    Send,
    CheckCircle2,
    Linkedin,
    Github,
} from 'lucide-react';


// --- Reusable Form Field Component (now with lucide-react) ---
const FormField = ({ id, label, type = 'text', placeholder, value, onChange, icon: Icon, required = false }) => (
    <motion.div
        className="relative"
        variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
    >
        <label htmlFor={id} className="sr-only">{label}</label>
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Icon className="h-5 w-5 text-gray-500" />
        </div>
        {/* Updated input styling to match the new select trigger */}
        <input
            type={type}
            id={id}
            name={id}
            value={value}
            onChange={onChange}
            required={required}
            className="flex h-[50px] w-full items-center rounded-lg border-2 border-purple-800/40 bg-gray-900/50 pl-12 pr-4 py-2 text-sm text-gray-200 placeholder:text-gray-400 ring-offset-black focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-offset-1 transition-all"
            placeholder={placeholder}
        />
    </motion.div>
);

// Updated with lucide-react icons
const SUBJECT_OPTIONS = [
    { label: "General Inquiry", icon: HelpCircle },
    { label: "I want to work with you", icon: Handshake },
    { label: "Consultation", icon: Book },
    { label: "Interview", icon: Mic },
    { label: "Job Application", icon: FileText },
    { label: "Collaboration Proposal", icon: Users },
    { label: "Other", icon: MoreHorizontal }
];

export default function Contact() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: '',
        subject: SUBJECT_OPTIONS[0].label
    });
    const [status, setStatus] = useState('idle');
    const [errorMsg, setErrorMsg] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubjectChange = (value) => {
        setFormData(prev => ({ ...prev, subject: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Check required fields
        if (!formData.name || !formData.email || !formData.subject || !formData.message) {
            setErrorMsg('Please fill in all required fields.');
            return;
        }
        setStatus('sending');
        setErrorMsg('');
        try {
            await fetch('https://villa-portfolio-backend-4vau.vercel.app/send-mail', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    to: formData.email,
                    subject: formData.subject,
                    message: formData.message,
                    name: formData.name
                }),
            });
            setStatus('success');
        } catch (err) {
            setStatus('error');
            setErrorMsg('Sorry, something went wrong. Please try again later.');
        }
    };
    
    // Find the icon for the currently selected subject
    const CurrentSubjectIcon = SUBJECT_OPTIONS.find(opt => opt.label === formData.subject)?.icon;

    const formVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.2 } }
    };

    return (
        <section id="contact" className="py-24 sm:py-32 text-white relative overflow-hidden">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[50rem] h-[50rem] bg-purple-500/10 rounded-full blur-3xl opacity-50 pointer-events-none"></div>

            <div className="container px-4 mx-auto relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.6 }}
                    className="mb-16 text-center"
                >
                    <h2 className="text-4xl sm:text-5xl font-thin tracking-[0.2em] uppercase text-gray-100" style={{textShadow: '0 0 15px rgba(168, 85, 247, 0.5)'}}>
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
                    className="max-w-2xl mx-auto bg-[#101727]/40 backdrop-blur-lg p-6 sm:p-8 rounded-2xl shadow-2xl border border-purple-800/20 shadow-purple-900/20"
                >
                    <AnimatePresence mode="wait">
                        {status === 'success' ? (
                            <motion.div key="success" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.8 }} className="text-center py-10">
                                <CheckCircle2 className="text-purple-500 mx-auto mb-4 h-20 w-20" strokeWidth={1.5}/>
                                <h3 className="text-2xl font-bold text-gray-100 mb-2">Message Sent!</h3>
                                <p className="text-gray-400">Thank you for reaching out. I'll get back to you as soon as possible.</p>
                            </motion.div>
                        ) : (
                            <motion.div key="form" variants={formVariants} initial="hidden" animate="visible" exit={{ opacity: 0, y: -20 }}>
                                <div className="flex justify-between items-center mb-6">
                                    <div>
                                        <h3 className="text-xl sm:text-2xl font-bold text-gray-100">Send a Message</h3>
                                        <p className="text-gray-400 text-sm">Or connect on social media</p>
                                    </div>
                                    <div className="flex gap-4">
                                        <a href="#" className="text-gray-400 hover:text-purple-400 transition-colors"><Linkedin className="h-6 w-6"/></a>
                                        <a href="#" className="text-gray-400 hover:text-purple-400 transition-colors"><Github className="h-6 w-6"/></a>
                                    </div>
                                </div>
                                <form onSubmit={handleSubmit} className="space-y-5">
                                    <FormField id="name" label="Name" placeholder="Your Name" value={formData.name} onChange={handleChange} icon={User} required />
                                    <FormField id="email" label="Email" type="email" placeholder="your.email@example.com" value={formData.email} onChange={handleChange} icon={Mail} required />
                                    <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}>
                                        <Select onValueChange={handleSubjectChange} defaultValue={formData.subject} required>
                                            <SelectTrigger aria-label="Subject">
                                                <div className="flex items-center gap-3 text-gray-200">
                                                    <SelectValue />
                                                </div>
                                            </SelectTrigger>
                                            <SelectContent>
                                                {SUBJECT_OPTIONS.map(option => (
                                                    <SelectItem key={option.label} value={option.label}>
                                                        <div className="flex items-center gap-3">
                                                            <option.icon className="h-5 w-5" />
                                                            <span>{option.label}</span>
                                                        </div>
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </motion.div>
                                    <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}>
                                        <label htmlFor="message" className="sr-only">Message</label>
                                        <textarea
                                            id="message"
                                            name="message"
                                            value={formData.message}
                                            onChange={handleChange}
                                            required
                                            rows="4"
                                            placeholder="Tell me about your project..."
                                            className="flex min-h-[80px] w-full rounded-lg border-2 border-purple-800/40 bg-gray-900/50 px-4 py-3 text-sm text-gray-200 placeholder:text-gray-400 ring-offset-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-600 focus-visible:ring-offset-1 resize-y"
                                        ></textarea>
                                    </motion.div>
                                    <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}>
                                        <button type="submit" disabled={status === 'sending'} className="w-full inline-flex items-center justify-center gap-2 px-6 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-lg shadow-lg hover:from-purple-700 hover:to-pink-700 transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed">
                                            {status === 'sending' ? 'Sending...' : 'Send Message'}
                                            <Send className="h-5 w-5" />
                                        </button>
                                        {errorMsg && <p className="mt-2 text-red-400 text-sm text-center">{errorMsg}</p>}
                                        {status === 'error' && !errorMsg && <p className="mt-2 text-red-400 text-sm text-center">Sorry, something went wrong. Please try again later.</p>}
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