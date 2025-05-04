import { Stack } from "expo-router";
import { Text } from "react-native";

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: "Oops!" }} />
      <Text className="mt-16 ml-8">This screen does not exist.</Text>
    </>
  );
}
