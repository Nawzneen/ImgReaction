import { ReactionType } from "@/api/reactions";
import { useReactions } from "@/hooks/useReactions";
import { Image } from "expo-image";
import { Pressable, StyleSheet, Text, View } from "react-native";
type ImageType = {
  id: string;
  url: string;
};
interface ImageCardPropsType {
  image: ImageType;
  userId?: string;
  onRequireAuth: () => void;
}
const ALL_REACTIONS: ReactionType[] = ["LOVE", "ADMIRE", "FIRE", "CLAP"];
const reactionEmojiMap: Record<ReactionType, string> = {
  LOVE: "❤️",
  ADMIRE: "🤩",
  FIRE: "🔥",
  CLAP: "👏",
};

export function ImageCard({
  image,
  userId,
  onRequireAuth,
}: ImageCardPropsType) {
  const { data, isLoading, error, addReaction, removeReaction } = useReactions(
    image.id,
    userId
  );
  const total = data
    ? Object.values(data.counts).reduce((sum, c) => sum + c, 0)
    : 0;
  return (
    <View className="mb-4  rounded-lg p-2">
      <View>
        <Image source={{ uri: image.url }} style={styles.image} />
        {/* only show the reaction bar when data is available */}
        {!isLoading && data && !error && (
          <View className="absolute bottom-2 left-2 bg-white rounded-lg px-2 py-1 flex-row">
            {ALL_REACTIONS.map((r) => {
              const selected = data.userReaction === r;
              const disabled = !userId;
              return (
                <Pressable
                  key={r}
                  onPress={() => {
                    if (disabled) {
                      onRequireAuth();
                      return;
                    }
                    if (selected) removeReaction(r);
                    else addReaction(r);
                  }}
                  className="cursor-pointer r"
                >
                  <Text
                    className={`text-xl text-center w-7 ${
                      selected ? "bg-[#d7427171]  rounded-full" : ""
                    }`}
                  >
                    {reactionEmojiMap[r]}
                  </Text>
                </Pressable>
              );
            })}
            <Text className="text-base font-bold flex justify-center items-center pl-1">
              {total}
            </Text>
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  image: {
    width: 380,
    height: 543,
    borderRadius: 8,
  },
});
