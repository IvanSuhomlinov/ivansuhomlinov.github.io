import * as React from "react";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";

const App = (props) => {
  const step = 30;
  const [period, setPeriod] = React.useState([]);
  

  const handleClick = (event) => {
    event.currentTarget.classList.toggle("selected-div");
    const currentTime = event.currentTarget.dataset.time;
    comparePeriod(currentTime);
    console.log(period)

  };

  const comparePeriod = (time) => {
    if (period.length === 0) {
      setPeriod([time]);
      
    }
    if (period.length === 1) {
      const selectedTime = converter(time);
      const periodTime = converter(period[0])

      if (selectedTime < periodTime) {
        setPeriod(prev => [time, ...prev])
        
      } 
      else {
        setPeriod(prev => [...prev, time])
        
      }
    }

    if (period.length === 2) {
      const selectedTime = converter(time)
      const periodTime = converter(period[0])
      const secondPeriodTime = converter(period[1])
      console.log(period)
      
      if (selectedTime < periodTime) {
      setPeriod(prev => [time, prev[0]]) 
    } else if (selectedTime > secondPeriodTime) {
      setPeriod(prev => [prev[1], time])
    } else {
      setPeriod(prev => [prev[0], time])
    }
  }
 
}

  const converter = (time) => {
    const [h,m] = time.split(":")
    const min = Number(h) * 60;
    return Number(min) + Number(m);
  };

  const timeList = [
    "00:00",
    "00:30",
    "01:00",
    "01:30",
    "02:00",
    "02:30",
    "03:00",
    "03:30",
    "04:00",
    "04:30",
    "05:00",
    "05:30",
    "06:00",
    "06:30",
    "07:00",
    "07:30",
    "08:00",
    "08:30",
    "09:00",
    "09:30",
    "10:00",
    "10:30",
    "11:00",
    "11:30",
    "12:00",
    "12:30",
    "13:00",
    "13:30",
    "14:00",
    "14:30",
    "15:00",
    "15:30",
    "16:00",
    "16:30",
    "17:00",
    "17:30",
    "18:00",
    "18:30",
    "19:00",
    "19:30",
    "20:00",
    "20:30",
    "21:00",
    "21:30",
    "22:00",
    "22:30",
    "23:00",
    "23:30",
  ];
  const [reserves, setReserves] = React.useState([]);
  const [time, setTime] = React.useState([
    {
      date: "2025-01-17",
      reserves: [
        { start: "08:00", duration: 30 },
        { start: "09:30", duration: 30 },
        { start: "11:00", duration: 30 },
      ],
    },
    {
      date: "2025-01-18",
      reserves: [
        { start: "10:00", duration: 30 },
        { start: "12:30", duration: 30 },
        { start: "14:00", duration: 30 },
        { start: "16:30", duration: 30 },
      ],
    },
    {
      date: "2025-01-19",
      reserves: [
        { start: "09:00", duration: 30 },
        { start: "13:30", duration: 30 },
      ],
    },
    {
      date: "2025-01-20",
      reserves: [
        { start: "08:30", duration: 30 },
        { start: "10:00", duration: 30 },
        { start: "15:00", duration: 30 },
      ],
    },
    {
      date: "2025-01-21",
      reserves: [
        { start: "11:30", duration: 30 },
        { start: "13:00", duration: 30 },
        { start: "14:30", duration: 30 },
      ],
    },
    {
      date: "2025-01-22",
      reserves: [
        { start: "09:30", duration: 30 },
        { start: "10:30", duration: 30 },
        { start: "12:00", duration: 30 },
        { start: "15:30", duration: 30 },
      ],
    },
    {
      date: "2025-01-23",
      reserves: [
        { start: "08:00", duration: 30 },
        { start: "09:00", duration: 30 },
        { start: "16:00", duration: 30 },
      ],
    },
    {
      date: "2025-01-24",
      reserves: [
        { start: "10:00", duration: 30 },
        { start: "13:00", duration: 30 },
        { start: "15:00", duration: 30 },
      ],
    },
    {
      date: "2025-01-25",
      reserves: [
        { start: "09:00", duration: 30 },
        { start: "11:00", duration: 30 },
        { start: "14:30", duration: 30 },
      ],
    },
    {
      date: "2025-01-26",
      reserves: [
        { start: "08:30", duration: 30 },
        { start: "12:00", duration: 30 },
        { start: "15:30", duration: 30 },
      ],
    },
    {
      date: "2025-01-27",
      reserves: [
        { start: "10:00", duration: 30 },
        { start: "14:00", duration: 30 },
        { start: "16:30", duration: 30 },
      ],
    },
    {
      date: "2025-01-28",
      reserves: [
        { start: "09:30", duration: 30 },
        { start: "11:30", duration: 30 },
        { start: "13:00", duration: 30 },
      ],
    },
    {
      date: "2025-01-29",
      reserves: [
        { start: "08:00", duration: 30 },
        { start: "09:00", duration: 30 },
        { start: "10:30", duration: 30 },
        { start: "14:30", duration: 30 },
      ],
    },
    {
      date: "2025-01-30",
      reserves: [
        { start: "08:30", duration: 30 },
        { start: "11:00", duration: 30 },
        { start: "13:30", duration: 30 },
      ],
    },
  ]);

  const getReserves = (date) => {
    setReserves(time.filter((day) => day.date === date)[0]?.reserves);
  };

  const getCurDate = (arg) => {
    const year = String(arg.$d.getFullYear());
    const day = String(arg.$d.getDate()).padStart(2, "0");
    const month = String(arg.$d.getMonth() + 1).padStart(2, "0");
    console.log(year + "-" + month + "-" + day);
    getReserves(year + "-" + month + "-" + day);
  };

  React.useEffect(() => {
    console.log(reserves);
  }, [reserves]);

  const increaseTime = (h, m, step) => {
    h = Number(h) + Math.floor(step / 60);
    m = Number(m) + (step % 60);
    if (m >= 60) {
      h += 1;
      m -= 60;
    }
    return [h, m];
  };

  const isReserved = (t1, t2) => {
    if (reserves) {
      for (const { start, duration } of reserves) {
        const [startH, startM] = start.split(":").map(Number);
        const [endH, endM] = increaseTime(startH, startM, Number(duration));

        if (
          t2[0] < startH ||
          t1[0] > endH ||
          (t2[0] === startH && t2[1] <= startM) ||
          (t1[0] === endH && t1[1] >= endM)
        ) {
          continue;
        }
        return true;
      }
    }
    return false;
  };

  const CreateTimeButtons = () => {
    const createTime = timeList.map((time, index) => {
      const [hours, minutes] = time.split(":").map((el) => Number(el));
      const newTime = increaseTime(hours, minutes, step);
      return isReserved([hours, minutes], newTime) ? (
        <div className="reserved-div">{time}</div>
      ) : (
        <div data-time={time} onClick={handleClick} className="div-time">
          {time}
        </div>
      );
    });

    return createTime;
  };

  const BasicDatePicker = () => {
    return (
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DemoContainer components={["DatePicker"]}>
          <DatePicker
            label="Введите дату"
            format="DD.MM.YYYY"
            defaultValue={dayjs(Date.now())}
            onChange={getCurDate}
          />
        </DemoContainer>
      </LocalizationProvider>
    );
  };

  return (
    <div>
      <BasicDatePicker />
      <div className="flex-div">
        <CreateTimeButtons />
      </div>
    </div>
  );
};

export default App;
