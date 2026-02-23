'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ReactNode } from 'react';

interface ScrollRevealProps {
    children: ReactNode;
    delay?: number;
    direction?: 'up' | 'down' | 'left' | 'right';
    duration?: number;
    className?: string;
}

const directionMap = {
    up: { y: 40, x: 0 },
    down: { y: -40, x: 0 },
    left: { x: 40, y: 0 },
    right: { x: -40, y: 0 },
};

export default function ScrollReveal({
    children,
    delay = 0,
    direction = 'up',
    duration = 0.6,
    className,
}: ScrollRevealProps) {
    const { ref, inView } = useInView({
        triggerOnce: true,
        threshold: 0.1,
    });

    const offset = directionMap[direction];

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, ...offset }}
            animate={inView ? { opacity: 1, x: 0, y: 0 } : { opacity: 0, ...offset }}
            transition={{
                duration,
                delay: delay / 1000,
                ease: [0.16, 1, 0.3, 1],
            }}
            className={className}
        >
            {children}
        </motion.div>
    );
}
