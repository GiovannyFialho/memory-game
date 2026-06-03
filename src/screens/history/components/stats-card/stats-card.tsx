import { StyleSheet, View } from "react-native";

import { AppText } from "@/shared/components/app-text";

import { colors } from "@/constants/colors";

interface StatsCardParams {
  icon: React.ReactNode;
  value: string | null;
  label: string;
  variant?: "purple" | "cyan";
}

export function StatsCard({ icon, value, label, variant }: StatsCardParams) {
  const valueColor =
    variant === "purple" ? colors.accent.lightPurple : colors.accent.cyan;

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <AppText
          weight="extra-bold"
          style={[styles.value, { color: valueColor }]}
        >
          {value}
        </AppText>
        {icon}
      </View>

      <AppText style={styles.label}>{label}</AppText>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderRadius: 20,
    alignItems: "flex-start",
    borderWidth: 1,
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderColor: colors.grayscale.gray400,
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  value: {
    fontSize: 28,
  },
  label: {
    fontSize: 14,
    color: colors.grayscale.gray200,
  },
});
