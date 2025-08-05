import { useEffect, useRef } from 'react';

export const useVirtualKeyboard = () => {
  const originalViewportHeight = useRef<number>(0);

  useEffect(() => {
    // Store the original viewport height
    originalViewportHeight.current = window.visualViewport?.height || window.innerHeight;

    const handleViewportChange = () => {
      if (!window.visualViewport) return;

      const currentHeight = window.visualViewport.height;
      const heightDifference = originalViewportHeight.current - currentHeight;
      
      // If height difference is significant (keyboard is likely open)
      if (heightDifference > 150) {
        // Find the focused element
        const focusedElement = document.activeElement as HTMLElement;
        
        if (focusedElement && (
          focusedElement.tagName === 'INPUT' || 
          focusedElement.tagName === 'SELECT' || 
          focusedElement.tagName === 'TEXTAREA'
        )) {
          // Scroll the focused element into view with some padding
          setTimeout(() => {
            focusedElement.scrollIntoView({
              behavior: 'smooth',
              block: 'center',
              inline: 'nearest'
            });
          }, 300); // Small delay to ensure keyboard is fully open
        }
      }
    };

    const handleFocusIn = (event: FocusEvent) => {
      const target = event.target as HTMLElement;
      
      if (target && (
        target.tagName === 'INPUT' || 
        target.tagName === 'SELECT' || 
        target.tagName === 'TEXTAREA'
      )) {
        // On mobile, scroll the element into view when focused
        if (window.innerWidth <= 768) {
          setTimeout(() => {
            target.scrollIntoView({
              behavior: 'smooth',
              block: 'center',
              inline: 'nearest'
            });
          }, 300);
        }
      }
    };

    // Listen for viewport changes (keyboard open/close)
    if (window.visualViewport) {
      window.visualViewport.addEventListener('resize', handleViewportChange);
    }

    // Listen for focus events on form elements
    document.addEventListener('focusin', handleFocusIn);

    // Cleanup
    return () => {
      if (window.visualViewport) {
        window.visualViewport.removeEventListener('resize', handleViewportChange);
      }
      document.removeEventListener('focusin', handleFocusIn);
    };
  }, []);
};
