import React, { useRef, useEffect, useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';

export const ParticleCanvas = () => {
    const canvasRef = useRef(null);
    const { theme } = useContext(ThemeContext);

    useEffect(() => {
        const canvas = canvasRef.current;
        // Ensure canvas and its parent element exist before proceeding
        if (!canvas || !canvas.parentElement) return;

        const ctx = canvas.getContext('2d');
        let animationFrameId;

        // Set canvas dimensions based on its parent container's size
        canvas.width = canvas.parentElement.offsetWidth;
        canvas.height = canvas.parentElement.offsetHeight;

        // Initialize particles
        const particles = [];
        const particleCount = 70; // Number of particles

        for (let i = 0; i < particleCount; i++) {
            particles.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                radius: Math.random() * 1.5 + 1, // Particle size
                vx: Math.random() * 0.4 - 0.2,   // Horizontal velocity
                vy: Math.random() * 0.4 - 0.2,   // Vertical velocity
            });
        }

        // Animation loop
        const draw = () => {
            if (!ctx) return;
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Set particle color based on the current theme
            ctx.fillStyle = theme === 'dark' ? 'rgba(167, 139, 250, 0.4)' : 'rgba(139, 92, 246, 0.4)';

            // Update and draw each particle
            particles.forEach(p => {
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
                ctx.fill();

                p.x += p.vx;
                p.y += p.vy;

                // Bounce particles off the edges
                if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
                if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
            });

            animationFrameId = requestAnimationFrame(draw);
        };

        draw();

        // Resize handler to make the canvas responsive
        const handleResize = () => {
             if (!canvas.parentElement) return;
            canvas.width = canvas.parentElement.offsetWidth;
            canvas.height = canvas.parentElement.offsetHeight;
        };

        window.addEventListener('resize', handleResize);

        // Cleanup function to cancel animation and remove event listener
        return () => {
            cancelAnimationFrame(animationFrameId);
            window.removeEventListener('resize', handleResize);
        };
    }, [theme]); // Rerun the effect if the theme changes

    return <canvas ref={canvasRef} className="absolute top-0 left-0 w-full h-full z-0" />;
};
