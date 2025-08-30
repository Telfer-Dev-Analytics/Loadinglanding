import React, { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';
import { SunIcon } from '../icons/SunIcon';
import { MoonIcon } from '../icons/MoonIcon';

export const ThemeToggle = () => {
    const { theme, setTheme } = useContext(ThemeContext);

    // Return null until the theme is loaded to prevent hydration errors or a flash of the wrong icon.
    if (!theme) {
        return null;
    }

    const handleToggle = () => {
        const newTheme = theme === 'dark' ? 'light' : 'dark';
        setTheme(newTheme);
    };

    return (
        <button
            onClick={handleToggle}
            className="p-2 rounded-full text-gray-700 hover:bg-black/5 dark:text-white/80 dark:hover:text-white/10 transition-colors"
            aria-label="Toggle theme"
        >
            {theme === 'dark' ? <SunIcon className="w-5 h-5" /> : <MoonIcon className="w-5 h-5" />}
        </button>
    );
};