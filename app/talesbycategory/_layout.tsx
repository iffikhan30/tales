import CustomHeader from "@/components/CustomHeader";
import { Stack } from "expo-router";

export default function Layout() {
  return (
    <Stack>
      <Stack.Screen
        name="[id]"
        options={{
          header: (props) => <CustomHeader {...props} />,
        }}
      />
    </Stack>
  );
}
