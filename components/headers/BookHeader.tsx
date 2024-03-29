import CustomHeader from '../CustomHeader';
import { TouchableOpacity } from 'react-native';

import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { setShowMaps } from '@/store/slices/showMapsSlice';
import { List, MapPinned } from '@tamagui/lucide-icons';
import Colors from '@/constants/Colors';
import { setShowFavorites } from '@/store/slices/showFavoritesSlice';

const BookHeader = () => {
  const { showMaps } = useSelector((state: RootState) => state.showMaps);
  const { showFavorites } = useSelector(
    (state: RootState) => state.showFavorites
  );

  const dispatch = useDispatch();

  const toggleMaps = () => {
    if (showFavorites) {
      dispatch(setShowFavorites(false));
    }
    dispatch(setShowMaps(!showMaps));
  };
  return (
    <CustomHeader
      rightContent={
        <TouchableOpacity onPress={toggleMaps} activeOpacity={0.5}>
          {!showMaps ? (
            <MapPinned size={24} color={Colors.secondary} />
          ) : (
            <List size={24} color={Colors.secondary} />
          )}
        </TouchableOpacity>
      }
      title="Book Training"
      headerTextStyle={{ fontSize: 26, lineHeight: 32 }}
    />
  );
};

export default BookHeader;
