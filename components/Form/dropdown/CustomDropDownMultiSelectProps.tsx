import React, { useEffect, useState } from 'react';
import { ScrollView, YStack } from 'tamagui';
import CustomInput from '../CustomInput';
import { ChevronDown, ChevronUp } from '@tamagui/lucide-icons';

import DropDownItem from './DropDownItem';

import { option } from '@/types/options';
import Colors from '@/constants/Colors';
import { StyleSheet } from 'react-native';

interface CustomDropDownMultiSelectProps {
    readonly placeholder: string,
    readonly options: option[];
    readonly selectedItems: string[];
    readonly handleChange: (selectedItems: string[]) => void;
    readonly touched?: boolean;
    readonly errors?: any;
    readonly validateOnInit?: boolean;
    readonly scrollViewRef?: React.RefObject<ScrollView>;
}

export default function CustomDropdownMultiSelect(props: CustomDropDownMultiSelectProps) {
    const {
        placeholder,
        options,
        selectedItems,
        handleChange,
        touched,
        errors,
        validateOnInit,
        scrollViewRef,
    } = props;
    const [clicked, setClicked] = useState(false);

    const handleClick = () => {
        setClicked(!clicked);
        scrollViewRef?.current?.scrollTo({ y: 100, animated: true });
    };

    const handleItemClick = (item: string) => {
        let newSelectedItems = [...selectedItems];
        if (newSelectedItems.includes(item)) {
            newSelectedItems = newSelectedItems.filter(selectedItem => selectedItem !== item);
        } else {
            newSelectedItems.push(item);
        }
        handleChange(newSelectedItems);
    };
    useEffect(() => {
        console.log(errors);
    }, [errors])

    return (
        <YStack zIndex={1}>
            <CustomInput
                icon={
                    clicked ? (
                        <ChevronUp color={Colors.secondary} />
                    ) : (
                        <ChevronDown color={Colors.secondary} />
                    )
                }
                onPress={handleClick}
                value={selectedItems.join(', ')}
                placeholder={placeholder}
                touched={!clicked && touched}
                errors={!clicked ? errors : ''}
                validateOnInit={validateOnInit}
                textTransform="capitalize"
                readOnly={true}
            />
            <YStack marginTop={8} paddingHorizontal={5}>
                {clicked && (
                    <YStack
                        $platform-ios={{
                            shadowColor: 'rgba(0, 0, 0, 0.1)',
                            shadowOffset: { width: 2, height: 2 },
                            shadowOpacity: 0.8,
                            shadowRadius: 4,
                        }}
                        style={styles.ystack}>
                        {options.map((option) => {
                            let index = selectedItems.indexOf(option.value)
                            return (<DropDownItem
                                key={option.value}
                                handleItemClick={handleItemClick}
                                selectedItem={selectedItems[index]}
                                item={option}
                            />)
                        })}
                    </YStack>
                )}
            </YStack>
        </YStack>
    );
}
const styles = StyleSheet.create({
    ystack: {
        maxHeight: 300,
        width: '100%',
        elevation: 4,
        backgroundColor: 'white',
        borderRadius: 8,
        paddingVertical: 10,
        paddingHorizontal: 16,
    }
})