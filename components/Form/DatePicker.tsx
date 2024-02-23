import { useState } from 'react';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

import { CalendarDays } from '@tamagui/lucide-icons';
import CustomInput from './CustomInput';
import { YStack } from 'tamagui';
import Colors from '@/constants/Colors';
import { FormikHandlers } from 'formik';

interface DatePickerProps {
  date: string;
  handleChange: FormikHandlers['handleChange'];
  touched?: boolean;
  errors?: string;
  validateOnInit?: boolean;
}

const DatePicker = function DatePicker(props: DatePickerProps) {
  const { handleChange, date, touched, errors, validateOnInit } = props;
  const [show, setShow] = useState(false);

  const showDatePicker = () => {
    setShow(true);
  };

  const hideDatePicker = () => {
    setShow(false);
  };

  const handleConfirm = (date: Date) => {
    handleChange(date.toLocaleDateString());
    hideDatePicker();
  };

  return (
    <YStack>
      <CustomInput
        value={date}
        touched={touched}
        errors={errors}
        validateOnInit={validateOnInit}
        placeholder="Date of birth"
        readOnly
        onPress={showDatePicker}
        icon={<CalendarDays color={Colors.secondary} />}
      />

      <DateTimePickerModal
        isVisible={show}
        maximumDate={new Date()}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />
    </YStack>
  );
};

export default DatePicker;
