import { useState } from 'react';
import { YStack, Card, Input, Button, Text, H3, H5 } from 'tamagui';
import { supabase } from '../../lib/supabase';
import { Link, router } from 'expo-router';

export default function RegisterScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleRegister = async () => {
    setLoading(true);
    setError(null);
    const { data, error: authError } = await supabase.auth.signUp({
      email,
      password,
    });

    if (authError) {
      setError(authError.message);
      console.error(authError);
    } else if (data.user) {
        // User created in Auth, now navigate to onboarding for profile details
        router.push('/onboarding/goal_type');
    } else {
        // Should not happen if data.user is null but no error
        setError('An unexpected error occurred during registration.');
    }
    setLoading(false);
  };

  return (
    <YStack flex={1} justifyContent="center" alignItems="center" backgroundColor="$background" padding="$4">
      <Card width="$20" padding="$4" backgroundColor="$backgroundStrong">
        <YStack space="$3">
          <H3 textAlign="center" color="$color">Crear Cuenta</H3>
          <H5 textAlign="center" color="$colorPress">Regístrate para empezar</H5>

          <Input
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            theme="dark"
          />
          <Input
            placeholder="Contraseña"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            theme="dark"
          />

          {error && <Text color="red">{error}</Text>}

          <Button onPress={handleRegister} disabled={loading} theme="green">
            {loading ? 'Registrando...' : 'Registrarse'}
          </Button>

          <Link href="/onboarding/login" asChild>
            <Button variant="outlined" theme="green">
              ¿Ya tienes cuenta? Inicia Sesión
            </Button>
          </Link>
        </YStack>
      </Card>
    </YStack>
  );
}