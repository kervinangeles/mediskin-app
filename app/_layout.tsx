import { Stack } from 'expo-router';

export default function Layout() {
  return (
    <Stack>
      <Stack.Screen name="(auth)/login" options={{ headerShown: false }} />
      <Stack.Screen name="(auth)/signup" options={{ headerShown: false }} />
      <Stack.Screen name="(auth)/forgotpassword" options={{ headerShown: false }} />
      <Stack.Screen name="(auth)/resetpassword" options={{ headerShown: false }} />
      <Stack.Screen name="(tabs)/homescreen" options={{ headerShown: false }} />
    </Stack>
  );
}
