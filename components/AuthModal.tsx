import { useState, useEffect } from "react";

import { Modal } from "@mui/material";
import { useRecoilState } from "recoil";
import { authModalOpenAtom } from "@/atoms/authModalAtom";

import { RxCross1 as XIcon } from "react-icons/rx";
import { BsFillPersonFill } from "react-icons/bs";
import { FcGoogle } from "react-icons/fc";

import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "@/firebase";
import { useRouter } from "next/router";
import { authAtom } from "@/atoms/authAtom";
import { User } from "@/typings";

export default function AuthModal() {
  /* MODAL */
  const [authModalOpen, setAuthModalOpen] = useRecoilState(authModalOpenAtom);
  const [user, setUser] = useRecoilState(authAtom);
  //used one state to handle switching b/w login/password/signup content
  const [activeSection, setActiveSection] = useState<string>("login");
  const handleSectionChange = (section: string) => {
    setActiveSection(section);
  };
  const handleClose = () => {
    setAuthModalOpen(false);
    setActiveSection("login");
    errorMsg && setErrorMsg("");
  };

  /* FIREBASE */
  //email useState can be reused b/w login & pw reset w/ no issues.
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [errorMsg, setErrorMsg] = useState<string>("");
  const router = useRouter();

  //One auth function to handle them all (guest login, login, signup)
  const handleAuth = async (authOption: string) => {
    try {
      if (authOption === "guest") {
        await signInWithEmailAndPassword(auth, "guest@guestmail.com", "123456");
      } else if (authOption === "signin") {
        await signInWithEmailAndPassword(auth, email, password);
      } else if (authOption === "signup") {
        await createUserWithEmailAndPassword(auth, email, password);
      }
    } catch (error: any) {
      console.error(error.message);
      setErrorMsg(error.message);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser({
          email: user.email ?? "",
          uid: user.uid,
        });
        router.push("/for-you");
        handleClose();
      } else {
        setUser(null);
      }
    });

    return () => {
      // Clean up the listener when the component unmounts
      unsubscribe();
    };
  }, [auth]);

  return (
    <Modal
      open={authModalOpen}
      onClose={handleClose}
      className="flex items-center justify-center"
    >
      <>
        {activeSection === "login" && (
          <div className="relative flex w-full max-w-[400px] flex-col rounded-lg bg-white shadow-2xl">
            <XIcon
              className="absolute right-4 top-4 cursor-pointer"
              onClick={handleClose}
            />
            <div className="flex h-fit flex-col items-center px-[48px] py-[32px] text-center">
              <h3 className="mb-6 text-xl font-bold text-[#032b41]">
                Log in to Summarist
              </h3>
              <button
                onClick={() => handleAuth("guest")}
                className="hover__duration relative h-10 w-full rounded-md bg-[#3a579d] text-[16px] text-white hover:bg-[#25396b]"
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
                {errorMsg && <span className="text-red-600">{errorMsg}</span>}
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
                  onClick={() => handleAuth("signin")}
                  className="hover__duration h-10 w-full bg-[#2bd97c] hover:bg-[#20ba68]"
                >
                  Login
                </button>
              </div>
            </div>
            <button
              onClick={() => handleSectionChange("passwordReset")}
              className="hover__duration mb-3 text-sm text-[#116be9] hover:text-[#124a98]"
            >
              Forgot your password?
            </button>
            <button
              onClick={() => handleSectionChange("signup")}
              className="hover__duration h-10 rounded-lg bg-[#f1f6f4] text-sm text-[#116be9] hover:bg-[#e1e9e8]"
            >
              Don&apos;t have an account?
            </button>
          </div>
        )}
        {activeSection === "signup" && (
          <div className="relative flex w-full max-w-[400px] flex-col rounded-lg bg-white shadow-2xl">
            <XIcon
              className="absolute right-4 top-4 cursor-pointer"
              onClick={handleClose}
            />
            <div className="flex h-fit flex-col items-center px-[48px] py-[32px] text-center">
              <h3 className="mb-6 text-xl font-bold text-[#032b41]">
                Sign in to Summarist
              </h3>
              <button className="hover__duration relative h-10 w-full rounded-md bg-[#4285f4] text-white hover:bg-[#2f61b0]">
                <FcGoogle className="absolute bottom-1 left-1 h-8 w-8 rounded-md bg-white" />
                Sign up with Google
              </button>
              <div className="auth__separator">
                <span className="color-[#394547] mx-6 text-sm">or</span>
              </div>
              <div className="flex w-full flex-col items-center gap-4 text-sm">
                {errorMsg && <span className="text-red-600">{errorMsg}</span>}
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
                  onClick={() => handleAuth("signup")}
                  className="hover__duration h-10 w-full bg-[#2bd97c] hover:bg-[#20ba68]"
                >
                  Signup
                </button>
              </div>
            </div>
            <button
              onClick={() => handleSectionChange("login")}
              className="hover__duration h-10 rounded-lg bg-[#f1f6f4] text-sm text-[#116be9] hover:bg-[#e1e9e8]"
            >
              Already have an account?
            </button>
          </div>
        )}
        {activeSection === "passwordReset" && (
          <div className="relative flex w-full max-w-[400px] flex-col rounded-lg bg-white shadow-2xl">
            <XIcon
              className="absolute right-4 top-4 cursor-pointer"
              onClick={() => setAuthModalOpen(false)}
            />
            <div className="flex h-fit flex-col items-center px-[48px] py-[32px] text-center">
              <h3 className="mb-6 text-xl font-bold text-[#032b41]">
                Reset your password
              </h3>

              <div className="flex w-full flex-col items-center gap-4 text-sm">
                <input
                  type="email"
                  placeholder="Email Address"
                  className="auth__input"
                  onChange={(e) => setEmail(e.target.value)}
                />
                <button className="hover__duration h-10 w-full bg-[#2bd97c] hover:bg-[#20ba68]">
                  Send reset password link
                </button>
              </div>
            </div>
            <button
              onClick={() => handleSectionChange("login")}
              className="hover__duration h-10 rounded-lg bg-[#f1f6f4] text-sm text-[#116be9] hover:bg-[#e1e9e8]"
            >
              Already have an account?
            </button>
          </div>
        )}
      </>
    </Modal>
  );
}
