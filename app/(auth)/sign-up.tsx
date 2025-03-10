import { useState } from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { Button, Text, Input, VStack, FormControl, HStack, AlertCircle } from '@gluestack-ui/themed';
import { Link, router } from 'expo-router';
import { useAuth } from '@/contexts/auth';

export default function SignUp() {
  const { signUp } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSignUp = async () => {
    try {
      setError('');
      
      if (password !== confirmPassword) {
        setError('Passwords do not match');
        return;
      }

      if (password.length < 6) {
        setError('Password must be at least 6 characters');
        return;
      }

      setLoading(true);
      await signUp(email, password);
      router.replace('/(tabs)');
    } catch (err) {
      setError('Failed to create account. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Image
        source={{ uri: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1200' }}
        style={styles.backgroundImage}
      />
      <View style={styles.overlay} />
      
      <VStack space="md" width="100%" maxWidth={400} style={styles.content}>
        <Text variant="heading" size="2xl" color="white">
          Join Field Shield
        </Text>
        <Text variant="body" color="gray.200" mb="$4">
          Create your account to get started
        </Text>

        {error && (
          <View style={styles.errorContainer}>
            <AlertCircle color="$red500" />
            <Text color="$red500" ml="$2">{error}</Text>
          </View>
        )}

        <FormControl>
          <FormControl.Label><Text color="white">Email</Text></FormControl.Label>
          <Input
            type="text"
            value={email}
            onChangeText={setEmail}
            placeholder="Enter your email"
            keyboardType="email-address"
            autoCapitalize="none"
            backgroundColor="rgba(255, 255, 255, 0.9)"
          />
        </FormControl>

        <FormControl>
          <FormControl.Label><Text color="white">Password</Text></FormControl.Label>
          <Input
            type="password"
            value={password}
            onChangeText={setPassword}
            placeholder="Create a password"
            secureTextEntry
            backgroundColor="rgba(255, 255, 255, 0.9)"
          />
        </FormControl>

        <FormControl>
          <FormControl.Label><Text color="white">Confirm Password</Text></FormControl.Label>
          <Input
            type="password"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            placeholder="Confirm your password"
            secureTextEntry
            backgroundColor="rgba(255, 255, 255, 0.9)"
          />
        </FormControl>

        <Button
          variant="solid"
          backgroundColor="secondary.500"
          onPress={handleSignUp}
          isDisabled={loading}
          mt="$4">
          <Button.Text>{loading ? 'Creating Account...' : 'Create Account'}</Button.Text>
        </Button>

        <HStack space="sm" justifyContent="center" mt="$4">
          <Text color="white">Already have an account?</Text>
          <Link href="/sign-in" asChild>
            <Button variant="link" p="$0">
              <Button.Text color="secondary.500">Sign In</Button.Text>
            </Button>
          </Link>
        </HStack>
      </VStack>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  backgroundImage: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  overlay: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
  },
  content: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
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