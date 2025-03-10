import { useState } from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { router } from 'expo-router';
import {
  Box,
  Text,
  VStack,
  HStack,
  Heading,
  Button,
  Input,
  InputField,
  FormControl,
  AlertCircle,
} from '@gluestack-ui/themed';
import { ArrowLeft, QrCode, Save } from 'lucide-react-native';
import { useDevices } from '@/contexts/devices';

export default function RegisterDeviceScreen() {
  const { registerDevice } = useDevices();
  const [name, setName] = useState('');
  const [serialNumber, setSerialNumber] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleRegister = async () => {
    if (!name.trim() || !serialNumber.trim()) {
      setError('Please fill in all fields');
      return;
    }

    try {
      setError(null);
      setLoading(true);
      await registerDevice(name.trim(), serialNumber.trim());
      router.back();
    } catch (err) {
      setError('Failed to register device. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Box bg="$primary500" p="$4" pb="$6">
        <HStack space="md" alignItems="center" mb="$4">
          <Button
            variant="link"
            onPress={() => router.back()}
            p="$0"
            style={styles.backButton}>
            <ArrowLeft color="white" size={24} />
          </Button>
          <Heading color="$white" size="xl" fontFamily="Montserrat-Bold">
            Register Device
          </Heading>
        </HStack>
      </Box>

      <Box mx="$4" mt="-$4">
        <VStack space="md">
          {error && (
            <HStack
              space="sm"
              bg="$error100"
              p="$3"
              rounded="$md"
              alignItems="center">
              <AlertCircle color="#EF4444" size={20} />
              <Text color="$error700">{error}</Text>
            </HStack>
          )}

          <Box bg="$white" p="$4" rounded="$xl" borderWidth={1} borderColor="$gray200">
            <VStack space="md">
              <FormControl isRequired>
                <FormControl.Label>Device Name</FormControl.Label>
                <Input variant="outline" size="md">
                  <InputField
                    value={name}
                    onChangeText={setName}
                    placeholder="Enter device name"
                    backgroundColor="$gray50"
                  />
                </Input>
              </FormControl>

              <FormControl isRequired>
                <FormControl.Label>Serial Number</FormControl.Label>
                <Input variant="outline" size="md">
                  <InputField
                    value={serialNumber}
                    onChangeText={setSerialNumber}
                    placeholder="Enter serial number"
                    backgroundColor="$gray50"
                  />
                </Input>
              </FormControl>

              <Button
                variant="solid"
                bg="$primary500"
                onPress={handleRegister}
                isDisabled={loading}>
                <Button.Text>{loading ? 'Registering...' : 'Register Device'}</Button.Text>
              </Button>

              <Button
                variant="outline"
                action="secondary"
                onPress={() => {}}
                startIcon={<QrCode color="#4F4F4F" size={20} />}>
                <Button.Text>Scan QR Code</Button.Text>
              </Button>
            </VStack>
          </Box>

          <Box bg="$white" p="$4" rounded="$xl" borderWidth={1} borderColor="$gray200">
            <Heading size="sm" mb="$2" fontFamily="Montserrat-Bold">
              Need Help?
            </Heading>
            <Text color="$gray500">
              The serial number can be found on the back of your device or in the
              documentation that came with it.
            </Text>
          </Box>
        </VStack>
      </Box>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  backButton: {
    marginLeft: -8,
  },
});