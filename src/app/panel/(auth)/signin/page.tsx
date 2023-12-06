import { Metadata } from "next";
import SignInForm from "./components/SignInForm";

export const metadata: Metadata = {
  title: "Sign In to Ranzhop Panel",
};

export default function SignInPage() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center">
      <SignInForm />
    </div>
  );
}
