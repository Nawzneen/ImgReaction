import { AuthPanel } from "@/components/AuthPanel";
import { ImageCard } from "@/components/ImageCard";
import { IMAGES } from "@/constants/images";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import { Modal, ScrollView, View } from "react-native";
export default function HomeScreen() {
  const qc = useMemo(() => new QueryClient(), []);
  const [userId, setUserId] = useState<string | null>(null);
  const [loginModalVisible, setLoginModalVisible] = useState(false);
  return (
    <QueryClientProvider client={qc}>
      <ScrollView className="p-4">
        <View className="items-center my-4">
          <AuthPanel
            userId={userId}
            onSignIn={(id) => setUserId(id)}
            onSignOut={() => setUserId(null)}
          />
        </View>
        <View className=" flex flex-row justify-center items-center gap-x-2">
          {IMAGES.map((img) => (
            <ImageCard
              key={img.id}
              image={img}
              userId={userId ?? undefined}
              onRequireAuth={() => setLoginModalVisible(true)}
            />
          ))}
        </View>

        {/* LOGIN MODAL */}
        <Modal
          visible={loginModalVisible}
          animationType="slide"
          transparent={true}
          onRequestClose={() => setLoginModalVisible(false)}
        >
          <View className="flex-1 justify-center items-center bg-black/50">
            <View className="bg-white p-6 rounded-lg w-11/12 max-w-md">
              <AuthPanel
                userId={userId}
                onSignIn={(id) => {
                  setUserId(id);
                  setLoginModalVisible(false);
                }}
                onSignOut={() => {
                  setUserId(null);
                  setLoginModalVisible(false);
                }}
              />
            </View>
          </View>
        </Modal>
      </ScrollView>
    </QueryClientProvider>
  );
}
