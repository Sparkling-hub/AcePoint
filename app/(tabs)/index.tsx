import { StyleSheet } from 'react-native';

import EditScreenInfo from '@/components/EditScreenInfo';
import { Text, View } from '@/components/Themed';
import { app, db, getFirestore, collection, addDoc, getDocs } from '../../lib/firebase'; // Adjust the path accordingly
import { useEffect, useState } from 'react';


interface DataType {
  id: string;
}

export default function TabOneScreen() {
  const [data, setData] = useState<DataType[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const querySnapshot = await getDocs(collection(db, "player"));
      querySnapshot.forEach((db : any) => {
        setData((prev) => [...prev, { id: db.id }]);
        console.log(db.id);
      });
    };

    fetchData();
  }, []);

  return (
    <View>
      {data.map(item => (
        <Text key={item.id}>{item.id}</Text> // Customize based on your data structure
      ))}
    </View>
  );
}

