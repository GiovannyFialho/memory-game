import { Text, type TextProps } from "react-native";

import { colors } from "@/constants/colors";

type AppTextProps = TextProps & {
  weight?: "regular" | "medium" | "semi-bold" | "bold" | "extra-bold";
};

const fontMap = {
  regular: "Baloo2_400Regular",
  medium: "Baloo2_500Medium",
  "semi-bold": "Baloo2_600SemiBold",
  bold: "Baloo2_700Bold",
  "extra-bold": "Baloo2_800ExtraBold",
} as const;

export function AppText({ style, weight = "regular", ...rest }: AppTextProps) {
  const fontFamily = fontMap[weight];

  return (
    <Text
      {...rest}
      style={[style, { fontFamily, color: colors.grayscale.gray100 }]}
    />
  );
}
