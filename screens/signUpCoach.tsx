import { View,StyleSheet, TextInput, Button, Switch } from 'react-native'
import React, { useState } from 'react'
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import { signUpCoach } from '@/api/auth-api'
import UploadImage from '@/components/utils/UploadImage';


const SignUpCoach = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [displayName, setDisplayName] = useState<string>('');
    const [image, setImage] = useState<string>('');
    const [phoneNumber, setPhoneNumber] = useState<string>('');
    const [subscription, setSubscription] = useState<boolean>(false);
    const [age, setAge] = useState<Date>(new Date());
    const [showDatePicker, setShowDatePicker] = useState<boolean>(false);
    const onChange = (event: DateTimePickerEvent,selectedDate?: Date) => {
        const currentDate = selectedDate ?? age;
        setAge(currentDate);
        setShowDatePicker(false);
    };
    const handleDataFromChild = (data:string) => {
        setImage(data);
    };
    const showDatepicker = () => {
        setShowDatePicker(true);
    };
    const onSignUpPressed = async () => {
   
        await signUpCoach({
          email:email,
          password:password,
          coach:{
            displayName:displayName,
            phoneNumber:parseInt(phoneNumber),
            subscription:subscription,
            age:age,
            image:image
        }})
    }
  return (
    <View>
        <UploadImage getFromChild={handleDataFromChild}/>
      <TextInput
        placeholder="Email"
        onChangeText={(text: string) => setEmail(text)}
        value={email}
        autoCapitalize="none"
        style={styles.input}
      />
      <TextInput
        placeholder="Password"
        onChangeText={(text: string) => setPassword(text)}
        value={password}
        secureTextEntry={true}
        style={styles.input}
      />
      <TextInput
        placeholder="Display Name"
        onChangeText={(text: string) => setDisplayName(text)}
        value={displayName}
        style={styles.input}
      />
     <TextInput
      style={styles.input}
      value={phoneNumber}
      onChangeText={text => setPhoneNumber(text)}
      keyboardType="numeric" 
      placeholder="Enter phone number"
    />
    
   <Button onPress={showDatepicker} title={""+age} />
      {showDatePicker && (
        <DateTimePicker
          testID="dateTimePicker"
          value={age}
          mode="date"
          display="default"
          onChange={onChange}
          
        />
      )}
      <Switch
        value={subscription}
        onValueChange={setSubscription}
      />
      <Button title="Sign Up" onPress={onSignUpPressed} />
    </View>
  );
}
const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    fontSize: 16,
    marginBottom: 10,
    backgroundColor: '#fff',
  },
});
export default SignUpCoach