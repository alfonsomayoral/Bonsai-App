import { View } from 'react-native'
import { Button, H1, Text, YStack } from 'tamagui'

export default function HomeScreen() {
  return (
    <YStack f={1} p="$4" space="$4">
      <H1>Welcome to Bonsai</H1>
      <Text>Track your meals and workouts</Text>
      
      <YStack space="$2">
        <Button
          size="$5"
          theme="active"
          onPress={() => {
            // TODO: Navigate to meal logging
          }}
        >
          Log Meal
        </Button>
        
        <Button
          size="$5"
          theme="active"
          onPress={() => {
            // TODO: Navigate to workout
          }}
        >
          Start Workout
        </Button>
      </YStack>
    </YStack>
  )
} 