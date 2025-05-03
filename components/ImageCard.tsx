import { Image } from "expo-image";
import { StyleSheet, Text, View } from "react-native";
type ImageType = {
  id: string;
  url: string;
};
interface ImageCardPropsType {
  image: ImageType;
  userId?: string;
}

export function ImageCard({ image, userId }: ImageCardPropsType) {
  return (
    <View className="mb-4 border rounded-lg p-2">
      <View>
        <Image source={{ uri: image.url }} style={styles.image} />
        <View className="absolute bottom-2 left-2 bg-white rounded-lg w-fit px-2 py-1">
          <Text className="">❤️👏🤩🔥 123</Text>
        </View>
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
