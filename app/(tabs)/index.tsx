import { AuthPanel } from "@/components/AuthPanel";
import { ImageCard } from "@/components/ImageCard";
import { IMAGES } from "@/constants/images";
import { useState } from "react";
import { ScrollView, View } from "react-native";
export default function HomeScreen() {
  const [userId, setUserId] = useState<string | null>(null);
  return (
    <ScrollView className="p-4">
      <View className="items-center my-8">
        <AuthPanel
          userId={userId}
          onSignIn={(id) => setUserId(id)}
          onSignOut={() => setUserId(null)}
        />
      </View>
      <View className=" flex flex-row justify-center items-center gap-x-2">
        {IMAGES.map((img) => (
          <ImageCard key={img.id} image={img} userId={userId ?? undefined} />
        ))}
      </View>
    </ScrollView>
  );
}
