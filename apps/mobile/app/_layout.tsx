import { Stack, useRouter, useSegments } from 'expo-router'
import { TamaguiProvider, Text, Theme } from 'tamagui'
import config from '../tamagui.config.js'       // ← alias global, ya definido en tsconfig + Metro
import { useAuth } from '../hooks/useAuth'
import { useEffect } from 'react'

export default function RootLayout() {
  const { user, profile, loading, isOnboardingComplete } = useAuth()
  const segments = useSegments()
  const router   = useRouter()

  const inOnboardingFlow = segments[0] === 'onboarding'

  /* ────────────────────────────────────────────
   * Redirecciones según estado de auth / onboarding
   * ──────────────────────────────────────────── */
  useEffect(() => {
    if (loading) return

    if (!user) {
      if (!inOnboardingFlow) router.replace('/onboarding/login')
      return
    }

    if (!isOnboardingComplete && !inOnboardingFlow) {
      router.replace('/onboarding/goal_type')
    } else if (isOnboardingComplete && inOnboardingFlow) {
      router.replace('/(tabs)')
    }
  }, [user, loading, isOnboardingComplete, inOnboardingFlow])

  if (loading) {
    return <Text>Cargando…</Text>
  }

  return (
    <TamaguiProvider config={config} defaultTheme="light">
      <Theme name="light">
        <Stack>
          <Stack.Screen name="onboarding" options={{ headerShown: false }} />
          <Stack.Screen name="(tabs)"     options={{ headerShown: false }} />
        </Stack>
      </Theme>
    </TamaguiProvider>
  )
}