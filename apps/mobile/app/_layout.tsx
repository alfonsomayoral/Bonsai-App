import { Stack, useRouter, useSegments } from 'expo-router'
import { TamaguiProvider, Text } from 'tamagui'
import config from '../tamagui.config'
import { useAuth } from '../hooks/useAuth'
import { useEffect } from 'react'

export default function RootLayout() {
  const { user, profile, loading, isOnboardingComplete } = useAuth()
  const segments = useSegments();
  const router = useRouter()

  // Check if we are currently in the onboarding segment
  const inOnboardingFlow = segments[0] === 'onboarding';

  useEffect(() => {
    if (!loading) {
      // If user is not authenticated
      if (!user) {
        // If not already in onboarding, redirect to login
        if (!inOnboardingFlow) {
          router.replace('/onboarding/login');
        }
      } else { // If user is authenticated
        // If onboarding is not complete and not already in onboarding flow
        if (!isOnboardingComplete && !inOnboardingFlow) {
          router.replace('/onboarding/goal_type'); // Start onboarding flow
        }
        // If onboarding is complete and currently in onboarding flow
        else if (isOnboardingComplete && inOnboardingFlow) {
            router.replace('/(tabs)'); // Redirect to main app (index)
        }
        // Otherwise, remain on the current screen (either within tabs or already in onboarding)
      }
    }
  }, [user, loading, isOnboardingComplete, inOnboardingFlow]);

  if (loading) {
    // Or render a splash screen
    return <Text>Cargando...</Text>; 
  }

  return (
    <TamaguiProvider config={config}>
      <Stack>
        {/* We conditionally render based on auth state and onboarding status */}
        {/* The actual rendering is handled by Expo Router based on the current route */}
        {/* The redirects in useEffect ensure the user lands on the correct stack */}
        <Stack.Screen name="onboarding" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
    </TamaguiProvider>
  )
}