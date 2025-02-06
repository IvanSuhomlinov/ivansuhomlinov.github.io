import * as React from "react";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import { formatMeridiem } from "@mui/x-date-pickers/internals";
import { renderTimeViewClock } from "@mui/x-date-pickers";

const App = (props) => {
  /* period.indexOf(time) >= 0 || period.length === 2 && (converter(time) > converter(period[0]) && converter(time) < converter(period[1])) ? "selected-div" : ""*/
  /*time === hovered || period.length === 1 && (converter(time) > Math.min(converter(period[0]), converter(hovered)) && converter(time) < Math.max(converter(period[0]), converter(hovered))) ? "hovered-div" : ""*/
  const [reservedTime, setReservedTime] = React.useState([
    {
      date:"2025-02-17",
      reserves: [
        {
          id: "30013",
          date: "2025-02-17",
          time: {
            start: "08:00",
            duration: "30",
          },
          free: false,
          service: "1",
          person: {
            id: "4938",
            name: "Иванов Андрей Петрович",
          },
        },

        {
          id: "09821",
          date: "2025-02-17",
          time: {
            start: "09:30", 
            duration: 30
          },
          free: false,
          service: "1",
          person: {
            id: "4938",
            name: "Иванов Андрей Петрович",
          },
        },

        {
          id: "31013",
          date: "2024-02-17",
          time: {
            start: "10:00",
            duration: 30,
          },
          free: false,
          service: "1",
          person: {
            id: "4937",
            name: "Ческидов Александр Леонидович",
          },
        },

        {
          id: "32333",
          date: "2025-02-17",
          time: {
            start: "11:00",
            duration: 30 
          },
          free: false,
          service: "1",
          person: {
            id: "4937",
            name: "Ческидов Александр Леонидович",
          },
        }
      ]
        
      }
      

    // {
    //   id: null,
    //   date: "2025-02-18",
    //   reserves: [
    //     { start: "10:00", duration: 30 },
    //     { start: "12:30", duration: 30 },
    //     { start: "14:00", duration: 30 },
    //     { start: "16:30", duration: 30 },
    //   ],
    //   person: {
    //     id: 1,
    //   },
    // },
    // {
    //   id: null,
    //   date: "2025-02-19",
    //   reserves: [
    //     { start: "09:00", duration: 30 },
    //     { start: "13:30", duration: 30 },
    //   ],
    //   person: {
    //     id: 1,
    //   },
    // },
    // {
    //   id: null,
    //   date: "2025-02-20",
    //   reserves: [
    //     { start: "08:30", duration: 30 },
    //     { start: "10:00", duration: 30 },
    //     { start: "15:00", duration: 30 },
    //   ],
    //   person: {
    //     id: 1,
    //   },
    // },
    // {
    //   id: null,
    //   date: "2025-02-21",
    //   reserves: [
    //     { start: "11:30", duration: 30 },
    //     { start: "13:00", duration: 30 },
    //     { start: "14:30", duration: 30 },
    //   ],
    //   person: {
    //     id: 1,
    //   },
    // },
    // {
    //   id: null,
    //   date: "2025-02-22",
    //   reserves: [
    //     { start: "09:30", duration: 30 },
    //     { start: "10:30", duration: 30 },
    //     { start: "12:00", duration: 30 },
    //     { start: "15:30", duration: 30 },
    //   ],
    //   person: {
    //     id: 1,
    //   },
    // },
    // {
    //   id: null,
    //   date: "2025-02-23",
    //   reserves: [
    //     { start: "08:00", duration: 30 },
    //     { start: "09:00", duration: 30 },
    //     { start: "16:00", duration: 30 },
    //   ],
    //   person: {
    //     id: 1,
    //   },
    // },
    // {
    //   id: null,
    //   date: "2025-02-24",
    //   reserves: [
    //     { start: "10:00", duration: 30 },
    //     { start: "13:00", duration: 30 },
    //     { start: "15:00", duration: 30 },
    //   ],
    //   person: {
    //     id: 1,
    //   },
    // },
    // {
    //   id: null,
    //   date: "2025-02-25",
    //   reserves: [
    //     { start: "09:00", duration: 30 },
    //     { start: "11:00", duration: 30 },
    //     { start: "14:30", duration: 30 },
    //   ],
    //   person: {
    //     id: 1,
    //   },
    // },
    // {
    //   id: null,
    //   date: "2025-02-26",
    //   reserves: [
    //     { start: "08:30", duration: 30 },
    //     { start: "12:00", duration: 30 },
    //     { start: "15:30", duration: 30 },
    //   ],
    //   person: {
    //     id: 1,
    //   },
    // },
    // {
    //   id: null,
    //   date: "2025-02-27",
    //   reserves: [
    //     { start: "10:00", duration: 30 },
    //     { start: "14:00", duration: 30 },
    //     { start: "16:30", duration: 30 },
    //   ],
    //   person: {
    //     id: 1,
    //   },
    // },
    // {
    //   id: null,
    //   date: "2025-02-28",
    //   reserves: [
    //     { start: "09:30", duration: 30 },
    //     { start: "11:30", duration: 30 },
    //     { start: "13:00", duration: 30 },
    //   ],
    //   person: {
    //     id: 1,
    //   },
    // },
    // {
    //   id: null,
    //   date: "2025-02-29",
    //   reserves: [
    //     { start: "08:00", duration: 30 },
    //     { start: "09:00", duration: 30 },
    //     { start: "10:30", duration: 30 },
    //     { start: "14:30", duration: 30 },
    //   ],
    //   person: {
    //     id: 1,
    //   },
    // },
    // {
    //   id: null,
    //   date: "2025-02-31",
    //   reserves: [
    //     { start: "08:30", duration: 30 },
    //     { start: "11:00", duration: 30 },
    //     { start: "13:30", duration: 30 },
    //   ],
    //   person: {
    //     id: 1,
    //   },
    // },
  ]);
  const step = 30;
  const [period, setPeriod] = React.useState([]);
  const [selectedButton, setSelectedButton] = React.useState([]);
  const [hovered, setHovered] = React.useState("");
  const [reserves, setReserves] = React.useState([]);
  
  const [currentDate, setCurrentDate] = React.useState(dayjs(Date.now()));
  const [currentUser, setCurrentUser] = React.useState([])
  const [users, setUsers] = React.useState([
    {
      name: "Ческидов Александр Леонидович",
      id: "4937",
      logo: "https://avatars.mds.yandex.net/i?id=238b2b70a2e06e504bb39372d79b19a8_l-3598775-images-thumbs&n=13"
    },
    {
      name: "Иванов Андрей Петрович",
      id: "4938",
      logo: "https://i.pinimg.com/originals/82/ec/87/82ec8770fec12e698bd634de368cfa9a.jpg"
    }
  ])

  const handleMouseEnter = (e) => {
    e.currentTarget.classList.add("hovered-div");
    const currentTime = e.currentTarget.dataset.time;
    if (period.length === 1) {
      const selectedTime = converter(currentTime);
      const periodTime = converter(period[0]);
      const arraySelectTime = currentTime.split(":").map((el) => Number(el));
      const arrPeriodTime = period[0].split(":").map((el) => Number(el));
      if (selectedTime < periodTime) {
        if (!isReserved(arraySelectTime, arrPeriodTime)) {
          setHovered(currentTime);
        } else {
          setHovered("");
        }
      } else {
        if (!isReserved(arrPeriodTime, arraySelectTime)) {
          setHovered(currentTime);
        } else {
          setHovered("");
        }
      }
    } else {
      setHovered(e.currentTarget.dataset.time);
    }

    /*if(period.length === 1 || period.length === 2){
    if(e.currentTarget.className === "div-time selected-div"){
      e.currentTarget.style.background = "rgb(255, 255, 107)"
      
    }
    else{
        
        e.currentTarget.style.background = "aquamarine"
    }
  }*/
  };

  const handleMouseLeave = (e) => {
    e.currentTarget.classList.remove("hovered-div");
    setHovered("");
    /*if(e.currentTarget.className === "div-time selected-div"){

      e.currentTarget.style.background = "rgb(255, 255, 107)"
    }
    else{
      
      e.currentTarget.style.background = "white"
    }*/
  };

  const handleClick = (event) => {
    const currentTime = event.currentTarget.dataset.time;
    setSelectedButton([currentTime]);
    comparePeriod(currentTime);
  };

  const comparePeriod = (time) => {
    if (period.length === 0 || period.length === 2) {
      setPeriod([time]);
    }

    if (period.length === 1) {
      const selectedTime = converter(time);
      const periodTime = converter(period[0]);
      const arraySelectTime = time.split(":").map((el) => Number(el));
      const arrPeriodTime = period[0].split(":").map((el) => Number(el));
      if (selectedTime < periodTime) {
        console.log("isReserved1: " + !isReserved(time, ...period));
        if (!isReserved(arraySelectTime, arrPeriodTime)) {
          console.log("Вызываем setperiod1");
          setPeriod((prev) => [time, ...prev]);
        } else {
          setPeriod([time]);
        }
      } else {
        console.log("isReserved2: " + !isReserved(...period, time));
        if (!isReserved(arrPeriodTime, arraySelectTime)) {
          console.log("Вызываем setperiod2");
          setPeriod((prev) => [...prev, time]);
        } else {
          setPeriod([time]);
        }
      }
    }

    /*if (period.length === 2) {
      
      const selectedTime = converter(time)
      const periodTime = converter(period[0])
      const secondPeriodTime = converter(period[1])
      console.log(period)
      
      if (selectedTime < periodTime) {
      setPeriod(prev => [time, prev[1]]) 
    } else if (selectedTime > secondPeriodTime) {
      setPeriod(prev => [prev[0], time])
    } else {
      setPeriod(prev => [time, prev[1]])
    }
  }*/
  };

  const converter = (time) => {
    if (!time) return;
    const [h, m] = time.split(":");
    const min = Number(h) * 60;
    return Number(min) + Number(m);
  };


  const getFormatDate = (date) => {
    const formatDate = date.format('YYYY-MM-DD')
    return formatDate;
  };

  const getReserves = () => {
    console.log(currentDate);
    if (currentDate) {
      setReserves(
        reservedTime.filter((el) => el.date === getFormatDate(currentDate))[0]?.reserves
      );
    }
  };

  const getCurDate = (arg) => {
    console.log(new Date(arg.$d).getTime());
    setCurrentDate(dayjs(new Date(arg.$d).getTime()));
  };

  const paintYellowDiv = (time) => {
    if (period.length === 2) console.log(isReserved(...period));

    if (
      period.indexOf(time) >= 0 ||
      (period.length === 2 &&
        converter(time) > converter(period[0]) &&
        converter(time) < converter(period[1]))
    ) {
      return "selected-div";
    } else {
      return "";
    }
  };

  const reserveTime = (e) => {
    e.preventDefault();
    const duration =
      period.length === 2
        ? converter(period[1]) - converter(period[0]) + step
        : step;
    const reserve = { start: period[0], duration: duration };
    setReservedTime((prev) => [
      ...prev.filter((el) => el.date != getFormatDate(currentDate)),
      { date: getFormatDate(currentDate), reserves: [...reserves, reserve] },
    ]);
    setPeriod([]);
    console.log(
      `Вы уверены что хотите забронировать ${JSON.stringify(reserve)}?`
    );
  };

  const paintBlueDiv = (time) => {
    if (
      time === hovered ||
      (period.length === 1 &&
        converter(time) > Math.min(converter(period[0]), converter(hovered)) &&
        converter(time) < Math.max(converter(period[0]), converter(hovered)))
    ) {
      return "hovered-div";
    } else {
      return "";
    }
  };

  React.useEffect(() => {
    console.log("Резервированое время: " + reserves);
  }, [reserves]);

  React.useEffect(() => {
    getReserves();
    console.log(...reservedTime)
  }, [currentDate, reservedTime]);

  React.useEffect(() => {
    console.log("Период равен: " + period);
    if (period.length === 2) {
      console.log("Период равен: " + period);
    }
  }, [period]);

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
      for (const reserve of reserves) {

        const {start, duration} = reserve.time
        
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

  const paintUserDiv = () => {
    // currentUser?.person?.id === reserves?.person?.id ? "reserved-div div-time" : "current-userDiv div-time";
    // if(currentUser.person.id === reserves.person.id){
    //   return "reserved-div div-time"
    // }
    // else{
    //   return "current-userDiv div-time"
    // }

    console.log(currentUser + reserves)
  }

  const CreateTimeBtns = (startTime, endTime, step) => {
    let timeBtns = [];
    
    let [currentHours, currentMinutes] = String(startTime)
      .split(":")
      .map((el) => Number(el));
    const [endHours, endMinutes] = endTime.split(":").map((el) => Number(el));
    while (
      currentHours < endHours ||
      (currentHours === endHours && currentMinutes <= endMinutes)
    ) {
      const newTime = increaseTime(currentHours, currentMinutes, step);
      const [newHours, newMinutes] = newTime;
      
      const time = String(currentHours).padStart(2,'0') + ":" + String(currentMinutes).padStart(2,'0');
      const endTime = String(newHours).padStart(2,'0') + ":" + String(newMinutes).padStart(2,'0');
      const btn = isReserved([currentHours, currentMinutes], newTime) ? (
        <div className={paintUserDiv()}>{time} - {endTime}</div>
      ) : (
        <div
          data-time={time}
          onMouseLeave={handleMouseLeave}
          onMouseEnter={handleMouseEnter}
          onClick={handleClick}
          className={`div-time ${paintYellowDiv(time)} ${paintBlueDiv(time)}`}
        >
          {time} - {endTime}
        </div>
      );
      
      timeBtns.push(btn);
      currentHours = newHours
      currentMinutes = newMinutes
    }
    return timeBtns;
  };

  const CreateTimeButtons = () => {
    // const createTime = timeList.map((time, index) => {
    //   const [hours, minutes] = time.split(":").map((el) => Number(el));
    //   const newTime = increaseTime(hours, minutes, step);
    //   return isReserved([hours, minutes], newTime) ? (
    //     <div className="reserved-div">{time}</div>
    //   ) : (

    //     <div id={index} data-time={time} onMouseLeave={handleMouseLeave} onMouseEnter={handleMouseEnter} onClick={handleClick}
    //     className={`div-time ${paintYellowDiv(time)} ${paintBlueDiv(time)}`}>
    //       {time}
    //     </div>
    //   );
    // });

    // return createTime;
    return CreateTimeBtns("06:00", "23:30", step);
  };

  

  const changeUser = (event) => {
    setCurrentUser(
      users.filter((el) => el.name === event.currentTarget.value)[0]
    )
   
  }
  React.useEffect(() => {
    console.log(currentUser)
    console.log(reserves)
  }, [changeUser]);
  
  const UserLogo = () => {
    return(
      <div>
        <img className="user-logo" src={currentUser.logo}></img>
      </div>
    )
  }

  const UserDropdown = () => {
    return(
      <div>
          <select className="dropdown" onChange={changeUser} id="users">
            <option value="">{currentUser.name}</option>
            {users.map((e, idx) => <option value={e.name} key={idx}>{e.name}</option>)}
          </select>
        </div>
    )
  }

  const BasicDatePicker = () => {
    return (
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DemoContainer components={["DatePicker"]}>
          <DatePicker
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

  return (
    <div>
      <div className="user-div">
      <UserLogo />
      <UserDropdown />
      </div>
      
      <BasicDatePicker />
      <div className="flex-div">
        <CreateTimeButtons />
        <button onClick={reserveTime}>Забронировать</button>
      </div>
    </div>
  );
};

export default App;
