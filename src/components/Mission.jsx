import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

// --- Reusable Icon Component ---
const Icon = ({ path, className }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d={path} />
    </svg>
);

// --- 3D Interactive Card Component ---
const MissionCard = ({ icon, title, description, isVisible, index }) => {
    const cardRef = useRef(null);

    const handleMouseMove = (e) => {
        const { clientX, clientY, currentTarget } = e;
        const { left, top, width, height } = currentTarget.getBoundingClientRect();
        const x = (clientX - left - width / 2) / 15;
        const y = (clientY - top - height / 2) / 15;

        currentTarget.style.transition = 'transform 0.1s linear';
        currentTarget.style.transform = `perspective(1000px) rotateY(${x}deg) rotateX(${-y}deg) scale3d(1.05, 1.05, 1.05)`;
    };

    const handleMouseLeave = (e) => {
        e.currentTarget.style.transition = 'transform 0.5s cubic-bezier(0.23, 1, 0.32, 1)';
        e.currentTarget.style.transform = 'perspective(1000px) rotateY(0) rotateX(0) scale3d(1, 1, 1)';
    };

    return (
        <motion.div
            ref={cardRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 40 }}
            transition={{ duration: 0.5, delay: index * 0.15 }}
            className="group relative p-8 rounded-2xl overflow-hidden border border-white/10 bg-background/50 backdrop-blur-lg shadow-lg"
        >
            <div className="relative z-10 flex flex-col items-center text-center h-full">
                <div className="mb-6 p-4 rounded-full bg-accent/10 border border-accent/20">
                    {icon}
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-4">{title}</h3>
                <p className="text-md text-text-muted leading-relaxed">
                    {description}
                </p>
            </div>
            <div className="absolute inset-0 bg-gradient-to-br from-purple-600 to-indigo-600 opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
        </motion.div>
    );
};

export const Mission = () => {
    const sectionRef = useRef(null);
    const [titleRef, isTitleVisible] = useScrollAnimation({ threshold: 0.5 });
    const [cardsRef, areCardsVisible] = useScrollAnimation({ threshold: 0.2 });

    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ['start end', 'end start'],
    });

    // Animate background blurs based on scroll
    const rotate1 = useTransform(scrollYProgress, [0, 1], [-20, 20]);
    const rotate2 = useTransform(scrollYProgress, [0, 1], [30, -30]);

    const missionPillars = [
        {
            icon: <Icon path="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" className="h-10 w-10 text-accent"/>,
            title: "Empower",
            description: "Fostering a vibrant community for students to explore the intersection of business and technology."
        },
        {
            icon: <Icon path="M13 10V3L4 14h7v7l9-11h-7z" className="h-10 w-10 text-accent"/>,
            title: "Develop",
            description: "Providing invaluable opportunities for professional development and hands-on experience with emerging tech."
        },
        {
            icon: <Icon path="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.196-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.783-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" className="h-10 w-10 text-accent"/>,
            title: "Lead",
            description: "Preparing our members to excel as the next generation of innovators and leaders in the digital economy."
        }
    ];

    return (
        <section ref={sectionRef} id="about" className="py-24 bg-muted relative overflow-hidden transition-colors duration-500">
            {/* Animated decorative blur elements */}
            <motion.div
                style={{ rotate: rotate1 }}
                className="absolute -top-1/4 -right-1/4 w-1/2 h-1/2 bg-accent/5 rounded-full blur-3xl"
            />
            <motion.div
                style={{ rotate: rotate2 }}
                className="absolute -bottom-1/4 -left-1/4 w-1/2 h-1/2 bg-indigo-500/5 rounded-full blur-3xl"
            />

            <div className="relative z-10 max-w-7xl mx-auto px-6">
                <motion.div
                    ref={titleRef}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: isTitleVisible ? 1 : 0, y: isTitleVisible ? 0 : 20 }}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl font-bold text-foreground">Our Mission</h2>
                    <p className="text-lg text-text-muted mt-4 max-w-3xl mx-auto">
                        We are dedicated to bridging the gap between business and technology, one student at a time.
                    </p>
                    <div className="w-24 h-1 bg-gradient-to-r from-purple-600 to-indigo-600 mx-auto mt-4 rounded-full" />
                </motion.div>

                <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {missionPillars.map((pillar, index) => (
                        <MissionCard key={index} {...pillar} isVisible={areCardsVisible} index={index} />
                    ))}
                </div>
            </div>
        </section>
    );
};