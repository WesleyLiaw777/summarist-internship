import { atom } from 'recoil'

export const authStateAtom = atom({
    key: 'authState', // unique ID (with respect to other atoms/selectors)
    default: {
        email: null as string | null,
    },
  });