import { motion } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';

function Stats() {
  // Set up counter animation
  const [isInView, setIsInView] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
        }
      },
      { threshold: 0.1 }
    );
    
    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  // Stat items with counters
  const stats = [
    { value: 40, label: "Projects Delivered" },
    { value: 25, label: "Happy Clients" },
    { value: 10, label: "3D Experiences" },
    { value: 5, label: "Years Experience" }
  ];

  return (
    <section className="py-16 bg-gray-50" ref={ref}>
      <div className="container px-4 mx-auto">
        <motion.h2 
          className="mb-12 text-3xl"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Achievement Highlights
        </motion.h2>
        
        <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
          {stats.map((stat, index) => (
            <motion.div 
              key={index}
              className="p-6 rounded-lg bg-lightgray"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <motion.div 
                className="text-4xl font-bold"
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
              >
                {isInView ? `${stat.value}+` : '0+'}
              </motion.div>
              <div className="text-sm font-medium">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Stats;
