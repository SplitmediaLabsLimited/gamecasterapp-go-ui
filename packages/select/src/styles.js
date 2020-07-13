export const transitionsConfig = {
  config: {
    tension: 510,
    friction: 30,
  },
  from: {
    opacity: 0,
    transform: `translate3d(0, -20%, 0)`,
  },
  enter: {
    opacity: 1,
    transform: `translate3d(0,0,0)`,
    zIndex: 20,
  },
  leave: {
    opacity: 0,
    transform: `translate3d(0, -20%, 0)`,
  },
};

export const scrollbarStyle = {
  'div::-webkit-scrollbar, textarea::-webkit-scrollbar, &::-webkit-scrollbar': {
    width: '0.375rem',
    height: '0.375rem',
  },

  'div::-webkit-scrollbar-thumb, textarea::-webkit-scrollbar-thumb, &::-webkit-scrollbar-thumb': {
    bg: 'transparent',
    borderRadius: '1rem',
  },

  'div:hover::-webkit-scrollbar-thumb, textarea:hover::-webkit-scrollbar-thumb, &:hover::-webkit-scrollbar-thumb': {
    bg: (t) => t.colors.base[500],
  },
};
