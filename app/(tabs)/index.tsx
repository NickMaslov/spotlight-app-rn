import { Text, TouchableOpacity } from "react-native";
import { styles } from "../../styles/auth.styles";
import { useAuth } from "@clerk/clerk-expo";

export default function Index() {
  const { signOut } = useAuth();
  return (
    <TouchableOpacity onPress={() => signOut()} style={styles.container}>
      <Text style={{ color: "white" }}>Logout</Text>
    </TouchableOpacity>
  );
}
