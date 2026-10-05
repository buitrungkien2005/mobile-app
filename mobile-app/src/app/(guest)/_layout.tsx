import { Stack } from 'expo-router';
import React from 'react';

export default function GuestLayout() {
  return (
    <Stack screenOptions={{ 
      headerShown: false,
      animation: 'fade'
    }}>
      <Stack.Screen
        name="home"
        options={{
          title: 'Guest Home',
        }}
      />
    </Stack>
  );
}
