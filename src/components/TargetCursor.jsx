import { useEffect, useRef } from 'react';
import { useTheme } from '../context/ThemeContext';

export default function TargetCursor({
    spinDuration = 2,
    hideDefaultCursor = true,
    parallaxOn = true,
    size = 40,
    color = null,
    scopeSelector = '#projects' // Only show cursor in this section
}) {
    const { theme } = useTheme();
    const cursorRef = useRef(null);
    const cursorInnerRef = useRef(null);
    const mousePos = useRef({ x: window.innerWidth / 2, y: window.innerHeight / 2 });
    const cursorPos = useRef({ x: window.innerWidth / 2, y: window.innerHeight / 2 });
    const isOverTarget = useRef(false);
    const isInScope = useRef(false);
    const animationFrameId = useRef(null);

    const defaultColor = theme === 'dark' ? '#60a5fa' : '#3b82f6';
    const finalColor = color || defaultColor;

    useEffect(() => {
        const scopeElement = scopeSelector ? document.querySelector(scopeSelector) : document.body;
        
        if (!scopeElement) return;

        let hasMovedMouse = false;

        const handleMouseMove = (e) => {
            hasMovedMouse = true;
            mousePos.current = { x: e.clientX, y: e.clientY };

            // Check if mouse is within the scope element
            const rect = scopeElement.getBoundingClientRect();
            const inScope = e.clientX >= rect.left && 
                           e.clientX <= rect.right && 
                           e.clientY >= rect.top && 
                           e.clientY <= rect.bottom;
            
            isInScope.current = inScope;
            
            if (inScope) {
                // Check if hovering over a cursor-target element
                const element = document.elementFromPoint(e.clientX, e.clientY);
                if (element) {
                    // Check if element itself or any parent has cursor-target class
                    const isTarget = element.classList.contains('cursor-target') || 
                                    element.closest('.cursor-target') !== null;
                    isOverTarget.current = isTarget;
                }
            } else {
                isOverTarget.current = false;
            }
        };

        const handleScopeEnter = (e) => {
            isInScope.current = true;
            if (hideDefaultCursor) {
                document.body.style.cursor = 'none';
                const targets = scopeElement.querySelectorAll('.cursor-target');
                targets.forEach(target => {
                    target.style.cursor = 'none';
                });
            }
        };

        const handleScopeLeave = () => {
            isInScope.current = false;
            isOverTarget.current = false;
            if (hideDefaultCursor) {
                document.body.style.cursor = 'auto';
            }
        };

        document.addEventListener('mousemove', handleMouseMove);
        scopeElement.addEventListener('mouseenter', handleScopeEnter);
        scopeElement.addEventListener('mouseleave', handleScopeLeave);

        const animate = () => {
            if (isInScope.current && hasMovedMouse) {
                const dx = mousePos.current.x - cursorPos.current.x;
                const dy = mousePos.current.y - cursorPos.current.y;

                const ease = parallaxOn ? 0.15 : 1;
                cursorPos.current.x += dx * ease;
                cursorPos.current.y += dy * ease;

                if (cursorRef.current) {
                    const scale = isOverTarget.current ? 2 : 1;
                    const opacity = isOverTarget.current ? 0.7 : 1;

                    cursorRef.current.style.transform = `translate(${cursorPos.current.x - size / 2}px, ${cursorPos.current.y - size / 2}px) scale(${scale})`;
                    cursorRef.current.style.opacity = opacity;
                    cursorRef.current.style.visibility = 'visible';
                }

                if (cursorInnerRef.current) {
                    cursorInnerRef.current.style.transform = `translate(${mousePos.current.x - 2}px, ${mousePos.current.y - 2}px)`;
                    cursorInnerRef.current.style.visibility = 'visible';
                }
            } else {
                if (cursorRef.current) {
                    cursorRef.current.style.visibility = 'hidden';
                }
                if (cursorInnerRef.current) {
                    cursorInnerRef.current.style.visibility = 'hidden';
                }
            }

            animationFrameId.current = requestAnimationFrame(animate);
        };

        animate();

        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
            scopeElement.removeEventListener('mouseenter', handleScopeEnter);
            scopeElement.removeEventListener('mouseleave', handleScopeLeave);
            
            if (animationFrameId.current) {
                cancelAnimationFrame(animationFrameId.current);
            }
            
            if (hideDefaultCursor) {
                document.body.style.cursor = 'auto';
                const targets = document.querySelectorAll('.cursor-target');
                targets.forEach(target => {
                    target.style.cursor = '';
                });
            }
        };
    }, [hideDefaultCursor, parallaxOn, size, theme, finalColor, scopeSelector]);

    return (
        <>
            {/* Outer rotating ring */}
            <div
                ref={cursorRef}
                className="fixed pointer-events-none z-[9999] transition-all duration-200"
                style={{
                    width: `${size}px`,
                    height: `${size}px`,
                    border: `2px solid ${finalColor}`,
                    borderRadius: '50%',
                    left: 0,
                    top: 0,
                    visibility: 'hidden',
                    animation: `spin ${spinDuration}s linear infinite`,
                    boxShadow: `0 0 20px ${finalColor}40, inset 0 0 10px ${finalColor}20`,
                    mixBlendMode: theme === 'dark' ? 'screen' : 'multiply'
                }}
            >
                {/* Center dot */}
                <div
                    style={{
                        position: 'absolute',
                        width: '6px',
                        height: '6px',
                        background: finalColor,
                        borderRadius: '50%',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        boxShadow: `0 0 8px ${finalColor}`
                    }}
                />
                {/* Top indicator */}
                <div
                    style={{
                        position: 'absolute',
                        width: '4px',
                        height: '4px',
                        background: finalColor,
                        borderRadius: '50%',
                        top: '-2px',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        opacity: 0.7
                    }}
                />
                {/* Bottom indicator */}
                <div
                    style={{
                        position: 'absolute',
                        width: '4px',
                        height: '4px',
                        background: finalColor,
                        borderRadius: '50%',
                        bottom: '-2px',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        opacity: 0.7
                    }}
                />
            </div>
            
            {/* Inner following dot */}
            <div
                ref={cursorInnerRef}
                className="fixed pointer-events-none z-[9999]"
                style={{
                    width: '4px',
                    height: '4px',
                    background: finalColor,
                    borderRadius: '50%',
                    left: 0,
                    top: 0,
                    visibility: 'hidden',
                    boxShadow: `0 0 10px ${finalColor}, 0 0 20px ${finalColor}80`
                }}
            />
            
            <style>{`
                @keyframes spin {
                    from { 
                        transform: rotate(0deg); 
                    }
                    to { 
                        transform: rotate(360deg); 
                    }
                }
            `}</style>
        </>
    );
}
