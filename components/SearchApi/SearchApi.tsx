import { StyleSheet, Alert, SafeAreaView } from 'react-native';
import React, { useEffect, useState } from 'react'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import HeaderArrow from '../HeaderArrow';
import { View } from 'tamagui';
import { Search } from '@tamagui/lucide-icons'
import {addClub} from '@/api/club-api'
import {KEY} from '@env'
const SearchApi = ({setOpen,setClose,handleData }:{setOpen?:any,setClose?:any,handleData?:any}) => {
    const [name, setName] = useState('');
    const [error, setError] = useState(null);
    
    useEffect(()=>{
        if(error!==null) return Alert.alert(error)
    },[error])

    const handlePlacePress = (data:any, details:any  ) => {
    const { geometry,name } = details;
    const { location } = geometry;
    const { lat, lng } = location;
    console.log('Latitude:=====', lat);
    console.log('Longitude:======', lng);

    setName(name)
    console.log(details)
    console.log('name :', name);
    addClub({club:{name:name,location:`Latitude:${lat} Longitude:${lng}`}})
    handleData(name)
    setClose(true)
    setOpen(false)
};
const renderRightButton = () => {
    return (
      <Search style={{marginLeft:-40,marginTop:13,color:"#3A4D6C"}} size={24} />
    );
  };
  return (
    <SafeAreaView style={styles.container}>
        <View style={{marginTop:30,marginBottom:20,marginRight:"auto"}}><HeaderArrow data={"CLUB"}  gap={"$14"} /></View>
        <GooglePlacesAutocomplete
            placeholder=""
            query={{
            key: KEY,
            language: 'en', 
            }}
            fetchDetails={true}
            onPress={(data, details ) => handlePlacePress(data,details)}
            onFail={(error) => setError(error)}
            renderRightButton={renderRightButton}
            styles={{
                textInputContainer: styles.textInputContainer,
                textInput: styles.textInput,
                listView:styles.listView,
                row:styles.row,
                poweredContainer:styles.poweredContainer,
                container:styles.container,
                powered:styles.powered,
                separator:styles.separator,
                description:styles.description, 
            }}
        />  
    </SafeAreaView>
  )
}

export default SearchApi

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        marginRight:5
    },
    textInputContainer: {
        borderWidth: 0,
        borderRadius: 9,
        width:358,
        backgroundColor: '#FFFF',
    },
    textInput: {
        height: 53,
        color: '#3A4D6C',
        fontFamily:"Montserrat",
        fontSize:14,
        fontWeight:"500",
        lineHeight: 17.07,
        backgroundColor: '#D9D9D9',
        borderRadius: 9,
        
    },
    description: {
        color: '#3A4D6C',
        fontFamily:"Montserratbold",
        fontSize:16,
        fontWeight:"500",
        lineHeight: 19.5,

      },
    listView: {
        backgroundColor: '#FFFF',    
    },
    row: {
        backgroundColor: '#FFFF',
        padding: 13,
        height: 44,
        flexDirection: 'row',
        alignItems:"flex-start",
        justifyContent:"flex-start",
        marginLeft:30
    },
    poweredContainer: {
        display: 'none'
      },
      powered:{
        display: 'none'
      },
      separator: {
        height:1,
        backgroundColor: '#F5F5F5',
      },
    
})