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
      <Stack.Screen
        name="discover"
        options={{
          title: 'Guest Discover',
        }}
      />
      <Stack.Screen
        name="add"
        options={{
          title: 'Guest Add',
        }}
      />
      <Stack.Screen
        name="up-post"
        options={{
          title: 'Guest Up Post',
        }}
      />
      <Stack.Screen
        name="messages"
        options={{
          title: 'Guest Messages',
        }}
      />
      <Stack.Screen
        name="profile"
        options={{
          title: 'Guest Profile',
        }}
      />
    </Stack>
  );
}
