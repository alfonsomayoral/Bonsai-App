import { useState } from 'react'
import { YStack, Button, Text } from 'tamagui'
import { Camera } from 'expo-camera'
import { router } from 'expo-router'

export default function CaptureScreen() {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null)

  useState(() => {
    ;(async () => {
      const { status } = await Camera.requestCameraPermissionsAsync()
      setHasPermission(status === 'granted')
    })()
  }, [])

  const handleCapture = async () => {
    // TODO: Implement photo capture
    router.push('/logMeal/portion')
  }

  if (hasPermission === null) {
    return (
      <YStack f={1} ai="center" jc="center">
        <Text>Requesting camera permission...</Text>
      </YStack>
    )
  }

  if (hasPermission === false) {
    return (
      <YStack f={1} ai="center" jc="center">
        <Text>No access to camera</Text>
      </YStack>
    )
  }

  return (
    <YStack f={1}>
      <Camera style={{ flex: 1 }} type={Camera.Constants.Type.back}>
        <YStack f={1} ai="center" jc="flex-end" pb="$4">
          <Button
            size="$6"
            circular
            theme="active"
            onPress={handleCapture}
          >
            Capture
          </Button>
        </YStack>
      </Camera>
    </YStack>
  )
} 