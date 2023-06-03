import Modal from "@mui/material/Modal";
import { useState, useEffect } from "react";
import { RxCross1 as XIcon } from "react-icons/rx";
import { BsFillPersonFill } from "react-icons/bs";
import { FcGoogle } from "react-icons/fc";
import { auth } from "@/firebase";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { authStateAtom } from "@/atoms/authStateAtom";
import { useRecoilState } from "recoil";
import { useRouter } from "next/router";
import { loginModalState } from "@/atoms/loginModalState";

export default function loginModal() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useRecoilState(loginModalState);
  const handleClose = () => {
    setIsOpen(false);
  };
  const handleOpen = () => {
    setIsOpen(true);
  };

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useRecoilState(authStateAtom);
  async function handleLogin() {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      console.log(`Login success!`);
    } catch (error) {
      console.error("Login failed. ", error);
    }
  }
  async function handleSignup() {
    try {
      const userCred = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCred.user;
      console.log(user);
      console.log("Welcome!");
    } catch (error) {
      console.error("Sign up failed", error);
    }
  }
  async function guestSignin() {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        "guest@guestmail.com",
        "123456"
      );
      setUser(userCredential.user);
      console.log(`Login success!`);
    } catch (error) {
      console.error("Login failed. ", error);
    }
  }
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        router.push("/for-you")
        const uid = user.uid;
        // ...
      } else {
        // User is signed out
        // ...
      }
    });
  }, []);

  return (
    <>
      <button onClick={handleOpen}>Login</button>
      <Modal
        open={isOpen}
        onClose={handleClose}
        className="flex items-center justify-center"
      >
        <div className="relative flex w-full max-w-[400px] flex-col rounded-lg bg-white shadow-2xl">
          <XIcon className="absolute right-4 top-4" onClick={handleClose} />
          <div className="flex h-fit flex-col items-center px-[48px] py-[32px] text-center">
            <h3 className="mb-6 text-xl font-bold text-[#032b41]">
              Log in to Summarist
            </h3>
            <button
              className="hover__duration relative h-10 w-full rounded-md bg-[#3a579d] text-[16px] text-white hover:bg-[#25396b]"
              onClick={guestSignin}
            >
              <BsFillPersonFill className="absolute bottom-1 left-1 h-8 w-8" />
              Login as Guest
            </button>
            <div className="auth__separator">
              <span className="color-[#394547] mx-6 text-sm">or</span>
            </div>
            <button className="hover__duration relative h-10 w-full rounded-md bg-[#4285f4] text-white hover:bg-[#2f61b0]">
              <FcGoogle className="absolute bottom-1 left-1 h-8 w-8 rounded-md bg-white" />
              Login with Google
            </button>
            <div className="auth__separator">
              <span className="color-[#394547] mx-6 text-sm">or</span>
            </div>
            <div className="flex w-full flex-col items-center gap-4 text-sm">
              <input
                type="email"
                placeholder="Email Address"
                className="auth__input"
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type="password"
                placeholder="Password"
                className="auth__input"
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                className="hover__duration h-10 w-full bg-[#2bd97c] hover:bg-[#20ba68]"
                onClick={handleLogin}
              >
                Login
              </button>
              <button
                className="hover__duration h-10 w-full bg-[#2bd97c] hover:bg-[#20ba68]"
                onClick={handleSignup}
              >
                Signup
              </button>
            </div>
          </div>
          <button className="hover__duration mb-3 text-sm text-[#116be9] hover:text-[#124a98]">
            Forgot your password?
          </button>
          <button className="hover__duration h-10 rounded-lg bg-[#f1f6f4] text-sm text-[#116be9] hover:bg-[#e1e9e8]">
            Don't have an account?
          </button>
        </div>
      </Modal>
    </>
  );
}
