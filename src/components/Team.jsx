import React from 'react';
// Make sure these imports are correct for your project structure
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { LinkedInIcon } from '../icons/LinkedInIcon';

export const Team = () => {
    const [ref, isVisible] = useScrollAnimation();

    // Corrected image paths to be relative from the public directory
    const teamMembers = [
        { name: "Aahana Bagga", role: "Co-President", image: `${import.meta.env.BASE_URL}images/headshots/Aahana.jpg`, linkedin: "https://www.linkedin.com/in/aahana-bagga/" },
        { name: "Alexandra Ganguli", role: "Co-President", image: `${import.meta.env.BASE_URL}images/headshots/Alexandra.jpg`, linkedin: "https://www.linkedin.com/in/alexandraganguli/" },
        { name: "Ayan Arwo", role: "Vice President of Events", image: `${import.meta.env.BASE_URL}images/headshots/Ayan.jpg`, linkedin: "https://www.linkedin.com/in/ayan-arwo/" },
        { name: "Mira Zakhour", role: "Director of Events", image: `${import.meta.env.BASE_URL}images/headshots/Mira.png`, linkedin: "https://www.linkedin.com/in/mirazakhour/" },
        { name: "Arya Reza", role: "Director of Events", image: `${import.meta.env.BASE_URL}images/headshots/Arya.jpg`, linkedin: "https://www.linkedin.com/in/arya-reza-1723b0345/" },
        { name: "Dea Colic", role: "Director of Events", image: `${import.meta.env.BASE_URL}images/headshots/Dea.jpg`, linkedin: "https://www.linkedin.com/in/dea-colic/" },
        { name: "Benjamin Whiting", role: "Vice President of Finance", image: `${import.meta.env.BASE_URL}images/headshots/Ben.jpg`, linkedin: "https://www.linkedin.com/in/benjamin-whiting-/" },
        { name: "Fatima Jan", role: "Director of Finance", image: `${import.meta.env.BASE_URL}images/headshots/Fatima.jpg`, linkedin: "https://www.linkedin.com/in/fatima-jan29/" },
        { name: "Luka Bernabo", role: "Vice President of Corporate Affairs", image: `${import.meta.env.BASE_URL}images/headshots/Luka.jpg`, linkedin: "https://www.linkedin.com/in/luka-bernabo-135bb5251/" },
        { name: "Destin Mwaitelele", role: "Director of Corporate Affairs", image: `${import.meta.env.BASE_URL}images/headshots/Destin.jpeg`, linkedin: "https://www.linkedin.com/in/destin-mwaiteleke/" },
        { name: "Maryann Issac", role: "Director of Corporate Affairs", image: `${import.meta.env.BASE_URL}images/headshots/Maryann.jpg`, linkedin: "https://www.linkedin.com/in/maryann-issac-77b5121b6/" },
        { name: "Reema Alwadi", role: "Co-Vice President of Development", image: `${import.meta.env.BASE_URL}images/headshots/Reema.jpg`, linkedin: "https://www.linkedin.com/in/reema-alwadi/" },
        { name: "Elias Fatine", role: "Co-Vice President of Development", image: `${import.meta.env.BASE_URL}images/headshots/Elias.jpg`, linkedin: "https://www.linkedin.com/in/eliasfatine/" },
        { name: "Bohdan Zaglyadin", role: "Vice President of Marketing", image: `${import.meta.env.BASE_URL}images/headshots/Bohdan.jpg`, linkedin: "https://www.linkedin.com/in/bohdan-zaglyadin-608a2921a/" },
        { name: "Wanees Fatine", role: "Director of Content Creation", image: `${import.meta.env.BASE_URL}images/headshots/Wanees.jpg`, linkedin: "https://www.linkedin.com/in/wanees-fatine-6b482b342/" },
        { name: "Lara Helal", role: "Director of Graphic Design", image: `${import.meta.env.BASE_URL}images/headshots/Lara.jpg`, linkedin: "https://www.linkedin.com/in/lara-helal-5b275133b/" },
        { name: "Zaina Rahman", role: "Vice President of Internal Affairs", image: `${import.meta.env.BASE_URL}images/headshots/Zaina.jpeg`, linkedin: "https://www.linkedin.com/in/zainarahman/" },
    ];

    const duplicatedTeamMembers = [...teamMembers, ...teamMembers];

    // --- Dynamic Animation Calculations ---
    const CARD_WIDTH_PX = 256; // Corresponds to w-64
    const GAP_PX = 32;         // Corresponds to space-x-8
    const SCROLL_SPEED_PX_PER_SEC = 40;

    const totalScrollWidth = teamMembers.length * (CARD_WIDTH_PX + GAP_PX);
    const animationDuration = totalScrollWidth / SCROLL_SPEED_PX_PER_SEC;

    const animationStyle = {
        '--scroll-width': `-${totalScrollWidth}px`,
        '--animation-duration': `${animationDuration}s`,
    };

    return (
        <section id="team" className="py-24 bg-background transition-colors duration-500 relative overflow-hidden">
            <div className="absolute -top-1/4 -right-1/4 w-1/2 h-1/2 bg-purple-500/10 rounded-full blur-3xl" />
            <div className="absolute -bottom-1/4 -left-1/4 w-1/2 h-1/2 bg-indigo-500/10 rounded-full blur-3xl" />
            <div ref={ref} className={`transition-all duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
                <div className="text-center mb-16 max-w-7xl mx-auto px-6">
                    <h2 className="text-4xl font-bold text-foreground">Meet the Team</h2>
                    <div className="w-24 h-1 bg-gradient-to-r from-purple-600 to-indigo-600 mx-auto mt-4 rounded-full" />
                </div>

                <div className="w-full overflow-hidden group" style={{ maskImage: "linear-gradient(to right, transparent, black 10%, black 90%, transparent)" }}>
                    <div
                        className="flex space-x-8 animate-scroll pause-on-hover"
                        style={animationStyle}
                    >
                        {duplicatedTeamMembers.map((member, index) => (
                            <div key={index} className="flex-shrink-0 w-64 text-center">
                                <div className="relative">
                                    <img 
                                        src={member.image} 
                                        alt={member.name} 
                                        className="w-48 h-48 mx-auto rounded-full object-cover border-4 border-border shadow-lg" 
                                        onError={(e) => { e.target.onerror = null; e.target.src='https://placehold.co/192x192/6366f1/ffffff?text=Image' }}
                                    />
                                    <div className="mt-4">
                                        <h3 className="text-xl font-bold text-foreground">{member.name}</h3>
                                        <p className="text-accent">{member.role}</p>
                                        <a
                                            href={
                                                member.linkedin.startsWith('http') || member.linkedin === '#'
                                                ? member.linkedin
                                                : `https://${member.linkedin}`
                                            }
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="mt-2 inline-block text-text-muted hover:text-accent transition-colors"
                                            aria-label={`${member.name}'s LinkedIn Profile`}
                                        >
                                            <LinkedInIcon className="w-6 h-6" />
                                        </a>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Team;
