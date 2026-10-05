import { Stack } from 'expo-router';
import React from 'react';

export default function TabLayout() {
  return (
    <Stack screenOptions={{ 
      headerShown: false,
      animation: 'fade'
    }}>
      <Stack.Screen
        name="home"
        options={{
          title: 'Home',
        }}
      />
      <Stack.Screen
        name="profile"
        options={{
          title: 'Profile',
        }}
      />
    </Stack>
  );
}
