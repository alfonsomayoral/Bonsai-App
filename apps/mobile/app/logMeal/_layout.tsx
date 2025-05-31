import { Stack } from 'expo-router'

export default function LogMealLayout() {
  return (
    <Stack>
      <Stack.Screen 
        name="capture" 
        options={{ 
          title: 'Take Photo',
          headerShown: true 
        }} 
      />
      <Stack.Screen 
        name="portion" 
        options={{ 
          title: 'Adjust Portion',
          headerShown: true 
        }} 
      />
    </Stack>
  )
} 