import { YStack, Text, H2, Button } from 'tamagui'
import { router } from 'expo-router'

export default function WorkoutSummaryScreen() {
  const workoutData = {
    duration: '45 minutes',
    exercises: [
      {
        name: 'Bench Press',
        sets: [
          { weight: '60kg', reps: '12' },
          { weight: '65kg', reps: '10' },
          { weight: '70kg', reps: '8' }
        ]
      }
    ],
    totalVolume: '1,950 kg'
  }

  const handleDone = () => {
    router.push('/(tabs)')
  }

  return (
    <YStack f={1} p="$4" space="$4">
      <H2>Workout Summary</H2>
      
      <YStack space="$4">
        <Text>Duration: {workoutData.duration}</Text>
        <Text>Total Volume: {workoutData.totalVolume}</Text>
        
        <YStack space="$2">
          <Text fontWeight="bold">Exercises:</Text>
          {workoutData.exercises.map((exercise, index) => (
            <YStack key={index} space="$1" p="$2" borderWidth={1} borderRadius="$4">
              <Text fontWeight="bold">{exercise.name}</Text>
              {exercise.sets.map((set, setIndex) => (
                <Text key={setIndex}>
                  Set {setIndex + 1}: {set.weight} x {set.reps}
                </Text>
              ))}
            </YStack>
          ))}
        </YStack>
        
        <Button
          size="$5"
          theme="active"
          onPress={handleDone}
        >
          Done
        </Button>
      </YStack>
    </YStack>
  )
} 