'use client';

import React, { useEffect, useRef, useState } from 'react';

interface BouncingTextProps {
  text?: string;
  pixelsPerSecond?: number; // Speed in pixels per second
  className?: string;
}

const BouncingText: React.FC<BouncingTextProps> = ({
  text,
  pixelsPerSecond = 8, // Default speed: 10 pixels per second
  className = ''
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const [isOverflowing, setIsOverflowing] = useState(false);
  const [animationWidth, setAnimationWidth] = useState(0);
  const [animationDuration, setAnimationDuration] = useState(0);

  useEffect(() => {
    const checkOverflow = () => {
      if (containerRef.current && textRef.current) {
        const containerWidth = containerRef.current.offsetWidth;
        const textWidth = textRef.current.offsetWidth;

        const overflow: number = (textWidth - containerWidth) > 8 ? textWidth - containerWidth: 0;

        setIsOverflowing(overflow > 0);
        setAnimationWidth(overflow);

        // Calculate duration based on the distance the text needs to travel
        const totalDistance = overflow; // Text travels only the overflow distance
        const durationInSeconds = (totalDistance / pixelsPerSecond) < 2 ? 2: totalDistance / pixelsPerSecond;
        setAnimationDuration(durationInSeconds);
      }
    };

    checkOverflow();
    window.addEventListener('resize', checkOverflow);

    return () => {
      window.removeEventListener('resize', checkOverflow);
    };
  }, [text, pixelsPerSecond]);

  return (
    <div
      ref={containerRef}
      className={`${isOverflowing ? 'justify-start' : 'justify-center'} ${className} flex h-10 w-full items-center overflow-hidden whitespace-nowrap rounded-lg bg-[#443F64]`}
    >
      <div
        ref={textRef}
        className={`${isOverflowing ? 'animate-bounce-text' : ''} inline-block`}
        style={{
          animation: isOverflowing
            ? `bounceText ${animationDuration}s linear infinite`
            : 'none',
          '--bounce-width': `${animationWidth}px`,
        } as React.CSSProperties}
      >
        {text ? `${text}` : ""}
      </div>
      <style jsx>{`
        @keyframes bounceText {
          0% {
            transform: translateX(4px); /* Start at the original position */
          }
          50% {
            transform: translateX(calc(-1 * var(--bounce-width) - 4px)); /* Move left by the overflow distance */
          }
          100% {
            transform: translateX(4px) /* Return to the original position */
          }
        }
      `}</style>
    </div>
  );
};

export default BouncingText;
