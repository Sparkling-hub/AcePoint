import React from 'react'
import { AvatarProps, YStack,Avatar ,Text} from 'tamagui'


interface TenisProps extends AvatarProps {
    onPress?: () => void;
    icon?: React.ReactNode;
    inputStyle?: object;
    borderWidth?:number
    borderColor?:string
    backgroundColor?:string,
    text?:string
  }
  const Tenis: React.FC<TenisProps> = (props) => {
    const {
      onPress,
      size=104,
      inputStyle,
      icon,
      text,
      borderWidth=4,
      borderColor="#FFFFFF",
      backgroundColor='#A9D05C',
      ...rest
    } = props;
  
  
    return (
        <Avatar onPress={onPress}
            circular
            size={size}
            borderWidth={borderWidth}
            borderColor={borderColor}
            backgroundColor={backgroundColor}
            {...rest}
        >
            <YStack alignItems='center' gap={'$2'}> 
            {icon} 
            <Text style={{fontFamily:"Montserrat",lineHeight:19.5,fontSize:16,fontWeight:800,color:"#FFFF" }}>
                {text}
            </Text>
            </YStack>
        </Avatar>
    );
  };
export default Tenis

