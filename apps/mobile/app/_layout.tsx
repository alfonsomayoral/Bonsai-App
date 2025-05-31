import { Stack, useRouter } from 'expo-router'
import { TamaguiProvider } from 'tamagui'
import config from '../tamagui.config'
import { useAuth } from '../hooks/useAuth'
import { useEffect } from 'react'

export default function RootLayout() {
  const { user, loading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading && !user) {
      router.replace('/(auth)/login')
    }
  }, [user, loading])

  if (loading) return null // o un splash

  return (
    <TamaguiProvider config={config}>
      <Stack>
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
    </TamaguiProvider>
  )
} 