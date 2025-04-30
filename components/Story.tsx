import { View, Text, TouchableOpacity, Image } from "react-native";
import { styles } from "../styles/feed.styles";

type Story = {
  id: string;
  username: string;
  avatar: string;
  hasStory: boolean;
};

export default function Story({ story }: { story: Story }) {
  return (
    <TouchableOpacity style={styles.storyWrapper}>
      <View style={[styles.storyRing, !story.hasStory && styles.noStory]}>
        <Image style={styles.storyAvatar} source={{ uri: story.avatar }} />
      </View>
      <Text style={styles.storyUsername}>{story.username}</Text>
    </TouchableOpacity>
  );
}
