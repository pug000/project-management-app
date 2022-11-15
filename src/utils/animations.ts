import { Variants } from 'framer-motion';

const backButtonAnimation: Variants = {
  initial: {
    x: 0,
  },
  exit: {
    x: 0,
    transition: {
      duration: 0.5,
    },
  },
  hover: {
    x: -10,
    transition: {
      repeat: Infinity,
      duration: 0.5,
      repeatType: 'reverse',
    },
  },
};

const notificationAnimation: Variants = {
  initial: {
    opacity: 0,
    y: '100vh',
    scale: 0.3,
  },
  animate: {
    opacity: 1,
    y: '35vh',
    scale: 1,
    transition: {
      duration: 0.5,
    },
  },
  exit: {
    opacity: 0,
    scale: 0.5,
    transition: {
      duration: 0.5,
    },
  },
};

const loadAnimation: Variants = {
  initial: {
    rotate: 0,
  },
  animate: {
    rotate: 359,
    transition: {
      duration: 1,
      repeat: Infinity,
      ease: 'linear',
    },
  },
  exit: {
    rotate: 359,
  },
};

export { backButtonAnimation, notificationAnimation, loadAnimation };
