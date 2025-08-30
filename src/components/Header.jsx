import React, { useState, useEffect, useRef, useContext } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { ThemeContext } from '../context/ThemeContext';
import { ThemeToggle } from './ThemeToggle';
import { MenuIcon } from '../icons/MenuIcon';
import { XIcon } from '../icons/XIcon';

export const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isHidden, setIsHidden] = useState(false);
    const lastScrollY = useRef(0);
    const navigate = useNavigate();
    const location = useLocation();
    const { theme } = useContext(ThemeContext);

    // Use Vite's BASE_URL to create correct paths for both dev and production
    const btaNodeLogo = `${import.meta.env.BASE_URL}images/btanode.png`;
    const btaNodeLogoBlack = `${import.meta.env.BASE_URL}images/btanode-black.png`;

    const scrollLinks = ['Events', 'Sponsors', 'FAQ']; // Add 'Contact' once contact form is completed

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            if (currentScrollY > lastScrollY.current && currentScrollY > 200) {
                setIsHidden(true);
            } else {
                setIsHidden(false);
            }
            lastScrollY.current = currentScrollY;
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleNavClick = (id) => {
        setIsMenuOpen(false);
        const sectionId = id.toLowerCase();

        if (location.pathname === '/') {
            document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
        } else {
            navigate(`/#${sectionId}`);
        }
    };

    return (
        <header className={`fixed top-4 left-0 w-full z-50 transition-transform duration-500 ${isHidden ? '-translate-y-24' : 'translate-y-0'}`}>
            <div className="max-w-4xl mx-auto px-6">
                <div className="bg-background/80 dark:bg-background/60 backdrop-blur-xl rounded-full shadow-lg border-black/10 dark:border-white/10 flex justify-between items-center px-4 py-2 transition-colors duration-500">
                    <Link to="/" className="text-xl font-bold text-foreground pl-4">
                        <img src={theme === 'light' ? btaNodeLogoBlack : btaNodeLogo} alt="BTA Logo" className="h-8" />
                    </Link>
                    <nav className="hidden md:flex items-center space-x-2">
                        {scrollLinks.map(link => (
                            <button key={link} onClick={() => handleNavClick(link)} className="font-medium text-text-muted hover:text-foreground hover:bg-black/5 dark:hover:bg-white/10 px-4 py-2 rounded-full transition-all duration-200">
                                {link}
                            </button>
                        ))}
                        {/*<Link to="/blog" className="font-medium text-text-muted hover:text-foreground hover:bg-black/5 dark:hover:bg-white/10 px-4 py-2 rounded-full transition-all duration-200">
                            Blog
                        </Link>*/}
                    </nav>
                    <div className="flex items-center gap-2">
                       {/*<button className="join-button">
                           Join
                       </button>*/}
                       <ThemeToggle />
                       <div className="md:hidden">
                           <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="p-2 text-foreground rounded-full hover:bg-black/5 dark:hover:bg-white/10" aria-label="Toggle menu">
                               {isMenuOpen ? <XIcon className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
                           </button>
                       </div>
                    </div>
                </div>
                {isMenuOpen && (
                    <div className="md:hidden bg-background/90 backdrop-blur-lg rounded-2xl mt-2 overflow-hidden border border-black/10 dark:border-white/10 transition-colors duration-500">
                        {scrollLinks.map(link => (
                            <button key={link} onClick={() => handleNavClick(link)} className="block w-full text-left px-6 py-3 text-text-muted hover:text-foreground hover:bg-black/5 dark:hover:bg-white/10">
                                {link}
                            </button>
                        ))}
                        {/*} <Link to="/blog" className="block w-full text-left px-6 py-3 text-text-muted hover:text-foreground hover:bg-black/5 dark:hover:bg-white/10" onClick={() => setIsMenuOpen(false)}>
                            Blog
                        </Link>*/}
                    </div>
                )}
            </div>
        </header>
    );
};
