import React, { useEffect, useRef } from 'react';
import { Input } from './input';
import { cn } from '@/lib/utils';

interface KeyboardAwareInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string;
}

export const KeyboardAwareInput = React.forwardRef<HTMLInputElement, KeyboardAwareInputProps>(
  ({ className, onFocus, onBlur, ...props }, ref) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const timeoutRef = useRef<NodeJS.Timeout>();

    const handleFocus = (event: React.FocusEvent<HTMLInputElement>) => {
      // Clear any existing timeout
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      // Scroll input into view after a short delay to ensure keyboard is open
      timeoutRef.current = setTimeout(() => {
        if (inputRef.current && window.innerWidth <= 768) {
          const rect = inputRef.current.getBoundingClientRect();
          const viewportHeight = window.visualViewport?.height || window.innerHeight;
          
          // Check if input is covered by keyboard
          if (rect.bottom > viewportHeight * 0.6) {
            inputRef.current.scrollIntoView({
              behavior: 'smooth',
              block: 'center',
              inline: 'nearest'
            });
          }
        }
      }, 300);

      // Call original onFocus if provided
      if (onFocus) {
        onFocus(event);
      }
    };

    const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
      // Clear timeout on blur
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      // Call original onBlur if provided
      if (onBlur) {
        onBlur(event);
      }
    };

    useEffect(() => {
      return () => {
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
        }
      };
    }, []);

    return (
      <Input
        ref={(node) => {
          inputRef.current = node;
          if (typeof ref === 'function') {
            ref(node);
          } else if (ref) {
            ref.current = node;
          }
        }}
        className={cn("keyboard-safe-input", className)}
        onFocus={handleFocus}
        onBlur={handleBlur}
        {...props}
      />
    );
  }
);

KeyboardAwareInput.displayName = "KeyboardAwareInput";
