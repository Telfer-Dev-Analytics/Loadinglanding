import React from 'react';
import { SocialIcons } from '../icons/SocialIcons';

export const Footer = () => (
    // Changed bg-gray-900 to bg-muted for theme consistency
    <footer className="bg-muted text-gray-200 py-12 transition-colors duration-500">
        <div className="max-w-7xl mx-auto px-6 text-center">
            <h3 className="text-xl font-bold mb-4">Connect With Us</h3>
            <SocialIcons />
            <p className="mt-8 text-gray-400">© {new Date().getFullYear()} Telfer Business Technology Association. All Rights Reserved.</p>
            <p className="text-sm text-gray-500 mt-2">Designed by the TelferBTA Development Team</p>
        </div>
    </footer>
);