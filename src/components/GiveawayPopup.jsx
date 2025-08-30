import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { XIcon } from '../icons/XIcon';

export const GiveawayPopup = () => {
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        const hasDeclined = localStorage.getItem('giveawayDeclined');

        if (!hasDeclined) {
            const timer = setTimeout(() => {
                setIsOpen(true);
            }, 2000);
            return () => clearTimeout(timer);
        }
    }, []);

    useEffect(() => {
        const handleEsc = (event) => {
            if (event.keyCode === 27) {
                setIsOpen(false);
            }
        };
        window.addEventListener('keydown', handleEsc);
        return () => {
            window.removeEventListener('keydown', handleEsc);
        };
    }, []);

    const closePopup = () => setIsOpen(false);

    const closePopupPermanently = () => {
        localStorage.setItem('giveawayDeclined', 'true');
        setIsOpen(false);
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center z-[10000] p-4"
                    onClick={closePopup}
                >
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0, y: 20 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.9, opacity: 0, y: 20 }}
                        transition={{ duration: 0.3, ease: 'easeOut' }}
                        className="relative bg-muted dark:bg-muted/70 text-foreground rounded-2xl shadow-2xl max-w-md w-full overflow-hidden border border-border"
                        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
                    >
                        <div className="p-4 bg-background/50 flex justify-center">
                            <img
                                src="https://1000logos.net/wp-content/uploads/2021/04/Red-Bull-logo.png"
                                alt="Red Bull Giveaway"
                                className="w-auto h-40 object-contain"
                            />
                        </div>
                        <div className="p-8 pt-6 text-center">
                            <h2 className="text-3xl font-extrabold text-accent mb-3">Red Bull Giveaway!</h2>
                            <p className="text-text-muted mb-6">
                                Register for a chance to win a case of Red Bull to fuel your late-night study sessions!
                            </p>
                            
                            <ul className="text-left text-text-muted list-disc list-inside mb-6 space-y-2">
                                <li>Open to all Telfer 101ers and club fair attendees.</li>
                                <li>Giveaway closes September 18 at 4pm.</li>
                                <li>Winner announced at our Annual General Meeting.</li>
                            </ul>

                            <a
                                href="https://docs.google.com/forms/d/e/1FAIpQLSfxF2TwNZZOF-3eK9NOHUX4bzbR_nuN_dWYbBiEI-iVaXt7Yg/viewform?usp=header" // This will be the giveaway registration link
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-full inline-block bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-bold py-3 px-6 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg"
                            >
                                Enter Giveaway
                            </a>
                             <button
                                onClick={closePopupPermanently}
                                className="w-full mt-3 py-3 px-6 rounded-full text-text-muted hover:text-foreground hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
                            >
                                Not Interested
                            </button>
                            <p className="text-xs text-text-muted/70 mt-6">
                                This giveaway is not associated with Red Bull and is completely independent of any other relations we have with the company.
                            </p>
                        </div>
                        <button
                            onClick={closePopup}
                            className="absolute top-4 right-4 p-2 rounded-full text-foreground bg-black/20 hover:bg-black/30 dark:bg-white/20 dark:hover:bg-white/30 transition-colors"
                            aria-label="Close popup"
                        >
                            <XIcon className="w-5 h-5" />
                        </button>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};