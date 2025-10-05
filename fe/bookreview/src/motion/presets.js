import { useReducedMotion } from "framer-motion";

export const fadeIn = (delay = 0) => ({
hidden: { opacity: 0 },
show: { opacity: 1, transition: { duration: 0.35, delay } },
exit: { opacity: 0, transition: { duration: 0.2 } },
});

export const fadeInUp = (delay = 0) => ({
hidden: { opacity: 0, y: 12 },
show: { opacity: 1, y: 0, transition: { duration: 0.4, delay, ease: [0.22, 1, 0.36, 1] } },
exit: { opacity: 0, y: 8, transition: { duration: 0.25 } },
});

export const slideUp = (delay = 0) => ({
hidden: { opacity: 0, y: 24 },
show: { opacity: 1, y: 0, transition: { duration: 0.45, delay } },
exit: { opacity: 0, y: 16, transition: { duration: 0.25 } },
});

export const pop = (delay = 0) => ({
hidden: { opacity: 0, scale: 0.98 },
show: { opacity: 1, scale: 1, transition: { duration: 0.3, delay } },
exit: { opacity: 0, scale: 0.98, transition: { duration: 0.2 } },
});

export const staggerContainer = (stagger = 0.07, delayChildren = 0.1) => ({
hidden: {},
show: { transition: { staggerChildren: stagger, delayChildren } },
});

export const useMotionSafe = () => {
const reduce = useReducedMotion();
return {
initial: reduce ? undefined : "hidden",
animate: reduce ? undefined : "show",
exit: reduce ? undefined : "exit",
};
};