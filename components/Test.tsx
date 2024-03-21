import { View, Text, TextInput } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useMessages } from '@/hooks/useMessages';
import { sendMessage,cureentUser } from '@/api/chat-api';
import { Button } from 'tamagui';
import { retrieveData } from '@/api/localStorage';

const Test = ({data}:{data:any}) => {
    // const [currentUser,setCurrentUser]=useState()
    const [roomUniqueName,setRoomUniqueName]=useState("")
    const currentUser=cureentUser()
    useEffect(() => { 
        if(currentUser){
           setRoomName()
         
        }
    }, [currentUser,roomUniqueName])
    
    // const getconnectUserId=async()=>{
    //     const data= await retrieveData("userInfo")
    //    if (!data) {
    //        return 'User not authenticated.';
    //    }
    //    const parsedValue = JSON.parse(data);
    // //    console.log(parsedValue.user.uid)
    //    setCurrentUser(parsedValue.user.uid)
    // }
    // console.log("current user ===>",data)
    const generateRoomName = (userId1:any, userId2:any) => {
        // Sort the user IDs alphabetically to ensure consistency
        const sortedUserIds = [userId1, userId2].sort();
      
        // Concatenate the sorted user IDs with a delimiter
        const roomName = sortedUserIds.join('-');
        // console.log("unique room name ",roomName)
        return roomName;
      };
      const setRoomName = () => {
        const roomName = generateRoomName(currentUser,data.id);
        setRoomUniqueName(roomName); // Set the room name in your component's state
      };
    const messages = useMessages();
    const [value, setValue] = useState(
      {
        message:"",
        emoji:"like",
        members:[data.id],
        roomName:""
      }
    );
    const handleMessageChange = (text:any) => {
      setValue(prevState => ({
        ...prevState,
        message: text
      }));
      setValue(prevState => ({
        ...prevState,
        roomName: roomUniqueName
      }));
    };
    // console.log("value is ===>",value)
    console.log("roomUniqueName is ===>",roomUniqueName)
    const handleSubmit = async () => {
      console.log("sent")
      await sendMessage(value);
      setValue({
        message:"",
        emoji:"like",
        members:[data.id],
        roomName:roomUniqueName
      });
    };
    
  return (
    <View>
     <TextInput
        placeholder="Enter a message"
        value={value.message}
        onChangeText={(text) => handleMessageChange(text)}
      />
            <Button onPress={handleSubmit}>Send</Button>
      {messages.map((e:any)=>(
        <View key={e.id}>
            
            {e.roomName===roomUniqueName &&
        <Text  style={{ marginBottom: 10,marginLeft:e.sender===data.id ?20:250,
            backgroundColor: e.sender===data.id ? '#f0f0f0' : '#c2f0fc' }}>{e.message}</Text>
            }
        </View>
      ))}
    </View>
  )
}

export default Test