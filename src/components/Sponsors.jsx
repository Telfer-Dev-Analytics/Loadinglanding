import React, { useContext } from 'react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { ThemeContext } from '../context/ThemeContext';

const SponsorCard = ({ sponsor, isVisible, index, tierClass }) => {
    const { theme } = useContext(ThemeContext);

    const logoWrapperClass = (theme === 'dark' && sponsor.needsBackground)
        ? 'bg-white rounded-lg p-4'
        : 'p-4';

    const Wrapper = sponsor.link ? 'a' : 'div';

    const wrapperProps = sponsor.link
        ? {
              href: sponsor.link,
              target: '_blank',
              rel: 'noopener noreferrer',
          }
        : {};

    return (
        <Wrapper
            {...wrapperProps}
            style={{
                transition: `opacity 0.5s, transform 0.5s`,
                transitionDelay: `${index * 100}ms`
            }}
            className={`group relative rounded-2xl overflow-hidden border border-white/10 bg-background/50 backdrop-blur-lg shadow-lg flex items-center justify-center ${tierClass} ${isVisible ? 'opacity-100' : 'opacity-0 translate-y-10'} transition-transform duration-300 ${sponsor.link ? 'hover:-translate-y-2' : 'cursor-default'}`}
        >
            <div className={`${logoWrapperClass} w-full h-full flex items-center justify-center`}>
                <img src={sponsor.logo} alt={`${sponsor.name} logo`} className="max-h-full max-w-full w-auto h-auto object-contain transition-transform duration-300 group-hover:scale-105" />
            </div>
            <div className="absolute inset-0 bg-gradient-to-br from-purple-600 to-indigo-600 opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
        </Wrapper>
    );
};


export const Sponsors = () => {
    const [ref, isVisible] = useScrollAnimation(0.2);
    const sponsors = [
        // Use Vite's BASE_URL to create correct paths
        { name: "CGI", logo: `${import.meta.env.BASE_URL}images/logos/CGI_Logo.png`, needsBackground: false, tier: 'extra-large', link: 'https://www.cgi.com/' },
        { name: "EY", logo: `${import.meta.env.BASE_URL}images/logos/EY_Logo.png`, needsBackground: true, tier: 'small', link: 'https://www.ey.com/' },
    ];

    const groupedSponsors = sponsors.reduce((acc, sponsor) => {
        const { tier } = sponsor;
        if (!acc[tier]) {
            acc[tier] = [];
        }
        acc[tier].push(sponsor);
        return acc;
    }, {});

    const tierOrder = ['extra-large', 'large', 'medium', 'small'];

    const tierTitles = {
        'extra-large': 'Visionary',
        'large': 'Pioneer',
        'medium': 'Innovator',
        'small': 'Explorer'
    };

    const getTierClass = (tier) => {
        switch (tier) {
            case 'extra-large':
                return 'w-full md:w-2/3 h-80';
            case 'large':
                return 'w-full sm:w-5/12 h-64';
            case 'medium':
                return 'w-full sm:w-1/2 md:w-1/3 lg:w-1/4 h-48';
            case 'small':
                return 'w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/5 h-32';
            default:
                return 'w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/5 h-32';
        }
    };

    return (
        <section id="sponsors" className="py-24 bg-muted relative overflow-hidden transition-colors duration-500">
            <div className="absolute -top-1/4 -right-1/4 w-1/2 h-1/2 bg-accent/10 rounded-full blur-3xl" />
            <div className="absolute -bottom-1/4 -left-1/4 w-1/2 h-1/2 bg-indigo-500/10 rounded-full blur-3xl" />

            <div ref={ref} className={`max-w-7xl mx-auto px-6 transition-all duration-1000 relative z-10 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-bold text-foreground">Our Sponsors</h2>
                    <div className="w-24 h-1 bg-gradient-to-r from-purple-600 to-indigo-600 mx-auto mt-4 rounded-full" />
                </div>

                <div className="space-y-16">
                    {tierOrder.map(tier => (
                        groupedSponsors[tier] && (
                            <div key={tier}>
                                <h3 className="text-3xl font-bold text-foreground mb-8 text-center">{tierTitles[tier]}</h3>
                                <div className="flex justify-center items-center flex-wrap gap-8">
                                    {groupedSponsors[tier].map((sponsor, index) => (
                                        <SponsorCard
                                            key={index}
                                            sponsor={sponsor}
                                            isVisible={isVisible}
                                            index={index}
                                            tierClass={getTierClass(sponsor.tier)}
                                        />
                                    ))}
                                </div>
                            </div>
                        )
                    ))}
                </div>
            </div>
        </section>
    );
};
