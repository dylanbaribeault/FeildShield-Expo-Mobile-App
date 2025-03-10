import { useState } from 'react';
import { View, StyleSheet, ScrollView, Image } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import {
  Box,
  Text,
  VStack,
  HStack,
  Heading,
  Button,
  Input,
  InputField,
  AlertCircle,
  Progress,
} from '@gluestack-ui/themed';
import { BatteryMedium, SignalMedium, ThermometerSun, ArrowLeft, CreditCard as Edit2, Save, X } from 'lucide-react-native';
import { useDevices } from '@/contexts/devices';
import type { Device } from '@/lib/supabase';

export default function DeviceDetailsScreen() {
  const { id } = useLocalSearchParams();
  const { devices, updateDevice } = useDevices();
  const device = devices.find((d) => d.id === id) as Device;
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(device?.name || '');
  const [error, setError] = useState<string | null>(null);

  if (!device) {
    return (
      <View style={styles.container}>
        <Text>Device not found</Text>
      </View>
    );
  }

  const handleSave = async () => {
    try {
      setError(null);
      await updateDevice(device.id, { name });
      setIsEditing(false);
    } catch (err) {
      setError('Failed to update device name');
    }
  };

  return (
    <ScrollView style={styles.container}>
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
            Device Details
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
            <HStack justifyContent="space-between" alignItems="center" mb="$4">
              {isEditing ? (
                <Input flex={1} variant="outline" size="md">
                  <InputField
                    value={name}
                    onChangeText={setName}
                    placeholder="Device name"
                    backgroundColor="$gray50"
                  />
                </Input>
              ) : (
                <Heading size="lg" fontFamily="Montserrat-Bold">
                  {device.name}
                </Heading>
              )}
              <HStack space="sm">
                {isEditing ? (
                  <>
                    <Button
                      variant="outline"
                      action="secondary"
                      onPress={() => setIsEditing(false)}
                      p="$3">
                      <X color="#4F4F4F" size={20} />
                    </Button>
                    <Button variant="solid" onPress={handleSave} p="$3">
                      <Save color="white" size={20} />
                    </Button>
                  </>
                ) : (
                  <Button
                    variant="outline"
                    action="secondary"
                    onPress={() => setIsEditing(true)}
                    p="$3">
                    <Edit2 color="#4F4F4F" size={20} />
                  </Button>
                )}
              </HStack>
            </HStack>

            <Text color="$gray500" mb="$4">
              Serial Number: {device.serial_number}
            </Text>

            <VStack space="lg">
              <VStack space="xs">
                <HStack justifyContent="space-between" alignItems="center">
                  <HStack space="sm" alignItems="center">
                    <BatteryMedium
                      size={20}
                      color={device.battery_level > 20 ? '#3A7A10' : '#EF4444'}
                    />
                    <Text>Battery Level</Text>
                  </HStack>
                  <Text
                    fontFamily="Roboto-Bold"
                    color={device.battery_level > 20 ? '$success700' : '$error700'}>
                    {device.battery_level}%
                  </Text>
                </HStack>
                <Progress
                  value={device.battery_level}
                  size="sm"
                  bg="$gray200">
                  <Progress.FilledTrack
                    bg={device.battery_level > 20 ? '$success500' : '$error500'}
                  />
                </Progress>
              </VStack>

              <VStack space="xs">
                <HStack justifyContent="space-between" alignItems="center">
                  <HStack space="sm" alignItems="center">
                    <SignalMedium size={20} color="#3A70B1" />
                    <Text>Signal Strength</Text>
                  </HStack>
                  <Text fontFamily="Roboto-Bold" color="$primary700">
                    {device.signal_strength}
                  </Text>
                </HStack>
                <Progress
                  value={
                    device.signal_strength === 'excellent'
                      ? 100
                      : device.signal_strength === 'good'
                      ? 75
                      : device.signal_strength === 'fair'
                      ? 50
                      : 25
                  }
                  size="sm"
                  bg="$gray200">
                  <Progress.FilledTrack bg="$primary500" />
                </Progress>
              </VStack>

              {device.temperature && (
                <HStack justifyContent="space-between" alignItems="center">
                  <HStack space="sm" alignItems="center">
                    <ThermometerSun size={20} color="#D4AF37" />
                    <Text>Temperature</Text>
                  </HStack>
                  <Text fontFamily="Roboto-Bold" color="$secondary700">
                    {device.temperature}°F
                  </Text>
                </HStack>
              )}
            </VStack>
          </Box>

          <Box bg="$white" p="$4" rounded="$xl" borderWidth={1} borderColor="$gray200">
            <Heading size="md" mb="$4" fontFamily="Montserrat-Bold">
              Device Status
            </Heading>
            <VStack space="md">
              <HStack justifyContent="space-between">
                <Text color="$gray500">Status</Text>
                <Text
                  fontFamily="Roboto-Bold"
                  color={
                    device.status === 'active'
                      ? '$success700'
                      : device.status === 'maintenance'
                      ? '$warning700'
                      : '$error700'
                  }>
                  {device.status.charAt(0).toUpperCase() + device.status.slice(1)}
                </Text>
              </HStack>
              <HStack justifyContent="space-between">
                <Text color="$gray500">Last Update</Text>
                <Text fontFamily="Roboto-Regular">
                  {new Date(device.last_update).toLocaleString()}
                </Text>
              </HStack>
            </VStack>
          </Box>
        </VStack>
      </Box>
    </ScrollView>
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