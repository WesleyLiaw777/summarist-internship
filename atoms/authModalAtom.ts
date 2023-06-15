import { atom } from "recoil";
export const authModalOpenAtom = atom<boolean>({
    key: 'authLoginModalOpen',
    default: false,
})