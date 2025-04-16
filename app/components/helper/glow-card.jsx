"use client";

import { useEffect, useRef } from 'react';

const GlowCard = ({ children, identifier }) => {
  const containerRef = useRef(null);
  const cardRef = useRef(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const CONTAINER = containerRef.current;
    const CARD = cardRef.current;

    if (!CONTAINER || !CARD) return;

    const CONFIG = {
      proximity: 40,
      spread: 80,
      blur: 12,
      gap: 32,
      vertical: false,
      opacity: 0,
    };

    const UPDATE = (event) => {
      // Safeguard against null/undefined event
      if (!event) return;

      const CARD_BOUNDS = CARD.getBoundingClientRect();
      const isActive = (
        event.x > CARD_BOUNDS.left - CONFIG.proximity &&
        event.x < CARD_BOUNDS.left + CARD_BOUNDS.width + CONFIG.proximity &&
        event.y > CARD_BOUNDS.top - CONFIG.proximity &&
        event.y < CARD_BOUNDS.top + CARD_BOUNDS.height + CONFIG.proximity
      );

      CARD.style.setProperty('--active', isActive ? '1' : CONFIG.opacity.toString());

      // Safe angle calculation with null checks
      const CARD_CENTER = [
        CARD_BOUNDS.left + CARD_BOUNDS.width * 0.5,
        CARD_BOUNDS.top + CARD_BOUNDS.height * 0.5
      ];

      const deltaX = event.x - CARD_CENTER[0];
      const deltaY = event.y - CARD_CENTER[1];
      
      // Only calculate angle if we have valid deltas
      if (deltaX !== 0 || deltaY !== 0) {
        let ANGLE = (Math.atan2(deltaY, deltaX) * 180) / Math.PI;
        ANGLE = ANGLE < 0 ? ANGLE + 360 : ANGLE;
        CARD.style.setProperty('--start', `${ANGLE + 90}`);
      }
    };

    const RESTYLE = () => {
      CONTAINER.style.setProperty('--gap', `${CONFIG.gap}px`);
      CONTAINER.style.setProperty('--blur', `${CONFIG.blur}px`);
      CONTAINER.style.setProperty('--spread', `${CONFIG.spread}px`);
      CONTAINER.style.setProperty('--direction', CONFIG.vertical ? 'column' : 'row');
    };

    RESTYLE();
    
    // Initialize with a fake event at the center
    UPDATE({ x: window.innerWidth/2, y: window.innerHeight/2 });
    
    window.addEventListener('pointermove', UPDATE);

    return () => {
      window.removeEventListener('pointermove', UPDATE);
    };
  }, [identifier]);

  return (
    <div ref={containerRef} className={`glow-container glow-container-${identifier}`}>
      <article 
        ref={cardRef}
        className={`glow-card glow-card-${identifier} h-fit cursor-pointer border border-[#2a2e5a] transition-all duration-300 relative bg-[#101123] text-gray-200 rounded-xl hover:border-transparent w-full`}
      >
        <div className="glows"></div>
        {children}
      </article>
    </div>
  );
};

export default GlowCard;