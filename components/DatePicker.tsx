import { useState } from 'react';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

import { CalendarDays } from '@tamagui/lucide-icons';
import CustomInput from './CustomInput';

interface DatePickerProps {
  date: Date;
  setDate: (date: Date) => void;
}

const DatePicker = function DatePicker(props: DatePickerProps) {
  const { date, setDate } = props;
  const [show, setShow] = useState(false);

  const showDatePicker = () => {
    setShow(true);
  };

  const hideDatePicker = () => {
    setShow(false);
  };

  const handleConfirm = (date: Date) => {
    setDate(date);
    hideDatePicker();
  };

  return (
    <>
      <CustomInput
        value={date?.toLocaleDateString()}
        placeholder="Date of birth"
        readOnly
        onPress={showDatePicker}
        icon={<CalendarDays color={'#3A4D6C'} />}
      />

      <DateTimePickerModal
        isVisible={show}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />
    </>
  );
};

export default DatePicker;
