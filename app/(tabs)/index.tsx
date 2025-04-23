import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { styles } from "../../styles/auth.styles";
import { Link } from "expo-router";

export default function Index() {
  return (
    <View style={styles.container}>
      <Link href="/notifications">
        <Text>Feed screen in tabs</Text>
      </Link>
    </View>
  );
}
