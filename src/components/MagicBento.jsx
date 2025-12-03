import { useRef, useEffect, useCallback } from 'react';
import { gsap } from 'gsap';
import './MagicBento.css';

const DEFAULT_PARTICLE_COUNT = 12;
const DEFAULT_SPOTLIGHT_RADIUS = 300;
const DEFAULT_GLOW_COLOR = '132, 0, 255';

const createParticleElement = (x, y, color = DEFAULT_GLOW_COLOR) => {
  const el = document.createElement('div');
  el.className = 'particle';
  el.style.cssText = `
    position: absolute;
    width: 4px;
    height: 4px;
    border-radius: 50%;
    background: rgba(${color}, 1);
    box-shadow: 0 0 6px rgba(${color}, 0.6);
    pointer-events: none;
    z-index: 100;
    left: ${x}px;
    top: ${y}px;
  `;
  return el;
};

const calculateSpotlightValues = radius => ({
  proximity: radius * 0.5,
  fadeDistance: radius * 0.75
});

const updateCardGlowProperties = (card, mouseX, mouseY, glow, radius) => {
  const rect = card.getBoundingClientRect();
  const relativeX = ((mouseX - rect.left) / rect.width) * 100;
  const relativeY = ((mouseY - rect.top) / rect.height) * 100;

  card.style.setProperty('--glow-x', `${relativeX}%`);
  card.style.setProperty('--glow-y', `${relativeY}%`);
  card.style.setProperty('--glow-intensity', glow.toString());
  card.style.setProperty('--glow-radius', `${radius}px`);
};

const ParticleCard = ({
  children,
  className = '',
  style,
  particleCount = DEFAULT_PARTICLE_COUNT,
  glowColor = DEFAULT_GLOW_COLOR,
  enableTilt = true,
  clickEffect = false,
  enableMagnetism = false,
  onClick
}) => {
  const cardRef = useRef(null);
  const particlesRef = useRef([]);
  const timeoutsRef = useRef([]);
  const isHoveredRef = useRef(false);
  const memoizedParticles = useRef([]);
  const particlesInitialized = useRef(false);
  const magnetismAnimationRef = useRef(null);

  const createParticles = useCallback((count, x, y) => {
    if (!cardRef.current) return;

    const glowRadius = Math.min(cardRef.current.clientWidth, cardRef.current.clientHeight) * 0.4;
    const { proximity, fadeDistance } = calculateSpotlightValues(glowRadius);

    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const radius = Math.random() * glowRadius;
      const particleX = x + Math.cos(angle) * radius;
      const particleY = y + Math.sin(angle) * radius;

      const particle = createParticleElement(particleX, particleY, glowColor);
      cardRef.current.appendChild(particle);
      particlesRef.current.push(particle);

      gsap.fromTo(particle,
        { opacity: 1, scale: 1, x: 0, y: 0 },
        {
          opacity: 0,
          scale: 0.5,
          x: `+=${Math.random() * 100 - 50}`,
          y: `+=${Math.random() * 100 - 50}`,
          duration: 1.5 + Math.random() * 1.5,
          ease: 'power2.out',
          onComplete: () => {
            particle.remove();
            particlesRef.current = particlesRef.current.filter(p => p !== particle);
          }
        }
      );
    }
  }, [glowColor]);

  const handleMouseEnter = useCallback((e) => {
    isHoveredRef.current = true;
    const { clientX, clientY } = e;
    createParticles(particleCount, clientX, clientY);
  }, [createParticles, particleCount]);

  const handleMouseMove = useCallback((e) => {
    if (!isHoveredRef.current) return;
    const { clientX, clientY } = e;
    updateCardGlowProperties(cardRef.current, clientX, clientY, 1, DEFAULT_SPOTLIGHT_RADIUS);
  }, []);

  const handleMouseLeave = useCallback(() => {
    isHoveredRef.current = false;
    particlesRef.current.forEach(particle => {
      gsap.to(particle, {
        opacity: 0,
        scale: 0.5,
        duration: 0.5,
        onComplete: () => particle.remove()
      });
    });
    particlesRef.current = [];
  }, []);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    const handleClickEffect = (e) => {
      if (!clickEffect) return;
      const { clientX, clientY } = e;
      createParticles(particleCount, clientX, clientY);
    };

    card.addEventListener('mouseenter', handleMouseEnter);
    card.addEventListener('mousemove', handleMouseMove);
    card.addEventListener('mouseleave', handleMouseLeave);
    card.addEventListener('click', handleClickEffect);

    return () => {
      card.removeEventListener('mouseenter', handleMouseEnter);
      card.removeEventListener('mousemove', handleMouseMove);
      card.removeEventListener('mouseleave', handleMouseLeave);
      card.removeEventListener('click', handleClickEffect);
    };
  }, [handleMouseEnter, handleMouseMove, handleMouseLeave, clickEffect]);

  return (
    <div
      ref={cardRef}
      className={`${className} particle-container`}
      style={{ ...style, position: 'relative', overflow: 'hidden', cursor: 'pointer' }}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

const GlobalSpotlight = ({
  gridRef,
  enabled = true,
  spotlightRadius = DEFAULT_SPOTLIGHT_RADIUS,
  glowColor = DEFAULT_GLOW_COLOR
}) => {
  const spotlightRef = useRef(null);

  useEffect(() => {
    if (!enabled || !gridRef.current) return;

    const grid = gridRef.current;
    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      gsap.to(spotlightRef.current, {
        x: clientX,
        y: clientY,
        duration: 0.4,
        ease: 'power2.out'
      });
    };

    grid.addEventListener('mousemove', handleMouseMove);

    return () => {
      grid.removeEventListener('mousemove', handleMouseMove);
    };
  }, [enabled, gridRef]);

  return (
    <div
      ref={spotlightRef}
      className="global-spotlight"
      style={{
        position: 'fixed',
        pointerEvents: 'none',
        borderRadius: '50%',
        mixBlendMode: 'difference',
        zIndex: 50,
        width: `${spotlightRadius * 2}px`,
        height: `${spotlightRadius * 2}px`,
        background: `radial-gradient(circle, rgba(${glowColor}, 0.3) 0%, rgba(${glowColor}, 0) 70%)`
      }}
    />
  );
};

