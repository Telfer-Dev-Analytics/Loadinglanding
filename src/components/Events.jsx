import React, { useState, useEffect, useRef } from 'react';

// This custom hook is referenced but its code was not provided.
// It should be in a file like '/hooks/useScrollAnimation.js'
// Example of what it might look like:
// export const useScrollAnimation = () => {
//     const [isVisible, setIsVisible] = useState(false);
//     const ref = useRef(null);
//     useEffect(() => {
//         const observer = new IntersectionObserver(([entry]) => {
//             if (entry.isIntersecting) {
//                 setIsVisible(true);
//                 observer.unobserve(entry.target);
//             }
//         }, { threshold: 0.1 });
//         if (ref.current) {
//             observer.observe(ref.current);
//         }
//         return () => {
//             if (ref.current) {
//                 observer.unobserve(ref.current);
//             }
//         };
//     }, []);
//     return [ref, isVisible];
// };

// Helper component for individual event cards
const EventCard = ({ event, isVisible, index }) => {
    const [timeLeft, setTimeLeft] = useState('');
    const [isPast, setIsPast] = useState(false);
    const [showCountdown, setShowCountdown] = useState(false);
    const cardRef = useRef(null);

    // 3D Tilt Effect Logic
    const handleMouseMove = (e) => {
        const { clientX, clientY, currentTarget } = e;
        const { left, top, width, height } = currentTarget.getBoundingClientRect();
        const x = (clientX - left - width / 2) / 55;
        const y = (clientY - top - height / 2) / 55;

        currentTarget.style.transition = 'transform 0.1s linear';
        currentTarget.style.transform = `perspective(1000px) rotateY(${x}deg) rotateX(${-y}deg) scale3d(1.05, 1.05, 1.05)`;
    };

    const handleMouseLeave = (e) => {
        e.currentTarget.style.transition = 'transform 0.5s cubic-bezier(0.23, 1, 0.32, 1)';
        e.currentTarget.style.transform = 'perspective(1000px) rotateY(0) rotateX(0) scale3d(1, 1, 1)';
    };

    useEffect(() => {
        const eventDate = new Date(event.date);
        const now = new Date();

        if (eventDate < now) {
            setIsPast(true);
            return;
        }

        const timer = setInterval(() => {
            const now = new Date();
            const difference = eventDate - now;

            if (difference <= 0) {
                setIsPast(true);
                setTimeLeft('');
                clearInterval(timer);
                return;
            }
            
            const days = Math.floor(difference / (1000 * 60 * 60 * 24));
            const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
            const minutes = Math.floor((difference / 1000 / 60) % 60);
            const seconds = Math.floor((difference / 1000) % 60);

            if (days <= 3) {
                setShowCountdown(true);
                setTimeLeft(`${days}d ${hours}h ${minutes}m ${seconds}s`);
            }

        }, 1000);

        return () => clearInterval(timer);
    }, [event.date]);

    const formattedDate = new Date(event.date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });

   return (
        <div 
            ref={cardRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{ 
                transition: `opacity 0.5s, transform 0.5s`,
                transitionDelay: `${index * 150}ms` 
            }} 
            // MODIFIED LINE: Added w-full and max-w-sm to control card size
            className={`group relative w-full max-w-sm rounded-2xl overflow-hidden border border-white/10 bg-background/50 backdrop-blur-lg shadow-lg ${isVisible ? 'opacity-100' : 'opacity-0 translate-y-10'}`}
        >
            <div className="relative z-10 flex flex-col h-full">
                <img src={event.image} alt={event.title} className="w-full h-48 object-cover"/>
                <div className="p-6 flex-grow flex flex-col">
                    <h3 className="text-xl font-bold mt-2 mb-2 text-foreground">{event.title}</h3>
                    <p className="text-text-muted flex-grow">{event.description}</p>
                    <div className="mt-4 pt-4 border-t border-border">
                         {showCountdown && !isPast ? (
                            <p className="text-sm font-semibold text-accent countdown-text">{timeLeft} left</p>
                        ) : (
                            <p className="text-sm text-text-muted">{formattedDate}</p>
                        )}
                    </div>
                </div>
                <div className="p-6 pt-0">
                    {isPast ? (
                        <div className="w-full py-2 px-4 rounded-full font-bold text-center bg-gray-400 text-gray-600 cursor-not-allowed">
                            Event Ended
                        </div>
                    ) : (
                        <a
                            href={event.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="join-button w-full block py-2 px-4 rounded-full font-bold text-center transition-all duration-300"
                        >
                            Sign Up
                        </a>
                    )}
                </div>
            </div>
             <div className="absolute inset-0 bg-gradient-to-br from-purple-600 to-indigo-600 opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
        </div>
    );
};

export const Events = () => {
    // For demonstration without the hook, let's assume it's always visible
    const ref = useRef(null);
    const isVisible = true;
    
    const events = [
        { 
            title: "Meet Your Future", 
            date: "2025-10-15T10:00:00", 
            description: "Meet Your Future Networking is an annual gathering hosted by BTA, connecting students with company representatives to explore potential internships and career opportunities. This year, we are introducing the popular resume clinic. Following the networking session, company representatives will review the resumes of students they’ve met and provide personalized feedback and career advice.", 
            image: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=2832&auto=format&fit=crop",
            link: "https://forms.gle/mjA8MGkZcGoRujAM6"
        },
         
    ];

    // Sort events by date to ensure the nearest one is first
    const sortedEvents = events.sort((a, b) => new Date(a.date) - new Date(b.date));

    return (
        <section id="events" className="py-24 bg-transparent relative"> 
            <div ref={ref} className={`max-w-7xl mx-auto px-6 transition-all duration-1000 relative ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-bold text-foreground">Upcoming Events</h2>
                    <div className="w-24 h-1 bg-gradient-to-r from-purple-600 to-indigo-600 mx-auto mt-4 rounded-full" />
                </div>
                
                {/* MODIFIED LINE: This container now always centers its content */}
                <div className="flex flex-wrap justify-center gap-8">
                    {sortedEvents.map((event, index) => (
                        <EventCard key={index} event={event} isVisible={isVisible} index={index} />
                    ))}
                </div>
            </div>
        </section>
    );
};