import { useState } from 'react';
import { YStack, Card, Button, Text, H3, H5 } from 'tamagui';
import { router, useLocalSearchParams } from 'expo-router';
import { supabase } from '../../lib/supabase'; // Adjust path if necessary

const unitSystems = ['metric', 'imperial'];

export default function UnitSystemScreen() {
  const [selectedUnit, setSelectedUnit] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const params = useLocalSearchParams();
  const goal = params.goal as string | undefined;

  const handleSelectUnit = (unit: string) => {
    setSelectedUnit(unit);
  };

  const handleFinishOnboarding = async () => {
    if (selectedUnit && goal) {
      setLoading(true);
      const { data: { user } } = await supabase.auth.getUser();

      if (user) {
        const { data, error } = await supabase
          .from('users')
          .update({
            unit_system: selectedUnit,
            goal_type: goal
          })
          .eq('id', user.id);

        if (error) {
          console.error('Error updating user profile:', error);
          // Optionally show error to user
        } else {
          console.log('User profile updated:', data);
          // Redirect to main app
          router.replace('/(tabs)'); // Use replace to prevent going back to onboarding
        }
      } else {
        console.error('User not logged in or session expired.');
        // Redirect to login or show error
        router.replace('/onboarding/login');
      }
      setLoading(false);
    } else {
      console.log('Please select a unit system.');
    }
  };

  // Redirect if goal is missing (shouldn't happen with proper flow)
  if (!goal) {
      console.error('Goal type missing in params.');
      // Redirect back to goal type selection or login
      router.replace('/onboarding/goal_type'); // Or '/onboarding/login'
      return null; // Prevent rendering
  }

  return (
    <YStack flex={1} justifyContent="center" alignItems="center" backgroundColor="$background" padding="$4">
      <Card width="$20" padding="$4" backgroundColor="$backgroundStrong">
        <YStack space="$3">
          <H3 textAlign="center" color="$color">Sistema de Unidades</H3>
          <H5 textAlign="center" color="$colorPress">Selecciona tu preferencia</H5>

          <YStack space="$2">
            {unitSystems.map((unit) => (
              <Button
                key={unit}
                onPress={() => handleSelectUnit(unit)}
                theme={selectedUnit === unit ? 'green' : 'dark'}
              >
                <Text color="$color">{unit.charAt(0).toUpperCase() + unit.slice(1)}</Text>
              </Button>
            ))}
          </YStack>

          <Button onPress={handleFinishOnboarding} disabled={!selectedUnit || loading} theme="green">
            {loading ? 'Guardando...' : 'Finalizar'}
          </Button>
        </YStack>
      </Card>
    </YStack>
  );
}