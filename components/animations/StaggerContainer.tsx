'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ReactNode } from 'react';

interface StaggerContainerProps {
    children: ReactNode;
    staggerDelay?: number;
    className?: string;
}

const containerVariants = {
    hidden: { opacity: 0 },
    visible: (stagger: number) => ({
        opacity: 1,
        transition: {
            staggerChildren: stagger,
            delayChildren: 0.1,
        },
    }),
};

export const staggerItemVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.5,
            ease: [0.16, 1, 0.3, 1],
        },
    },
};

export default function StaggerContainer({
    children,
    staggerDelay = 0.1,
    className,
}: StaggerContainerProps) {
    const { ref, inView } = useInView({
        triggerOnce: true,
        threshold: 0.1,
    });

    return (
        <motion.div
            ref={ref}
            variants={containerVariants}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            custom={staggerDelay}
            className={className}
        >
            {children}
        </motion.div>
    );
}
