import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export const Cursor = () => {
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [isHovering, setIsHovering] = useState(false);

    useEffect(() => {
        const mouseMove = (e) => {
            setPosition({ x: e.clientX, y: e.clientY });
        };

        const handleMouseOver = (e) => {
            if (e.target.closest('a, button')) {
                setIsHovering(true);
            }
        };

        const handleMouseOut = (e) => {
            if (e.target.closest('a, button')) {
                setIsHovering(false);
            }
        };

        window.addEventListener('mousemove', mouseMove);
        document.addEventListener('mouseover', handleMouseOver);
        document.addEventListener('mouseout', handleMouseOut);

        return () => {
            window.removeEventListener('mousemove', mouseMove);
            document.removeEventListener('mouseover', handleMouseOver);
            document.removeEventListener('mouseout', handleMouseOut);
        };
    }, []);

    const cursorVariants = {
        default: {
            width: 32,
            height: 32,
            backgroundColor: 'rgba(139, 92, 246, 0.5)',
            border: '2px solid rgba(139, 92, 246, 0.8)',
        },
        hover: {
            width: 48,
            height: 48,
            backgroundColor: 'rgba(167, 139, 250, 0.2)',
            border: '2px solid rgba(167, 139, 250, 1)',
        }
    }

    return (
        <motion.div
            className="fixed top-0 left-0 rounded-full pointer-events-none z-[9999]"
            animate={isHovering ? "hover" : "default"}
            variants={cursorVariants}
            style={{
              x: position.x - (isHovering ? 24 : 16),
              y: position.y - (isHovering ? 24 : 16),
            }}
            transition={{ type: "spring", stiffness: 500, damping: 30 }}
        />
    );
};