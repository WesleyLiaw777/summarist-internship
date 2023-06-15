import AuthModal from "@/components/AuthModal";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { RecoilRoot } from "recoil";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <RecoilRoot>
      <AuthModal/>
      <Component {...pageProps} />
    </RecoilRoot>
  );
}