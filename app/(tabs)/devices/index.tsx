import { View, StyleSheet, ScrollView, Image, RefreshControl } from 'react-native';
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
  Spinner,
} from '@gluestack-ui/themed';
import { Search, Plus, BatteryMedium, SignalMedium, ThermometerSun, CircleAlert as AlertCircle } from 'lucide-react-native';
import { useDevices } from '@/contexts/devices';
import { useState } from 'react';

export default function DevicesScreen() {
  const { devices, loading, error, refreshDevices } = useDevices();
  const [searchQuery, setSearchQuery] = useState('');
  const [refreshing, setRefreshing] = useState(false);

  const filteredDevices = devices.filter(
    (device) =>
      device.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      device.serial_number.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const onRefresh = async () => {
    setRefreshing(true);
    await refreshDevices();
    setRefreshing(false);
  };

  return (
    <View style={styles.container}>
      <Box p="$4" bg="$white">
        <VStack space="md">
          <Heading size="xl" fontFamily="Montserrat-Bold">
            My Devices
          </Heading>
          <HStack space="md">
            <Input flex={1} variant="outline" size="md">
              <InputField
                placeholder="Search devices..."
                value={searchQuery}
                onChangeText={setSearchQuery}
                backgroundColor="$gray50"
                borderColor="$gray200"
              />
            </Input>
            <Button
              variant="solid"
              bg="$primary500"
              rounded="$lg"
              p="$3"
              onPress={() => router.push('/devices/register')}>
              <Plus color="white" size={24} />
            </Button>
          </HStack>
        </VStack>
      </Box>

      {loading && !refreshing ? (
        <View style={styles.centered}>
          <Spinner size="large" />
        </View>
      ) : error ? (
        <View style={styles.centered}>
          <HStack space="sm" alignItems="center">
            <AlertCircle color="#EF4444" size={24} />
            <Text color="$error700">{error}</Text>
          </HStack>
        </View>
      ) : (
        <ScrollView
          style={styles.content}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }>
          <VStack space="md" p="$4">
            {filteredDevices.length === 0 ? (
              <Box
                bg="$white"
                p="$4"
                rounded="$lg"
                borderWidth={1}
                borderColor="$gray200">
                <VStack space="md" alignItems="center">
                  <Text color="$gray500" textAlign="center">
                    {searchQuery
                      ? 'No devices match your search'
                      : 'No devices registered yet'}
                  </Text>
                  {!searchQuery && (
                    <Button
                      variant="outline"
                      action="primary"
                      onPress={() => router.push('/devices/register')}>
                      <Button.Text>Register Your First Device</Button.Text>
                    </Button>
                  )}
                </VStack>
              </Box>
            ) : (
              filteredDevices.map((device) => (
                <Box
                  key={device.id}
                  bg="$white"
                  p="$4"
                  rounded="$lg"
                  borderWidth={1}
                  borderColor="$gray200"
                  onTouchEnd={() => router.push(`/devices/${device.id}`)}>
                  <HStack space="md">
                    <Image
                      source={{
                        uri: 'https://images.unsplash.com/photo-1586683086816-c67d6f83ab3c?w=800',
                      }}
                      style={styles.deviceImage}
                    />
                    <VStack flex={1} space="xs">
                      <Heading size="sm" fontFamily="Montserrat-Bold">
                        {device.name}
                      </Heading>
                      <Text color="$gray500" fontFamily="Roboto-Regular">
                        Last updated:{' '}
                        {new Date(device.last_update).toLocaleString()}
                      </Text>
                      <HStack space="xl" mt="$2">
                        <HStack space="xs" alignItems="center">
                          <BatteryMedium
                            size={16}
                            color={
                              device.battery_level > 20 ? '#3A7A10' : '#EF4444'
                            }
                          />
                          <Text
                            fontFamily="Roboto-Bold"
                            color={
                              device.battery_level > 20
                                ? '$success500'
                                : '$error500'
                            }>
                            {device.battery_level}%
                          </Text>
                        </HStack>
                        <HStack space="xs" alignItems="center">
                          <SignalMedium size={16} color="#3A70B1" />
                          <Text fontFamily="Roboto-Bold" color="$primary500">
                            {device.signal_strength}
                          </Text>
                        </HStack>
                        {device.temperature && (
                          <HStack space="xs" alignItems="center">
                            <ThermometerSun size={16} color="#D4AF37" />
                            <Text
                              fontFamily="Roboto-Bold"
                              color="$secondary500">
                              {device.temperature}°F
                            </Text>
                          </HStack>
                        )}
                      </HStack>
                    </VStack>
                  </HStack>
                </Box>
              ))
            )}
          </VStack>
        </ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  content: {
    flex: 1,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  deviceImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
  },
});