import { motion } from 'framer-motion';

function Button({ children, variant = 'primary', className = '', ...props }) {
  const variants = {
    primary: 'bg-black text-white hover:bg-opacity-90',
    outline: 'border-2 border-black text-black hover:bg-gray-100',
    accent: 'bg-primary text-white hover:bg-opacity-90'
  };

  return (
    <motion.button
      className={`px-6 py-3 font-bold transition-colors rounded-r-lg ${variants[variant]} ${className}`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      {...props}
    >
      {children}
    </motion.button>
  );
}

export default Button;
