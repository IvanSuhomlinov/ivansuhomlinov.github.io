import * as React from 'react';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';

function BasicDatePicker() {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={['DatePicker']}>
        <DatePicker label="Введите дату" format='DD.MM.YYYY'  defaultValue={dayjs(Date.now())} />
      </DemoContainer>
      
    </LocalizationProvider>

    
  );
}


const App = () =>{


  return (
    <div>
      <BasicDatePicker />
    </div>
  );
}

export default App;