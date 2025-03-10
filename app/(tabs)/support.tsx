import { View, StyleSheet, ScrollView } from 'react-native';
import { Box, Text, VStack, HStack, Heading, Button, Badge } from '@gluestack-ui/themed';
import { MessageSquarePlus, Clock, CircleCheck as CheckCircle2, CircleAlert as AlertCircle } from 'lucide-react-native';

export default function SupportScreen() {
  return (
    <View style={styles.container}>
      <Box p="$4" bg="$white">
        <VStack space="md">
          <Heading size="xl" fontFamily="Montserrat-Bold">
            Support
          </Heading>
          <Button
            variant="solid"
            bg="$primary500"
            rounded="$lg"
            onPress={() => {}}
            startIcon={<MessageSquarePlus color="white" size={20} />}>
            <Button.Text>New Support Ticket</Button.Text>
          </Button>
        </VStack>
      </Box>

      <ScrollView style={styles.content}>
        <VStack space="md" p="$4">
          <Heading size="sm" color="$gray500" mb="$2" fontFamily="Montserrat-Bold">
            Recent Tickets
          </Heading>

          {[
            { id: 1, status: 'open', title: 'Device connectivity issue' },
            { id: 2, status: 'resolved', title: 'Battery replacement inquiry' },
            { id: 3, status: 'in_progress', title: 'Software update help' },
          ].map((ticket) => (
            <Box
              key={ticket.id}
              bg="$white"
              p="$4"
              rounded="$lg"
              borderWidth={1}
              borderColor="$gray200">
              <VStack space="sm">
                <HStack justifyContent="space-between" alignItems="center">
                  <Badge
                    variant="solid"
                    bg={
                      ticket.status === 'open'
                        ? '$warning100'
                        : ticket.status === 'resolved'
                        ? '$success100'
                        : '$primary100'
                    }
                    borderRadius="$full"
                    px="$3">
                    <Badge.Text
                      color={
                        ticket.status === 'open'
                          ? '$warning800'
                          : ticket.status === 'resolved'
                          ? '$success800'
                          : '$primary800'
                      }>
                      {ticket.status.charAt(0).toUpperCase() + ticket.status.slice(1)}
                    </Badge.Text>
                  </Badge>
                  <Text fontSize="$sm" color="$gray500" fontFamily="Roboto-Regular">
                    Ticket #{ticket.id}
                  </Text>
                </HStack>

                <Heading size="sm" fontFamily="Montserrat-Bold">
                  {ticket.title}
                </Heading>

                <HStack space="md" mt="$2">
                  <HStack space="xs" alignItems="center">
                    <Clock size={16} color="#4F4F4F" />
                    <Text fontSize="$sm" color="$gray500" fontFamily="Roboto-Regular">
                      2 days ago
                    </Text>
                  </HStack>
                  <HStack space="xs" alignItems="center">
                    {ticket.status === 'resolved' ? (
                      <CheckCircle2 size={16} color="#3A7A10" />
                    ) : (
                      <AlertCircle size={16} color="#D4AF37" />
                    )}
                    <Text
                      fontSize="$sm"
                      color={ticket.status === 'resolved' ? '$success700' : '$warning700'}
                      fontFamily="Roboto-Regular">
                      {ticket.status === 'resolved' ? 'Resolved' : '1 new message'}
                    </Text>
                  </HStack>
                </HStack>
              </VStack>
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
});