const BentoCardGrid = ({ children, gridRef }) => (
  <div className="card-grid bento-section" ref={gridRef}>
    {children}
  </div>
);

const MagicBento = ({
  projects = [],
  onProjectClick,
  textAutoHide = true,
  enableStars = true,
  enableSpotlight = true,
  enableBorderGlow = true,
  spotlightRadius = DEFAULT_SPOTLIGHT_RADIUS,
  particleCount = DEFAULT_PARTICLE_COUNT,
  enableTilt = false,
  glowColor = DEFAULT_GLOW_COLOR,
  clickEffect = true,
  enableMagnetism = true
}) => {
  const gridRef = useRef(null);

  return (
    <>
      {enableSpotlight && (
        <GlobalSpotlight
          gridRef={gridRef}
          enabled={enableSpotlight}
          spotlightRadius={spotlightRadius}
          glowColor={glowColor}
        />
      )}

      <BentoCardGrid gridRef={gridRef}>
        {projects.map((project, index) => {
          const baseClassName = `magic-bento-card ${textAutoHide ? 'magic-bento-card--text-autohide' : ''} ${enableBorderGlow ? 'magic-bento-card--border-glow' : ''}`;
          
          // Get grid layout from project or use default
          const gridLayout = project.gridLayout || { colSpan: 1, rowSpan: 1 };
          const gridClassName = `col-span-${gridLayout.colSpan} row-span-${gridLayout.rowSpan}`;
          
          const cardProps = {
            className: `${baseClassName} ${gridClassName}`,
            style: {
              backgroundColor: project.cardColor || '#060010',
              '--glow-color': glowColor,
              backgroundImage: project.image ? `url(${project.image})` : 'none',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              gridColumn: `span ${gridLayout.colSpan}`,
              gridRow: `span ${gridLayout.rowSpan}`
            },
            onClick: () => onProjectClick && onProjectClick(project)
          };

          if (enableStars) {
            return (
              <ParticleCard
                key={project.id}
                {...cardProps}
                particleCount={particleCount}
                glowColor={glowColor}
                enableTilt={enableTilt}
                clickEffect={clickEffect}
                enableMagnetism={enableMagnetism}
              >
                <div className="magic-bento-overlay" />
                <div className="magic-bento-card__header">
                  <div className="magic-bento-card__label">{project.category}</div>
                </div>
                <div className="magic-bento-card__content">
                  <h2 className="magic-bento-card__title">{project.title}</h2>
                  <p className="magic-bento-card__description">{project.summary}</p>
                </div>
              </ParticleCard>
            );
          }

          return (
            <div key={project.id} {...cardProps}>
              <div className="magic-bento-overlay" />
              <div className="magic-bento-card__header">
                <div className="magic-bento-card__label">{project.category}</div>
              </div>
              <div className="magic-bento-card__content">
                <h2 className="magic-bento-card__title">{project.title}</h2>
                <p className="magic-bento-card__description">{project.summary}</p>
              </div>
            </div>
          );
        })}
      </BentoCardGrid>
    </>
  );
};

export default MagicBento;