import { TextInput } from "react-native";
interface UserInputProps {
  userId: string;
  setUserId: React.Dispatch<React.SetStateAction<string>>;
}
export function UserInput({ userId, setUserId }: UserInputProps) {
  return (
    <TextInput
      placeholder="Enter user Id..."
      value={userId}
      onChangeText={setUserId}
      className=""
    />
  );
}
