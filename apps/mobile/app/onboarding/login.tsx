import { useState } from 'react';
import { YStack, Card, Input, Button, Text, H3, H5 } from 'tamagui';
import { supabase } from '../../lib/supabase';
import { Link } from 'expo-router';
import { useAuth } from '../../hooks/useAuth';


export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async () => {
    setLoading(true);
    setError(null);
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      setError(error.message);
      console.error(error);
    } else {
      // Redirect handled by _layout.tsx based on auth state
    }
    setLoading(false);
  };

  return (
    <YStack flex={1} justifyContent="center" alignItems="center" backgroundColor="$background" padding="$4">
      <Card width="$20" padding="$4" backgroundColor="$backgroundStrong">
        <YStack space="$3">
          <H3 textAlign="center" color="$color">Bienvenido</H3>
          <H5 textAlign="center" color="$colorPress">Inicia sesión para continuar</H5>

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

          <Button onPress={handleLogin} disabled={loading} theme="green">
            {loading ? 'Iniciando...' : 'Iniciar Sesión'}
          </Button>

          <Link href="/onboarding/register" asChild>
            <Button variant="outlined" theme="green">
              ¿No tienes cuenta? Regístrate
            </Button>
          </Link>
        </YStack>
      </Card>
    </YStack>
  );
}