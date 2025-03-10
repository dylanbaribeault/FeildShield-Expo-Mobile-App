import { View, StyleSheet, ScrollView, Image } from 'react-native';
import { Box, Text, VStack, HStack, Heading, Button, Input, InputField } from '@gluestack-ui/themed';
import { Search, Plus, BatteryMedium, SignalMedium, ThermometerSun } from 'lucide-react-native';

export default function DevicesScreen() {
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
                backgroundColor="$gray50"
                borderColor="$gray200"
              />
            </Input>
            <Button
              variant="solid"
              bg="$primary500"
              rounded="$lg"
              p="$3"
              onPress={() => {}}>
              <Plus color="white" size={24} />
            </Button>
          </HStack>
        </VStack>
      </Box>

      <ScrollView style={styles.content}>
        <VStack space="md" p="$4">
          {[1, 2, 3].map((device) => (
            <Box
              key={device}
              bg="$white"
              p="$4"
              rounded="$lg"
              borderWidth={1}
              borderColor="$gray200">
              <HStack space="md">
                <Image
                  source={{ uri: 'https://images.unsplash.com/photo-1586683086816-c67d6f83ab3c?w=800' }}
                  style={styles.deviceImage}
                />
                <VStack flex={1} space="xs">
                  <Heading size="sm" fontFamily="Montserrat-Bold">
                    Field Sensor #{device}
                  </Heading>
                  <Text color="$gray500" fontFamily="Roboto-Regular">
                    Last updated: 5 mins ago
                  </Text>
                  <HStack space="xl" mt="$2">
                    <HStack space="xs" alignItems="center">
                      <BatteryMedium size={16} color="#3A7A10" />
                      <Text fontFamily="Roboto-Bold" color="$success500">
                        95%
                      </Text>
                    </HStack>
                    <HStack space="xs" alignItems="center">
                      <SignalMedium size={16} color="#3A70B1" />
                      <Text fontFamily="Roboto-Bold" color="$primary500">
                        Good
                      </Text>
                    </HStack>
                    <HStack space="xs" alignItems="center">
                      <ThermometerSun size={16} color="#D4AF37" />
                      <Text fontFamily="Roboto-Bold" color="$secondary500">
                        72°F
                      </Text>
                    </HStack>
                  </HStack>
                </VStack>
              </HStack>
            </Box>
          ))}
        </VStack>
      </ScrollView>
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
  deviceImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
  },
});