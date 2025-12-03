import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

export default function SplitText({
    text,
    className = '',
    delay = 0,
    duration = 0.6,
    ease = 'power3.out',
    splitType = 'chars',
    from = { opacity: 0, y: 40 },
    to = { opacity: 1, y: 0 },
    threshold = 0.1,
    rootMargin = '-100px',
    textAlign = 'center',
    onLetterAnimationComplete = null,
    stagger = 0.03
}) {
    const containerRef = useRef(null);
    const hasAnimated = useRef(false);

    useEffect(() => {
        if (!containerRef.current || hasAnimated.current) return;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting && !hasAnimated.current) {
                        hasAnimated.current = true;
                        animateText();
                    }
                });
            },
            { threshold, rootMargin }
        );

        observer.observe(containerRef.current);

        return () => observer.disconnect();
    }, []);

    const animateText = () => {
        const chars = containerRef.current.querySelectorAll('.split-char');
        
        gsap.fromTo(
            chars,
            from,
            {
                ...to,
                duration,
                ease,
                stagger,
                delay: delay / 1000,
                onComplete: () => {
                    if (onLetterAnimationComplete) {
                        onLetterAnimationComplete();
                    }
                }
            }
        );
    };

    const renderSplitText = () => {
        return text.split('').map((char, index) => (
            <span
                key={index}
                className="split-char inline-block"
                style={{ whiteSpace: char === ' ' ? 'pre' : 'normal' }}
            >
                {char === ' ' ? '\u00A0' : char}
            </span>
        ));
    };

    return (
        <div
            ref={containerRef}
            className={className}
            style={{ textAlign }}
        >
            {renderSplitText()}
        </div>
    );
}
