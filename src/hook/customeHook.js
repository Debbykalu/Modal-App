import { useCallback, useRef } from "react";

const useFocusTrap = () => {
  // Create a reference to the container element
  const containerRef = useRef(null);

  // Define a callback function to handle keydown events
  const handleKeyDown = useCallback(
    event => {
      // Check if the pressed key is Tab and if a container element exists
      if (event.key === "Tab" && containerRef.current) {
        // Get all focusable elements inside the container
        const focusableElements = containerRef.current.querySelectorAll(
          "button, [href], input, select, textarea, [tabindex]:not([tabindex='-1'])"
        );
        // Get the first and last focusable elements
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        // Handle Tab key press
        if (event.shiftKey) {
          // If Shift key is pressed and the focus is on the first element, move focus to the last element
          if (document.activeElement === firstElement) {
            lastElement.focus();
            event.preventDefault(); // Prevent the default behavior of Tab key
          }
        } else {
          // If Shift key is not pressed and the focus is on the last element, move focus to the first element
          if (document.activeElement === lastElement) {
            firstElement.focus();
            event.preventDefault(); // Prevent the default behavior of Tab key
          }
        }
      }
    },
    [containerRef] // Re-run this callback if the containerRef changes
  );

  // Return the containerRef and the handleKeyDown function
  return [containerRef, handleKeyDown];
};

export default useFocusTrap;
