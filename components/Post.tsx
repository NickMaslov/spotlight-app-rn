import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { styles } from "@/styles/feed.styles";
import { Link } from "expo-router";
import { Image } from "expo-image";

// todo: add post type
export default function Post({ post }: { post: any }) {
  return (
    <View style={styles.post}>
      {/* Post Header */}
      <View style={styles.postHeader}>
        <Link href={"/(tabs)/notifications"}>
          <TouchableOpacity style={styles.postHeaderLeft}>
            <Image
              source={post.author.image}
              style={styles.postAvatar}
              contentFit="cover"
              transition={200}
              cachePolicy="memory-disk"
            />
          </TouchableOpacity>
          <Text style={styles.postUsername}>{post.author.username}</Text>
        </Link>
      </View>
    </View>
  );
}
