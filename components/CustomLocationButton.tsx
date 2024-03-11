import Colors from '@/constants/Colors';

import { LocateFixed } from '@tamagui/lucide-icons';
import { StyleSheet, TouchableOpacity } from 'react-native';

interface CustomLocationButtonProps {
  onPress: () => void;
}

const CustomLocationButton: React.FC<CustomLocationButtonProps> = ({
  onPress,
}) => (
  <TouchableOpacity
    style={styles.locationButton}
    onPress={onPress}
    activeOpacity={0.7}>
    <LocateFixed size={24} color="white" />
  </TouchableOpacity>
);

export default CustomLocationButton;

const styles = StyleSheet.create({
  locationButton: {
    position: 'absolute',
    bottom: 24,
    right: 24,
    backgroundColor: Colors.secondary,
    borderRadius: 50,
    width: 48,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
