import { Stack } from 'expo-router'

export default function WorkoutLayout() {
  return (
    <Stack>
      <Stack.Screen 
        name="session" 
        options={{ 
          title: 'Workout Session',
          headerShown: true 
        }} 
      />
      <Stack.Screen 
        name="summary" 
        options={{ 
          title: 'Session Summary',
          headerShown: true 
        }} 
      />
    </Stack>
  )
} 