import { useAuthStore } from "@/shared/stores/auth.store";
import { router } from "expo-router";
import { useState } from "react";

export function useSignInModel() {
  const [username, setUsername] = useState("");

  const { setAuthenticated } = useAuthStore();

  function handleSubmit() {
    setAuthenticated(username);

    router.push("/(private)/home");
  }

  return { username, setUsername, handleSubmit };
}
