import { router } from "expo-router";
import { useState } from "react";

import { useAuthStore } from "@/shared/stores/auth.store";

export function useSignInModel() {
  const [username, setUsername] = useState("");

  const { setAuthenticated } = useAuthStore();

  function handleSubmit() {
    if (!username.length) return;

    setAuthenticated(username);

    router.push("/(private)/home");
  }

  return { username, setUsername, handleSubmit };
}
