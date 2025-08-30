import React, { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export const Hero = () => {
    const [videoEnded, setVideoEnded] = useState(false);
    const videoRef = useRef(null);
    const heroRef = useRef(null);

    const { scrollYProgress } = useScroll({
        target: heroRef,
        offset: ["start start", "end start"]
    });
    const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
    const opacity = useTransform(scrollYProgress, [0, 0.8, 1], [1, 0.5, 0]);

    const scrollToSection = (id) => {
        document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        const video = videoRef.current;
        const handleVideoEnd = () => {
            if (video) {
                video.currentTime = 0;
                video.pause();
            }
            setVideoEnded(true);
        };

        const timer = setTimeout(() => {
            setVideoEnded(true);
        }, 5000); // Set a 5-second timer as a fallback

        if (video) {
            video.addEventListener('ended', handleVideoEnd);
        }

        return () => {
            if (video) {
                video.removeEventListener('ended', handleVideoEnd);
            }
            clearTimeout(timer);
        };
    }, []);

    const title = "Telfer Business Technology Association".split(" ");

    const containerVariants = {
      visible: {
        transition: {
          staggerChildren: 0.08,
        },
      },
    };

    const wordVariants = {
      hidden: { opacity: 0, y: 20 },
      visible: {
        opacity: 1,
        y: 0,
        transition: {
          type: 'spring',
          damping: 15,
          stiffness: 100,
        },
      },
    };

    return (
        <section ref={heroRef} id="hero" className="relative h-screen flex items-center justify-center text-white overflow-hidden bg-background transition-colors duration-500">
            <motion.div style={{ y, opacity }} className="absolute inset-0 z-0">
                <div className="absolute inset-16 rounded-[3rem] overflow-hidden">
                    <div className="absolute inset-0 bg-black opacity-50 z-10"></div>
                    <video
                        ref={videoRef}
                        // Use Vite's BASE_URL to create the correct path for both dev and production
                        src={`${import.meta.env.BASE_URL}images_intro.mov`}
                        autoPlay
                        muted
                        playsInline
                        className="absolute top-0 left-0 w-full h-full object-cover z-0"
                    />
                </div>
            </motion.div>

            <motion.div
                className="relative z-20 text-center px-4"
                initial="hidden"
                animate={videoEnded ? "visible" : "hidden"}
                variants={{ visible: { transition: { staggerChildren: 0.3 } } }}
            >
                <motion.h1
                    className="text-5xl md:text-7xl font-extrabold mb-4 drop-shadow-2xl text-shadow-lg"
                    variants={containerVariants}
                >
                    {title.map((word, index) => (
                      <motion.span key={index} variants={wordVariants} className="inline-block mr-4">
                        {word}
                      </motion.span>
                    ))}
                </motion.h1>
                <motion.p
                    className="text-lg md:text-2xl mb-8 max-w-3xl mx-auto drop-shadow-lg text-shadow"
                    variants={wordVariants}
                >
                    Bridging the gap between business acumen and technological innovation.
                </motion.p>
                {/*<motion.button
                    onClick={() => scrollToSection('Contact')}
                    className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-bold py-3 px-8 rounded-full transition-all duration-300 transform shadow-lg hover:shadow-purple-400/50"
                    whileHover={{ scale: 1.1, y: -5 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                    variants={wordVariants}
                    style={{ willChange: 'transform' }}
                >
                    Join Our Community
                </motion.button> remove once join link has been updated*/}
            </motion.div>
        </section>
    );
};
