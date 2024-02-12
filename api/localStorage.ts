import AsyncStorage from '@react-native-async-storage/async-storage';
const storeData = async (storageName:string,value:any) => {
    try {
      await AsyncStorage.setItem(storageName, value);
      console.log(value)
      return "Data stored successfully"
    } catch (error) {
      console.error('Error storing data:', error);
    }
};
const retrieveData = async (storageName:string) => {
    try {
      const retrievedValue = await AsyncStorage.getItem(storageName);
      if (retrievedValue !== null) {
        return retrievedValue
      }
      console.log("there is no data");
    } catch (error) {
      console.error('Error retrieving data:', error);
    }
};
const removeItem = async (storageName:string) => {
    try {
      await AsyncStorage.removeItem(storageName);
      return "Item removed successfully"
    } catch (error) {
        console.error('Error removing item:', error);
    }
};
export {removeItem,retrieveData,storeData}