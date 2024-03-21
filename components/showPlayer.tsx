import { View, Text, Modal } from 'react-native'
import React, { useEffect, useState } from 'react'
import { findAllFromCollection } from '@/api/chat-api'
import { Button } from 'tamagui';
import Test from './Test';
import { subscriptionData } from '@/api/subscription-api';

const ShowPlayer = () => {
    const [data, setData] = useState([]);
    const [idPlayer, setIdPlayer] = useState();
    const [open, setOpen] = useState<boolean>(false);
    const getid=(player:any)=>{
        setIdPlayer(player)
        setOpen(true); // Open the modal
    }
    console.log(idPlayer)
    useEffect(() => {
      // Define an async function to fetch data and set state
      const fetchData = async () => {
        try {
          const playerData = await findAllFromCollection("player");
          setData(playerData);
        } catch (error) {
          console.error("Error fetching player data:", error);
        }
      };
  
      // Call the fetchData function when the component mounts
      fetchData();
    }, []); // Empty dependency array to ensure it runs only once when the component mounts
  
  
    return (
      <View>
       
       {data.map((player:any) => (
        <View key={player.id} style={{ marginBottom: 10 }}>
          <Text>{player.displayName}</Text>
          <Button  onPress={() => getid(player)} >send a message to{player.displayName}</Button>
        </View>
      ))}
       <Button  onPress={() => subscriptionData()} >click</Button>
      <Modal 
            animationType="slide"
            visible={open}
            onRequestClose={() => setOpen(false)}
            >
      {idPlayer && <Test data={idPlayer} />}</Modal>
      </View>
    );
  };
export default ShowPlayer