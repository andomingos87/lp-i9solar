import { useEffect, useRef } from 'react';

export const useResponsiveBackground = () => {
  const backgroundRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updateBackgroundHeight = () => {
      if (!backgroundRef.current) return;

      const element = backgroundRef.current;
      const viewportHeight = window.visualViewport?.height || window.innerHeight;
      const documentHeight = Math.max(
        document.documentElement.scrollHeight,
        document.documentElement.offsetHeight,
        document.documentElement.clientHeight,
        viewportHeight
      );

      // Ensure background covers at least the viewport height
      const minHeight = Math.max(viewportHeight, documentHeight);
      element.style.minHeight = `${minHeight}px`;
      
      // Force background to cover the entire area
      element.style.backgroundSize = 'cover';
      element.style.backgroundPosition = 'center center';
      element.style.backgroundAttachment = 'scroll';
    };

    const handleResize = () => {
      // Use requestAnimationFrame to ensure smooth updates
      requestAnimationFrame(updateBackgroundHeight);
    };

    const handleViewportChange = () => {
      // Handle virtual keyboard changes
      setTimeout(() => {
        requestAnimationFrame(updateBackgroundHeight);
      }, 100);
    };

    // Initial setup
    updateBackgroundHeight();

    // Listen for window resize
    window.addEventListener('resize', handleResize);
    
    // Listen for orientation changes
    window.addEventListener('orientationchange', () => {
      setTimeout(handleResize, 500); // Delay to allow orientation to complete
    });

    // Listen for viewport changes (virtual keyboard)
    if (window.visualViewport) {
      window.visualViewport.addEventListener('resize', handleViewportChange);
    }

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('orientationchange', handleResize);
      if (window.visualViewport) {
        window.visualViewport.removeEventListener('resize', handleViewportChange);
      }
    };
  }, []);

  return backgroundRef;
};
