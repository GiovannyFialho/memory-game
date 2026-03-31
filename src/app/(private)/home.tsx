import { router } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";

import { useAuthStore } from "@/shared/stores/auth.store";

export default function Home() {
  const { user, logout } = useAuthStore();

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text style={{ fontSize: 24, fontWeight: "700", marginBottom: 16 }}>
        Olá, {user?.name}
      </Text>

      <TouchableOpacity
        onPress={() => {
          logout();

          router.push("/(public)/sign-in");
        }}
      >
        <Text style={{ fontSize: 16, fontWeight: "500" }}>Sair</Text>
      </TouchableOpacity>
    </View>
  );
}
