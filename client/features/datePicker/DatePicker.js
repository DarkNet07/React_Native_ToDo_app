// import React, { useState } from 'react';
// import { View, Button, Platform } from 'react-native';
// import DateTimePicker from '@react-native-community/datetimepicker';

// export default function DatePicker() {
//   const [date, setDate] = useState(new Date());
//   const [show, setShow] = useState(false);

//   const onChange = (event, selectedDate) => {
//     const currentDate = selectedDate || date;
//     setShow(Platform.OS === 'android');
//     setDate(currentDate);
//   };

//   const showMode = () => {
//     setShow(true);
//   };

//   const showDatepicker = () => {
//     showMode('date');
//   };

//   return (
//     <View>
//       <View>
//         <Button onPress={showDatepicker} title="Show date picker!" />
//       </View>
//       {show && (
//         <DateTimePicker
//           testID="dateTimePicker"
//           value={date}
//           mode="date"
//           is24Hour
//           display="default"
//           onChange={onChange}
//         />
//       )}
//     </View>
//   );
// }
