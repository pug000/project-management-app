import { Variants } from 'framer-motion';

const burgerMenuAnimation = {
  firstLine: {
    variants: {
      closed: { d: 'M 2 2.5 L 20 2.5' },
      open: { d: 'M 3 16.5 L 17 2.5' },
    },
  },
  secondLine: {
    d: 'M 2 9.423 L 20 9.423',
    variants: {
      closed: { opacity: 1 },
      open: { opacity: 0 },
    },
    transition: {
      duration: 0.1,
    },
  },
  thirdLine: {
    variants: {
      closed: { d: 'M 2 16.346 L 20 16.346' },
      open: { d: 'M 3 2.5 L 17 16.346' },
    },
  },
};

const menuWrapperAnimation = {
  open: (height = 1000) => ({
    clipPath: `circle(${height * 2 + 200}px at 279.5px 41px)`,
    transition: {
      type: 'spring',
      stiffness: 20,
      restDelta: 2,
    },
  }),
  closed: {
    clipPath: 'circle(25px at 279.5px 41px)',
    transition: {
      type: 'spring',
      stiffness: 400,
      damping: 40,
    },
  },
};

const menuListAnimation = {
  open: {
    transition: { staggerChildren: 0.07, delayChildren: 0.2 },
  },
  closed: {
    transition: { staggerChildren: 0.05, staggerDirection: -1 },
  },
};

const menuItemAnimation = {
  open: {
    y: 0,
    opacity: 1,
    transition: {
      y: { stiffness: 1000, velocity: -100 },
    },
  },
  closed: {
    y: -50,
    opacity: 0,
    transition: {
      y: { stiffness: 1000 },
    },
  },
};

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

const popupAnimation: Variants = {
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
  menuWrapperAnimation,
  menuListAnimation,
  menuItemAnimation,
  burgerMenuAnimation,
  backButtonAnimation,
  notificationAnimation,
  progressBarAnimation,
  loadAnimation,
  popupAnimation,
};
