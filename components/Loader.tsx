import { View, ActivityIndicator } from "react-native";
import { COLORS } from "@/constants/theme";

export default function Loader() {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: COLORS.background,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <ActivityIndicator size="large" color={COLORS.primary} />
    </View>
  );
}
