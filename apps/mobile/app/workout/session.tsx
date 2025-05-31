import { useState } from 'react'
import { YStack, Button, Text, H2, Input, XStack, ScrollView } from 'tamagui'
import { router } from 'expo-router'

type Exercise = {
  id: string
  name: string
  sets: Array<{
    weight: string
    reps: string
  }>
}

export default function WorkoutSessionScreen() {
  const [exercises, setExercises] = useState<Exercise[]>([
    {
      id: '1',
      name: 'Bench Press',
      sets: [{ weight: '', reps: '' }]
    }
  ])

  const addSet = (exerciseId: string) => {
    setExercises(exercises.map(ex => 
      ex.id === exerciseId 
        ? { ...ex, sets: [...ex.sets, { weight: '', reps: '' }] }
        : ex
    ))
  }

  const updateSet = (exerciseId: string, setIndex: number, field: 'weight' | 'reps', value: string) => {
    setExercises(exercises.map(ex => 
      ex.id === exerciseId 
        ? {
            ...ex,
            sets: ex.sets.map((set, idx) => 
              idx === setIndex ? { ...set, [field]: value } : set
            )
          }
        : ex
    ))
  }

  const handleFinish = () => {
    // TODO: Save workout session
    router.push('/workout/summary')
  }

  return (
    <ScrollView>
      <YStack f={1} p="$4" space="$4">
        <H2>Current Workout</H2>
        
        {exercises.map(exercise => (
          <YStack key={exercise.id} space="$2" p="$2" borderWidth={1} borderRadius="$4">
            <Text fontWeight="bold">{exercise.name}</Text>
            
            {exercise.sets.map((set, index) => (
              <XStack key={index} space="$2" ai="center">
                <Text>Set {index + 1}:</Text>
                <Input
                  value={set.weight}
                  onChangeText={(value) => updateSet(exercise.id, index, 'weight', value)}
                  placeholder="Weight"
                  keyboardType="numeric"
                  w={80}
                />
                <Input
                  value={set.reps}
                  onChangeText={(value) => updateSet(exercise.id, index, 'reps', value)}
                  placeholder="Reps"
                  keyboardType="numeric"
                  w={80}
                />
              </XStack>
            ))}
            
            <Button
              size="$3"
              theme="active"
              onPress={() => addSet(exercise.id)}
            >
              Add Set
            </Button>
          </YStack>
        ))}
        
        <Button
          size="$5"
          theme="active"
          onPress={handleFinish}
        >
          Finish Workout
        </Button>
      </YStack>
    </ScrollView>
  )
} 