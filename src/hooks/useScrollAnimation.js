import { useRef } from 'react';
import { useInView } from 'framer-motion';

/**
 * A custom hook to detect when an element is visible in the viewport.
 * It now uses framer-motion's useInView for more robust detection and
 * returns the ref and the inView boolean.
 *
 * @param {object} options - Configuration for the Intersection Observer.
 * @param {number} options.threshold - A value between 0 and 1 indicating the percentage of the element that needs to be visible to trigger the animation.
 * @param {boolean} options.once - If true, the animation will only trigger once.
 * @returns {[React.RefObject, boolean]} - A ref to attach to the element and a boolean indicating if it's in view.
 */
export const useScrollAnimation = ({ threshold = 0.2, once = true } = {}) => {
    const ref = useRef(null);
    const isInView = useInView(ref, {
        once: once,
        amount: threshold,
    });

    return [ref, isInView];
};