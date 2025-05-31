import { useState } from 'react'
import { YStack } from 'tamagui'
import { Link } from 'expo-router'
import { Button, Card, Input, Text } from '../../components/ui'

export default function LoginScreen() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = async () => {
    // TODO: Implement login logic
    console.log('Login:', { email, password })
  }

  return (
    <YStack f={1} p="$4" space="$4" ai="center" jc="center">
      <Text size="4xl" weight="bold" color="primary">Welcome Back</Text>
      
      <Card variant="elevated" size="large" w="100%">
        <YStack space="$4" w="100%">
          <Input
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            keyboardType="email-address"
            size="large"
          />
          
          <Input
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            size="large"
          />
          
          <Button
            variant="primary"
            size="large"
            onPress={handleLogin}
          >
            <Text color="white" weight="semibold">Login</Text>
          </Button>
        </YStack>
      </Card>
      
      <Link href="/register" asChild>
        <Button variant="ghost" size="medium">
          <Text>Don't have an account? Register</Text>
        </Button>
      </Link>
    </YStack>
  )
} 