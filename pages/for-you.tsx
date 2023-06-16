import { auth } from "@/firebase";
import { signOut } from "firebase/auth";
import { useRouter } from "next/router";
export default function forYou() {
  const router = useRouter();
  const handleSignout = () => {
    signOut(auth);
    router.push("/");
  };
  
  return (
    <>
      <div>This is the for you page</div>
      <button onClick={handleSignout}>Logout</button>
    </>
  );
}
