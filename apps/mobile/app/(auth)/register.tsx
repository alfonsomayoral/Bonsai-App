import { useState } from 'react'
import { YStack } from 'tamagui'
import { Link } from 'expo-router'
import { Button, Card, Input, Text } from '../../components/ui'

export default function RegisterScreen() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [fullName, setFullName] = useState('')

  const handleRegister = async () => {
    // TODO: Implement registration logic
    console.log('Register:', { email, password, fullName })
  }

  return (
    <YStack f={1} p="$4" space="$4" ai="center" jc="center">
      <Text size="4xl" weight="bold" color="primary">Create Account</Text>
      
      <Card variant="elevated" size="large" w="100%">
        <YStack space="$4" w="100%">
          <Input
            placeholder="Full Name"
            value={fullName}
            onChangeText={setFullName}
            size="large"
          />
          
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
            onPress={handleRegister}
          >
            <Text color="white" weight="semibold">Register</Text>
          </Button>
        </YStack>
      </Card>
      
      <Link href="/login" asChild>
        <Button variant="ghost" size="medium">
          <Text>Already have an account? Login</Text>
        </Button>
      </Link>
    </YStack>
  )
} 