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
    opacity: 1,
    y: '0vh',
    scale: 0.3,
  },
  animate: {
    opacity: 1,
    y: '3vh',
    scale: 1,
    transition: {
      duration: 0.5,
    },
  },
  exit: {
    opacity: 1,
    scale: 0.5,
    transition: {
      duration: 0.5,
    },
  },
};

const progressBarAnimation: Variants = {
  initial: {
    width: '100%',
  },
  animate: {
    width: '0%',
    transition: {
      duration: 3,
    },
  },
  exit: {
    width: '0%',
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

const warningAnimation: Variants = {
  initial: {
    opacity: 0,
    scale: 0.8,
  },
  animate: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.2,
    },
  },
  exit: {
    opacity: 0,
    scale: 0.8,
    transition: {
      duration: 0.2,
    },
  },
};

export {
  backButtonAnimation,
  notificationAnimation,
  progressBarAnimation,
  loadAnimation,
  warningAnimation,
};
