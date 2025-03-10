import { View, StyleSheet, ScrollView, Image } from 'react-native';
import { Box, Text, VStack, HStack, Heading, Button, Divider } from '@gluestack-ui/themed';
import { User, Settings, Bell, Shield, CircleHelp as HelpCircle, LogOut, ChevronRight } from 'lucide-react-native';
import { useAuth } from '@/contexts/auth';
import { router } from 'expo-router';

export default function ProfileScreen() {
  const { signOut } = useAuth();

  const handleSignOut = async () => {
    try {
      await signOut();
      router.replace('/sign-in');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Box bg="$primary500" p="$6" pb="$12">
        <VStack space="md" alignItems="center">
          <Image
            source={{ uri: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400' }}
            style={styles.avatar}
          />
          <VStack alignItems="center">
            <Heading color="$white" size="xl" fontFamily="Montserrat-Bold">
              John Farmer
            </Heading>
            <Text color="$gray100" fontFamily="Roboto-Regular">
              john.farmer@example.com
            </Text>
          </VStack>
        </VStack>
      </Box>

      <Box
        bg="$white"
        mx="$4"
        mt="-$8"
        p="$4"
        rounded="$xl"
        borderWidth={1}
        borderColor="$gray200">
        <VStack space="lg">
          <Button
            variant="outline"
            action="secondary"
            borderColor="$gray200"
            onPress={() => {}}
            style={styles.menuButton}>
            <HStack space="md" flex={1} alignItems="center">
              <User size={20} color="#4F4F4F" />
              <Text flex={1} fontFamily="Roboto-Regular">
                Edit Profile
              </Text>
              <ChevronRight size={20} color="#4F4F4F" />
            </HStack>
          </Button>

          <Button
            variant="outline"
            action="secondary"
            borderColor="$gray200"
            onPress={() => {}}
            style={styles.menuButton}>
            <HStack space="md" flex={1} alignItems="center">
              <Settings size={20} color="#4F4F4F" />
              <Text flex={1} fontFamily="Roboto-Regular">
                Settings
              </Text>
              <ChevronRight size={20} color="#4F4F4F" />
            </HStack>
          </Button>

          <Button
            variant="outline"
            action="secondary"
            borderColor="$gray200"
            onPress={() => {}}
            style={styles.menuButton}>
            <HStack space="md" flex={1} alignItems="center">
              <Bell size={20} color="#4F4F4F" />
              <Text flex={1} fontFamily="Roboto-Regular">
                Notifications
              </Text>
              <ChevronRight size={20} color="#4F4F4F" />
            </HStack>
          </Button>

          <Divider my="$2" />

          <Button
            variant="outline"
            action="secondary"
            borderColor="$gray200"
            onPress={() => {}}
            style={styles.menuButton}>
            <HStack space="md" flex={1} alignItems="center">
              <Shield size={20} color="#4F4F4F" />
              <Text flex={1} fontFamily="Roboto-Regular">
                Privacy & Security
              </Text>
              <ChevronRight size={20} color="#4F4F4F" />
            </HStack>
          </Button>

          <Button
            variant="outline"
            action="secondary"
            borderColor="$gray200"
            onPress={() => {}}
            style={styles.menuButton}>
            <HStack space="md" flex={1} alignItems="center">
              <HelpCircle size={20} color="#4F4F4F" />
              <Text flex={1} fontFamily="Roboto-Regular">
                Help & Support
              </Text>
              <ChevronRight size={20} color="#4F4F4F" />
            </HStack>
          </Button>

          <Button
            variant="outline"
            action="secondary"
            borderColor="$red500"
            onPress={handleSignOut}
            style={styles.menuButton}>
            <HStack space="md" flex={1} alignItems="center">
              <LogOut size={20} color="#EF4444" />
              <Text flex={1} color="$red500" fontFamily="Roboto-Regular">
                Sign Out
              </Text>
              <ChevronRight size={20} color="#EF4444" />
            </HStack>
          </Button>
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
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: 'white',
  },
  menuButton: {
    height: 50,
    justifyContent: 'center',
  },
});