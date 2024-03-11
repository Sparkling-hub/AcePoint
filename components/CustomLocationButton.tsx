import Colors from '@/constants/Colors';
import { MaterialIcons } from '@expo/vector-icons';
import { LocateFixed } from '@tamagui/lucide-icons';
import { StyleSheet, TouchableOpacity } from 'react-native';

interface CustomLocationButtonProps {
  onPress: () => void;
}

const CustomLocationButton: React.FC<CustomLocationButtonProps> = ({
  onPress,
}) => (
  <TouchableOpacity style={styles.locationButton} onPress={onPress}>
    <LocateFixed size={24} color="white" />
  </TouchableOpacity>
);

export default CustomLocationButton;

const styles = StyleSheet.create({
  locationButton: {
    position: 'absolute',
    bottom: 16,
    right: 16,
    backgroundColor: Colors.secondary,
    borderRadius: 50,
    width: 44,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
