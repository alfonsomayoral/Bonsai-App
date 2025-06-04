import { useState } from 'react';
import { YStack, Card, Button, Text, H3, H5 } from 'tamagui';
import { router, useLocalSearchParams } from 'expo-router';

const goalTypes = ['cut', 'maintain', 'bulk'];

export default function GoalTypeScreen() {
  const [selectedGoal, setSelectedGoal] = useState<string | null>(null);

  const handleSelectGoal = (goal: string) => {
    setSelectedGoal(goal);
  };

  const handleContinue = () => {
    if (selectedGoal) {
      router.push({
        pathname: '/onboarding/unit_system',
        params: { goal: selectedGoal }
      });
    } else {
      // Optionally show an error message or highlight the selection area
      console.log('Please select a goal type.');
    }
  };

  return (
    <YStack flex={1} justifyContent="center" alignItems="center" backgroundColor="$background" padding="$4">
      <Card width="$20" padding="$4" backgroundColor="$backgroundStrong">
        <YStack space="$3">
          <H3 textAlign="center" color="$color">¿Cuál es tu objetivo?</H3>
          <H5 textAlign="center" color="$colorPress">Selecciona una opción</H5>

          <YStack space="$2">
            {goalTypes.map((goal) => (
              <Button
                key={goal}
                onPress={() => handleSelectGoal(goal)}
                theme={selectedGoal === goal ? 'green' : 'dark'}
              >
                <Text color="$color">{goal.charAt(0).toUpperCase() + goal.slice(1)}</Text>
              </Button>
            ))}
          </YStack>

          <Button onPress={handleContinue} disabled={!selectedGoal} theme="green">
            Continuar
          </Button>
        </YStack>
      </Card>
    </YStack>
  );
}