import { StyleSheet, View } from 'react-native'
import React, { useState } from 'react'
import { Button, Input } from 'tamagui'
import { loginUser } from '@/api/auth-api'

const Login = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const login=()=>{
        loginUser({email:email,password:password})
      }
  return (
    <View style={{marginTop:70}}>
        <Input borderWidth={0}
          placeholder="Email"
          onChangeText={(text: string) => setEmail(text)}
          value={email}
          autoCapitalize="none"
       
        />
        <Input borderWidth={0}
          placeholder="Name and last name"
          onChangeText={(text: string) => setPassword(text)}
          value={password}
        />
        <Button onPress={login} >login</Button> 
    </View>
  )
}

export default Login

const styles = StyleSheet.create({})