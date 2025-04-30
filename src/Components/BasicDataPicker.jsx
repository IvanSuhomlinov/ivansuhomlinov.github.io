import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
const BasicDatePicker = ({getCurDate, currentDate, ...props}) => {
    return (
      <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="ru">
        <DemoContainer components={["DatePicker"]}>
          <DatePicker
            style={{ width: "max-content"}}
            label="Введите дату"
            format="DD.MM.YYYY"
            /*defaultValue={dayjs(Date.now())}*/
            onChange={getCurDate}
            value={currentDate}
          />
        </DemoContainer>
      </LocalizationProvider>
    );
  };

  export default BasicDatePicker