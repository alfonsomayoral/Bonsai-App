import { YStack, H1, Text, Button } from 'tamagui'

export default function WorkoutScreen() {
  return (
    <YStack f={1} p="$4" space="$4">
      <H1>Workouts</H1>
      <Text>Track your gym sessions</Text>
      
      <YStack space="$2">
        <Button
          size="$5"
          theme="active"
          onPress={() => {
            // TODO: Start new workout session
          }}
        >
          New Workout
        </Button>
        
        <Text>Recent Workouts</Text>
        {/* TODO: Add workout history list */}
      </YStack>
    </YStack>
  )
} 