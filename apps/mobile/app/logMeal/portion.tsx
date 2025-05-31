import { useState } from 'react'
import { YStack, Button, Text, H2, Input, XStack } from 'tamagui'
import { router } from 'expo-router'

export default function PortionScreen() {
  const [portion, setPortion] = useState('1')
  const [foodName, setFoodName] = useState('Pasta with Tomato Sauce')
  const [macros, setMacros] = useState({
    calories: 450,
    protein: 15,
    carbs: 65,
    fat: 12
  })

  const handleSave = async () => {
    // TODO: Implement save logic
    router.back()
  }

  return (
    <YStack f={1} p="$4" space="$4">
      <H2>Adjust Portion</H2>
      
      <YStack space="$4">
        <Text>Detected Food: {foodName}</Text>
        
        <XStack space="$2" ai="center">
          <Text>Portion Size:</Text>
          <Input
            value={portion}
            onChangeText={setPortion}
            keyboardType="numeric"
            w={80}
          />
          <Text>servings</Text>
        </XStack>
        
        <YStack space="$2">
          <Text>Macros per serving:</Text>
          <Text>Calories: {macros.calories} kcal</Text>
          <Text>Protein: {macros.protein}g</Text>
          <Text>Carbs: {macros.carbs}g</Text>
          <Text>Fat: {macros.fat}g</Text>
        </YStack>
        
        <Button
          size="$5"
          theme="active"
          onPress={handleSave}
        >
          Save Meal
        </Button>
      </YStack>
    </YStack>
  )
} 