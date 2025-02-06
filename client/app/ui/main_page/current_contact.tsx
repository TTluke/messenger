'use client';

import React, { useLayoutEffect, useRef, useState, useCallback, useEffect } from 'react';

interface BouncingTextProps {
  text?: string;
  pixelsPerSecond?: number; // Speed in pixels per second
  className?: string;
}

const BouncingText: React.FC<BouncingTextProps> = ({
  text = '',
  pixelsPerSecond = 8,
  className = '',
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const [isOverflowing, setIsOverflowing] = useState(false);
  const [overflowWidth, setOverflowWidth] = useState(0);
  const [animationDuration, setAnimationDuration] = useState(0);

  // Use useCallback to memoize the function and avoid unnecessary re-creations.
  const checkOverflow = useCallback(() => {
    if (containerRef.current && textRef.current) {
      const containerWidth = containerRef.current.offsetWidth;
      const textWidth = textRef.current.offsetWidth;
      const extraMargin = 8;
      const overflow = textWidth - containerWidth > extraMargin ? textWidth - containerWidth : 0;
      
      setIsOverflowing(overflow > 0);
      setOverflowWidth(overflow);
      
      // Calculate duration based on distance and enforce a minimum duration of 2 seconds when overflowing
      const duration = overflow / pixelsPerSecond;
      setAnimationDuration(overflow > 0 && duration < 2 ? 2 : duration);
    }
  }, [pixelsPerSecond]);

  // Use useLayoutEffect to measure DOM sizes as soon as they are rendered
  useLayoutEffect(() => {
    checkOverflow();
  }, [text, pixelsPerSecond, checkOverflow]);

  // Debounce resize events to avoid performance issues
  useEffect(() => {
    let resizeTimer: ReturnType<typeof setTimeout>;
    const handleResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(checkOverflow, 100);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      clearTimeout(resizeTimer);
      window.removeEventListener('resize', handleResize);
    };
  }, [checkOverflow]);

  return (
    <div
      ref={containerRef}
      className={`${isOverflowing ? 'justify-start' : 'justify-center'} ${className} flex h-10 w-full items-center overflow-hidden whitespace-nowrap rounded-lg bg-[#443F64]`}
    >
      <div
        ref={textRef}
        style={{
          animation: isOverflowing ? `bounceText ${animationDuration}s linear infinite` : 'none',
          '--bounce-width': `${overflowWidth}px`,
        } as React.CSSProperties}
      >
        {text}
      </div>
      <style jsx>{`
        @keyframes bounceText {
          0% {
            transform: translateX(4px);
          }
          50% {
            transform: translateX(calc(-1 * var(--bounce-width) - 4px));
          }
          100% {
            transform: translateX(4px);
          }
        }
      `}</style>
    </div>
  );
};

export default BouncingText;
