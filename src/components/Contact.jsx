import React from 'react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

export const Contact = () => {
    const [ref, isVisible] = useScrollAnimation();
    return (
        <section id="contact" className="py-24 bg-muted transition-colors duration-500">
            <div ref={ref} className={`max-w-7xl mx-auto px-6 transition-all duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-bold text-foreground">Get In Touch</h2>
                     <div className="w-24 h-1 bg-gradient-to-r from-purple-600 to-indigo-600 mx-auto mt-4 rounded-full" />
                </div>
                <div className="flex flex-col md:flex-row gap-12 items-stretch">
                    <div className="md:w-1/2 bg-background/50 backdrop-blur-md border border-black/10 dark:border-white/10 p-8 rounded-lg shadow-lg">
                         <form>
                            <div className="mb-5">
                                <label htmlFor="name" className="block text-foreground font-medium mb-2">Name</label>
                                <input type="text" id="name" className="w-full px-4 py-2 border border-border rounded-lg bg-background/50 text-foreground focus:outline-none focus:ring-2 focus:ring-accent focus:ring-opacity-50 transition-shadow" placeholder="Your Name" />
                            </div>
                            <div className="mb-5">
                                <label htmlFor="email" className="block text-foreground font-medium mb-2">Email</label>
                                <input type="email" id="email" className="w-full px-4 py-2 border border-border rounded-lg bg-background/50 text-foreground focus:outline-none focus:ring-2 focus:ring-accent focus:ring-opacity-50 transition-shadow" placeholder="your.email@example.com" />
                            </div>
                            <div className="mb-6">
                                <label htmlFor="message" className="block text-foreground font-medium mb-2">Message</label>
                                <textarea id="message" rows="5" className="w-full px-4 py-2 border border-border rounded-lg bg-background/50 text-foreground focus:outline-none focus:ring-2 focus:ring-accent focus:ring-opacity-50 transition-shadow" placeholder="Your message..."></textarea>
                            </div>
                            <button type="submit" className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-bold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg">
                                Send Message
                            </button>
                        </form>
                    </div>
                    <div className="md:w-1/2 h-96 md:h-auto rounded-lg overflow-hidden shadow-lg">
                         <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2800.941324108833!2d-75.685913584444!3d45.42302997910041!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4cce054a62100001%3A0x261b504bee5328d1!2sTelfer%20School%20of%20Management!5e0!3m2!1sen!2sca!4v1622049077977!5m2!1sen!2sca"
                            width="100%"
                            height="100%"
                            style={{ border: 0 }}
                            allowFullScreen=""
                            loading="lazy"
                            className="dark:filter dark:invert(1) dark:grayscale(0.8)"
                            referrerPolicy="no-referrer-when-downgrade">
                        </iframe>
                    </div>
                </div>
            </div>
        </section>
    );
};