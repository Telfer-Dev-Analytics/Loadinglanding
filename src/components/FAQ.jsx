import React, { useState } from 'react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { ChevronDownIcon } from '../icons/ChevronDownIcon';

export const FAQ = () => {
    const [ref, isVisible] = useScrollAnimation();
    const [openIndexes, setOpenIndexes] = useState([]);
    const faqs = [
        { q: "Who can join Telfer BTA?", a: "Membership is open to all University of Ottawa students, regardless of faculty. We welcome anyone with a passion for business and technology!" },
        { q: "What are the benefits of joining?", a: "Members get exclusive access to networking events, workshops, case competitions, mentorship programs, and a community of like-minded peers." },
        { q: "Is there a membership fee?", a: "Yes, there is a small annual membership fee which helps us fund our events and provide valuable resources to our members." },
        { q: "How can I get involved in the executive team?", a: "Executive positions are typically open for application at the end of the winter semester. Keep an eye on our social media and newsletters for announcements!" },
        { q: "What is BTA and what is our mission?", a: "The Telfer Business Technology Association is a student-led organization that aims to bridge the gap between business and technology. Our mission is to provide post-secondary students with the opportunities to succeed in both the business and technology sectors by creating opportunities to learn new skills and further their knowledge."}
    ];

    const toggleFAQ = (index) => {
        setOpenIndexes(prev => 
            prev.includes(index) ? prev.filter(i => i !== index) : [...prev, index]
        );
    };

    return (
        <section id="faq" className="py-24 bg-background transition-colors duration-500">
            <div ref={ref} className={`max-w-7xl mx-auto px-6 transition-all duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-bold text-foreground">Frequently Asked Questions</h2>
                     <div className="w-24 h-1 bg-gradient-to-r from-purple-600 to-indigo-600 mx-auto mt-4 rounded-full" />
                </div>
                <div className="max-w-3xl mx-auto">
                    {faqs.map((faq, index) => (
                        <div key={index} className="border-b border-border">
                            <button onClick={() => toggleFAQ(index)} className="w-full flex justify-between items-center py-5 text-left">
                                <span className="text-lg font-medium text-foreground">{faq.q}</span>
                                <ChevronDownIcon className={`w-6 h-6 text-accent transition-transform duration-300 ${openIndexes.includes(index) ? 'rotate-180' : ''}`} />
                            </button>
                            <div
                                className={`grid transition-all duration-300 ease-in-out ${
                                    openIndexes.includes(index) ? 'grid-rows-[1fr] pb-4' : 'grid-rows-[0fr]'
                                }`}
                            >
                                <div className="overflow-hidden">
                                    <p className="p-4 bg-purple-500/10 dark:bg-purple-400/10 text-text-muted rounded-lg">
                                        {faq.a}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};