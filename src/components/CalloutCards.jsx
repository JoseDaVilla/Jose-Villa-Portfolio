import { motion } from 'framer-motion';

function CalloutCards() {
  const fadeInUp = {
    hidden: { opacity: 0, y: 60 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <section className="py-16">
      <div className="container px-4 mx-auto">
        <motion.h2 
          className="mb-12 text-3xl"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          My Specialties
        </motion.h2>
        
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          <motion.div 
            className="relative p-8 overflow-hidden rounded-2xl bg-secondary"
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <div className="relative z-10">
              <h3 className="mb-3 text-2xl font-bold">Fullstack Development</h3>
              <p className="mb-6 text-black">
                Building complete web applications from front to back. Expertise in React, 
                Node.js, and modern databases, creating seamless user experiences and 
                robust backend systems.
              </p>
              <a href="#projects" className="inline-block font-bold underline">
                View projects →
              </a>
            </div>
            <div className="absolute -right-10 -bottom-10 w-40 h-40 rounded-full bg-primary opacity-10"></div>
          </motion.div>
          
          <motion.div 
            className="relative p-8 overflow-hidden rounded-2xl bg-secondary"
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <div className="relative z-10">
              <h3 className="mb-3 text-2xl font-bold">3D Web Development</h3>
              <p className="mb-6 text-black">
                Creating immersive 3D experiences for the web using Three.js and React Three Fiber.
                Interactive visualizations, 3D models, and animated experiences that bring websites to life.
              </p>
              <a href="#projects" className="inline-block font-bold underline">
                View projects →
              </a>
            </div>
            <div className="absolute -right-10 -bottom-10 w-40 h-40 rounded-full bg-primary opacity-10"></div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default CalloutCards;
