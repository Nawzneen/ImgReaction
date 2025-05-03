import React, { useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";

interface AuthPanelProps {
  userId: string | null;
  onSignIn: (id: string) => void;
  onSignOut: () => void;
}

export function AuthPanel({ userId, onSignIn, onSignOut }: AuthPanelProps) {
  const [inputValue, setInputValue] = useState("");

  if (userId) {
    return (
      <View className="bg-[#ede7e0] p-6 rounded-lg items-center w-full max-w-sm">
        <View className="flex flex-row justify-center items-center gap-4">
          <Text className="text-lg  text-center font-bold">Signed in as:</Text>
          <Text className="text-xl ">{userId}</Text>
          <TouchableOpacity
            className=" bg-red-500 px-4 py-2 rounded-lg"
            onPress={() => {
              setInputValue("");
              onSignOut();
            }}
          >
            <Text className="text-white">Sign Out</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <View className="bg-[#ede7e0] py-4 px-2 rounded-lg w-full max-w-sm">
      <View className="flex flex-row justify-center items-center gap-4">
        <Text className="text-lg  text-center font-bold">Sign In</Text>
        <TextInput
          placeholder="Enter user ID..."
          value={inputValue}
          onChangeText={setInputValue}
          className="border border-gray-400 rounded px-3 py-2 "
        />
        <TouchableOpacity
          className={`px-4 py-2 rounded-lg ${
            inputValue ? "bg-[#d74271]" : "bg-gray-400"
          }`}
          disabled={!inputValue}
          onPress={() => onSignIn(inputValue)}
        >
          <Text className="text-center text-white">Sign In</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
