import { View, StyleSheet, ScrollView, Dimensions } from 'react-native';
import {
  Box,
  Text,
  VStack,
  HStack,
  Heading,
  Progress,
  Button,
  Spinner,
} from '@gluestack-ui/themed';
import {
  TriangleAlert as AlertTriangle,
  Battery,
  Wifi,
  Activity,
  ChevronRight,
} from 'lucide-react-native';
import {
  VictoryChart,
  VictoryLine,
  VictoryAxis,
  VictoryTheme,
  VictoryTooltip,
  VictoryVoronoiContainer,
  VictoryScatter,
  VictoryArea,
} from 'victory-native';
import { useDevices } from '@/contexts/devices';
import { useState, useEffect } from 'react';

const { width } = Dimensions.get('window');

const CHART_PADDING = { top: 20, bottom: 30, left: 40, right: 20 };

export default function HomeScreen() {
  const { devices, loading } = useDevices();
  const [batteryData, setBatteryData] = useState<{ x: Date; y: number }[]>([]);
  const [temperatureData, setTemperatureData] = useState<{ x: Date; y: number }[]>([]);

  // Simulate real-time data updates
  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      setBatteryData((prev) => {
        const newData = [...prev];
        if (newData.length > 12) newData.shift();
        return [
          ...newData,
          {
            x: now,
            y: Math.floor(Math.random() * 20) + 80, // Random value between 80-100
          },
        ];
      });

      setTemperatureData((prev) => {
        const newData = [...prev];
        if (newData.length > 12) newData.shift();
        return [
          ...newData,
          {
            x: now,
            y: Math.floor(Math.random() * 10) + 65, // Random value between 65-75
          },
        ];
      });
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const averageBatteryLevel =
    devices.reduce((sum, device) => sum + device.battery_level, 0) /
      devices.length || 0;

  const activeDevices = devices.filter(
    (device) => device.status === 'active'
  ).length;

  return (
    <ScrollView style={styles.container}>
      <Box p="$4" bg="$primary500">
        <VStack space="md">
          <HStack justifyContent="space-between" alignItems="center">
            <VStack>
              <Text color="$white" fontSize="$lg" fontFamily="Montserrat-Regular">
                Welcome back,
              </Text>
              <Heading color="$white" size="xl" fontFamily="Montserrat-Bold">
                John Farmer
              </Heading>
            </VStack>
            <Box bg="$white" p="$2" rounded="$full">
              <AlertTriangle color="#D4AF37" size={24} />
            </Box>
          </HStack>
        </VStack>
      </Box>

      <VStack space="lg" p="$4">
        {loading ? (
          <Box
            bg="$white"
            p="$4"
            rounded="$lg"
            borderWidth={1}
            borderColor="$gray200"
            alignItems="center">
            <Spinner size="large" />
          </Box>
        ) : (
          <>
            <Box
              bg="$white"
              p="$4"
              rounded="$lg"
              borderWidth={1}
              borderColor="$gray200">
              <HStack justifyContent="space-between" alignItems="center" mb="$4">
                <Heading size="md" fontFamily="Montserrat-Bold">
                  System Overview
                </Heading>
                <Text color="$primary500" fontFamily="Roboto-Bold">
                  {activeDevices} of {devices.length} Active
                </Text>
              </HStack>
              <VStack space="md">
                <HStack justifyContent="space-between" alignItems="center">
                  <HStack space="sm" alignItems="center">
                    <Battery
                      color={averageBatteryLevel > 20 ? '#3A7A10' : '#EF4444'}
                      size={24}
                    />
                    <Text fontFamily="Roboto-Regular">Average Battery</Text>
                  </HStack>
                  <Text
                    color={
                      averageBatteryLevel > 20 ? '$success500' : '$error500'
                    }
                    fontFamily="Roboto-Bold">
                    {Math.round(averageBatteryLevel)}%
                  </Text>
                </HStack>
                <Progress
                  value={averageBatteryLevel}
                  size="sm"
                  bg="$gray200">
                  <Progress.FilledTrack
                    bg={averageBatteryLevel > 20 ? '$success500' : '$error500'}
                  />
                </Progress>

                <HStack justifyContent="space-between" alignItems="center" mt="$2">
                  <HStack space="sm" alignItems="center">
                    <Wifi color="#3A70B1" size={24} />
                    <Text fontFamily="Roboto-Regular">Network Status</Text>
                  </HStack>
                  <Text color="$primary500" fontFamily="Roboto-Bold">
                    Good
                  </Text>
                </HStack>
                <Progress value={75} size="sm" bg="$gray200">
                  <Progress.FilledTrack bg="$primary500" />
                </Progress>
              </VStack>
            </Box>

            <Box
              bg="$white"
              p="$4"
              rounded="$lg"
              borderWidth={1}
              borderColor="$gray200">
              <HStack
                justifyContent="space-between"
                alignItems="center"
                mb="$4">
                <Heading size="md" fontFamily="Montserrat-Bold">
                  Battery Trends
                </Heading>
                <Button variant="link" p="$0">
                  <HStack space="xs" alignItems="center">
                    <Text color="$primary500">View Details</Text>
                    <ChevronRight size={16} color="#3A7A10" />
                  </HStack>
                </Button>
              </HStack>
              <VictoryChart
                theme={VictoryTheme.material}
                padding={CHART_PADDING}
                width={width - 48}
                height={200}
                containerComponent={<VictoryVoronoiContainer />}>
                <VictoryArea
                  style={{
                    data: {
                      fill: 'rgba(58, 122, 16, 0.1)',
                      stroke: '#3A7A10',
                      strokeWidth: 2,
                    },
                  }}
                  data={batteryData}
                />
                <VictoryScatter
                  data={batteryData}
                  size={4}
                  style={{ data: { fill: '#3A7A10' } }}
                  labels={({ datum }) => `${Math.round(datum.y)}%`}
                  labelComponent={
                    <VictoryTooltip
                      style={{ fontSize: 12 }}
                      flyoutStyle={{
                        stroke: '#3A7A10',
                        fill: 'white',
                      }}
                    />
                  }
                />
                <VictoryAxis
                  dependentAxis
                  tickFormat={(t) => `${t}%`}
                  style={{
                    axis: { stroke: '#E0E0E0' },
                    tickLabels: { fontSize: 10, padding: 5 },
                    grid: { stroke: '#E0E0E0', strokeDasharray: '5,5' },
                  }}
                />
                <VictoryAxis
                  tickFormat={(t) =>
                    new Date(t).toLocaleTimeString([], {
                      hour: '2-digit',
                      minute: '2-digit',
                    })
                  }
                  style={{
                    axis: { stroke: '#E0E0E0' },
                    tickLabels: { fontSize: 10, angle: -45, padding: 15 },
                  }}
                />
              </VictoryChart>
            </Box>

            <Box
              bg="$white"
              p="$4"
              rounded="$lg"
              borderWidth={1}
              borderColor="$gray200">
              <HStack
                justifyContent="space-between"
                alignItems="center"
                mb="$4">
                <Heading size="md" fontFamily="Montserrat-Bold">
                  Temperature Readings
                </Heading>
                <Button variant="link" p="$0">
                  <HStack space="xs" alignItems="center">
                    <Text color="$primary500">View Details</Text>
                    <ChevronRight size={16} color="#3A7A10" />
                  </HStack>
                </Button>
              </HStack>
              <VictoryChart
                theme={VictoryTheme.material}
                padding={CHART_PADDING}
                width={width - 48}
                height={200}
                containerComponent={<VictoryVoronoiContainer />}>
                <VictoryLine
                  style={{
                    data: { stroke: '#D4AF37', strokeWidth: 2 },
                  }}
                  data={temperatureData}
                />
                <VictoryScatter
                  data={temperatureData}
                  size={4}
                  style={{ data: { fill: '#D4AF37' } }}
                  labels={({ datum }) => `${Math.round(datum.y)}°F`}
                  labelComponent={
                    <VictoryTooltip
                      style={{ fontSize: 12 }}
                      flyoutStyle={{
                        stroke: '#D4AF37',
                        fill: 'white',
                      }}
                    />
                  }
                />
                <VictoryAxis
                  dependentAxis
                  tickFormat={(t) => `${t}°F`}
                  style={{
                    axis: { stroke: '#E0E0E0' },
                    tickLabels: { fontSize: 10, padding: 5 },
                    grid: { stroke: '#E0E0E0', strokeDasharray: '5,5' },
                  }}
                />
                <VictoryAxis
                  tickFormat={(t) =>
                    new Date(t).toLocaleTimeString([], {
                      hour: '2-digit',
                      minute: '2-digit',
                    })
                  }
                  style={{
                    axis: { stroke: '#E0E0E0' },
                    tickLabels: { fontSize: 10, angle: -45, padding: 15 },
                  }}
                />
              </VictoryChart>
            </Box>

            <Box
              bg="$white"
              p="$4"
              rounded="$lg"
              borderWidth={1}
              borderColor="$gray200">
              <HStack
                justifyContent="space-between"
                alignItems="center"
                mb="$4">
                <Heading size="md" fontFamily="Montserrat-Bold">
                  Recent Activity
                </Heading>
                <Button variant="link" p="$0">
                  <Button.Text color="$primary500">View All</Button.Text>
                </Button>
              </HStack>
              <VStack space="md">
                {[1, 2, 3].map((item) => (
                  <HStack
                    key={item}
                    space="md"
                    p="$3"
                    bg="$gray50"
                    rounded="$md">
                    <Activity color="#4F4F4F" size={20} />
                    <VStack flex={1}>
                      <Text fontFamily="Roboto-Bold">Motion Detected</Text>
                      <Text
                        fontSize="$sm"
                        color="$gray500"
                        fontFamily="Roboto-Regular">
                        Device #A1B2C3 • 2 hours ago
                      </Text>
                    </VStack>
                  </HStack>
                ))}
              </VStack>
            </Box>
          </>
        )}
      </VStack>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
});