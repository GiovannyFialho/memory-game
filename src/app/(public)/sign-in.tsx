import { useSignInModel } from "@/screens/sign-in/sign-in.model";
import { SignInView } from "@/screens/sign-in/sign-in.view";

export default function SignIn() {
  const signInModel = useSignInModel();

  return <SignInView {...signInModel} />;
}
