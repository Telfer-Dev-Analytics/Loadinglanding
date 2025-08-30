import React, { useState, useEffect } from 'react';

export const ReadingProgressBar = () => {
    const [width, setWidth] = useState(0);

    const scrollHeight = () => {
        const el = document.documentElement;
        const scrollTop = el.scrollTop || document.body.scrollTop;
        const scrollBottom = (el.scrollHeight || document.body.scrollHeight) - el.clientHeight;
        setWidth((scrollTop / scrollBottom) * 100);
    };

    useEffect(() => {
        window.addEventListener("scroll", scrollHeight);
        return () => window.removeEventListener("scroll", scrollHeight);
    }, []);

    return (
        <div className="fixed top-0 left-0 z-50 w-full h-1 bg-gray-200 dark:bg-gray-700">
            <div className="h-1 bg-gradient-to-r from-purple-500 to-indigo-600" style={{ width: `${width}%` }} />
        </div>
    );
};