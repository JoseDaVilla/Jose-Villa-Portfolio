import { useEffect, useRef } from 'react';

// Component to trap focus within modal for accessibility
function FocusTrap({ children }) {
  const rootRef = useRef(null);
  const originalFocusRef = useRef(null);

  useEffect(() => {
    // Store the element that had focus before the modal was opened
    originalFocusRef.current = document.activeElement;

    // Find all focusable elements within the modal
    const getFocusableElements = () => {
      if (!rootRef.current) return [];
      return Array.from(
        rootRef.current.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        )
      );
    };

    // Focus the first element when modal opens
    const focusFirstElement = () => {
      const focusableElements = getFocusableElements();
      if (focusableElements.length) {
        focusableElements[0].focus();
      }
    };

    // Handle tab key presses to trap focus within the modal
    const handleKeyDown = (e) => {
      if (e.key !== 'Tab') return;

      const focusableElements = getFocusableElements();
      if (focusableElements.length === 0) return;

      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      // If shift + tab and on first element, cycle to last element
      if (e.shiftKey && document.activeElement === firstElement) {
        lastElement.focus();
        e.preventDefault();
      }
      // If tab and on last element, cycle to first element
      else if (!e.shiftKey && document.activeElement === lastElement) {
        firstElement.focus();
        e.preventDefault();
      }
    };

    // Set up focus trap
    focusFirstElement();
    document.addEventListener('keydown', handleKeyDown);

    // Clean up
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      // Restore focus to the original element when modal closes
      if (originalFocusRef.current) {
        originalFocusRef.current.focus();
      }
    };
  }, []);

  return (
    <div ref={rootRef}>
      {children}
    </div>
  );
}

export default FocusTrap;
