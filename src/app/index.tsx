import { Redirect } from "expo-router";

import { useAuthStore } from "@/shared/stores/auth.store";

export default function Index() {
  const { user } = useAuthStore();

  if (user) {
    return <Redirect href="/(private)/home" />;
  }

  return <Redirect href="/(public)/sign-in" />;
}
