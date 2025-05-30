import { YStack, H1, Text, Button, XStack } from 'tamagui'

export default function ProfileScreen() {
  return (
    <YStack f={1} p="$4" space="$4">
      <H1>Profile</H1>
      
      <YStack space="$4">
        <XStack space="$2" ai="center">
          <Text>Goal:</Text>
          <Text>Cut</Text>
        </XStack>
        
        <XStack space="$2" ai="center">
          <Text>Units:</Text>
          <Text>Metric</Text>
        </XStack>
        
        <Button
          size="$5"
          theme="active"
          onPress={() => {
            // TODO: Handle logout
          }}
        >
          Logout
        </Button>
      </YStack>
    </YStack>
  )
} 