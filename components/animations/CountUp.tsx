'use client';

import { useEffect, useRef, useState } from 'react';
import { useInView } from 'react-intersection-observer';

interface CountUpProps {
    end: number;
    prefix?: string;
    suffix?: string;
    duration?: number;
    className?: string;
}

export default function CountUp({
    end,
    prefix = '',
    suffix = '',
    duration = 2,
    className,
}: CountUpProps) {
    const [count, setCount] = useState(0);
    const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.3 });
    const hasStarted = useRef(false);

    useEffect(() => {
        if (!inView || hasStarted.current) return;
        hasStarted.current = true;

        const startTime = performance.now();
        const durationMs = duration * 1000;

        const animate = (currentTime: number) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / durationMs, 1);

            // Ease out cubic
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.round(eased * end));

            if (progress < 1) {
                requestAnimationFrame(animate);
            }
        };

        requestAnimationFrame(animate);
    }, [inView, end, duration]);

    return (
        <span ref={ref} className={className}>
            {prefix}
            {count.toLocaleString('tr-TR')}
            {suffix}
        </span>
    );
}
