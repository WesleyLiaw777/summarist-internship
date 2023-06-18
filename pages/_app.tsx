import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { RecoilRoot } from "recoil";
import AuthModal from "@/components/AuthModal";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <RecoilRoot>
      <AuthModal/>
      <Component {...pageProps} />
    </RecoilRoot>
  );
}