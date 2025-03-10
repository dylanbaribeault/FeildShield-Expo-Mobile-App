import { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, Text, Input, VStack, FormControl, AlertCircle } from '@gluestack-ui/themed';
import { Link, router } from 'expo-router';
import { useAuth } from '@/contexts/auth';

export default function SignIn() {
  const { signIn } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSignIn = async () => {
    try {
      setError('');
      setLoading(true);
      await signIn(email, password);
      router.replace('/(tabs)');
    } catch (err) {
      setError('Invalid email or password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <VStack space="md" width="100%" maxWidth={400}>
        <Text variant="heading" size="2xl" color="primary.500">
          Field Shield
        </Text>
        <Text variant="body" color="gray.500" mb="$4">
          Sign in to your account
        </Text>

        {error && (
          <View style={styles.errorContainer}>
            <AlertCircle color="$red500" />
            <Text color="$red500" ml="$2">{error}</Text>
          </View>
        )}

        <FormControl>
          <FormControl.Label>Email</FormControl.Label>
          <Input
            type="text"
            value={email}
            onChangeText={setEmail}
            placeholder="Enter your email"
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </FormControl>

        <FormControl>
          <FormControl.Label>Password</FormControl.Label>
          <Input
            type="password"
            value={password}
            onChangeText={setPassword}
            placeholder="Enter your password"
            secureTextEntry
          />
        </FormControl>

        <Button
          variant="solid"
          backgroundColor="primary.500"
          onPress={handleSignIn}
          isDisabled={loading}
          mt="$4">
          <Button.Text>{loading ? 'Signing in...' : 'Sign In'}</Button.Text>
        </Button>

        <Link href="/sign-up" asChild>
          <Button variant="link">
            <Button.Text>Don't have an account? Sign Up</Button.Text>
          </Button>
        </Link>
      </VStack>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  errorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FEE2E2',
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
  },
});