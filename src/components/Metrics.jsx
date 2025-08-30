import React, { useRef } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';

// --- Reusable AnimatedCounter component ---
const AnimatedCounter = ({ value, isVisible, hasPlus }) => {
  const [count, setCount] = React.useState(0);

  React.useEffect(() => {
    if (isVisible) {
      let start = 0;
      const end = parseInt(value, 10);
      if (start === end) return;

      const duration = 2000; // ms
      const range = end - start;
      let increment = Math.ceil(range / (duration / 16));
      if (increment < 1) increment = 1;

      const timer = setInterval(() => {
        start += increment;
        if (start >= end) {
          setCount(end);
          clearInterval(timer);
        } else {
          setCount(start);
        }
      }, 16);

      return () => clearInterval(timer);
    }
  }, [isVisible, value]);

  return (
    <div className="text-5xl font-extrabold text-accent">
      {count.toLocaleString()}
      {hasPlus && '+'}
    </div>
  );
};

// --- Reusable MetricCard component with enhanced scroll animation ---
const MetricCard = ({ icon, value, label, hasPlus, index }) => {
    const cardRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: cardRef,
        offset: ["start end", "end center"]
    });

    // Scale and opacity are transformed based on scroll progress
    const scale = useTransform(scrollYProgress, [0, 1], [0.8, 1]);
    const opacity = useTransform(scrollYProgress, [0, 1], [0.2, 1]);
    const isVisible = useInView(cardRef, { once: true, amount: 0.5 });


    return (
        <motion.div
            ref={cardRef}
            style={{ scale, opacity }}
            className="group relative p-8 rounded-2xl overflow-hidden border border-white/10 bg-background/50 backdrop-blur-lg shadow-lg text-center flex flex-col items-center justify-center h-64"
        >
            <div className="relative z-10">
                <div className="text-4xl mb-4">{icon}</div>
                <AnimatedCounter value={value} isVisible={isVisible} hasPlus={hasPlus} />
                <p className="text-md text-text-muted mt-2">
                    {label}
                </p>
            </div>
            <div className="absolute inset-0 bg-gradient-to-br from-purple-600 to-indigo-600 opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
        </motion.div>
    );
};

// --- Main Metrics Section Component ---
export const Metrics = () => {
  const ref = useRef(null);
  const isVisible = useInView(ref, { once: true, amount: 0.2 });

  const metrics = [
    { value: 16000, label: 'Linkedin/Instagram impressions', icon: '📈' },
    { value: 20, label: 'Events hosted over 2 years', icon: '📅' },
    { value: 3000, label: 'Dollars in sponsorships', icon: '💰', hasPlus: true },
  ];

  return (
    <section id="metrics" className="py-24 bg-muted relative overflow-hidden transition-colors duration-500">
      <div className="absolute -top-1/4 -right-1/4 w-1/2 h-1/2 bg-accent/10 rounded-full blur-3xl" />
      <div className="absolute -bottom-1/4 -left-1/4 w-1/2 h-1/2 bg-indigo-500/10 rounded-full blur-3xl" />

      <div ref={ref} className="relative z-10 max-w-7xl mx-auto px-6">
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: isVisible ? 1 : 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-foreground">By The Numbers</h2>
          <p className="text-lg text-text-muted mt-4 max-w-3xl mx-auto">
            Our community's growth and engagement, quantified.
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-purple-600 to-indigo-600 mx-auto mt-4 rounded-full" />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {metrics.map((metric, index) => (
            <MetricCard
              key={index}
              {...metric}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
};