import * as React from "react";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import CloseIcon from "@mui/icons-material/Close"
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControl, IconButton, InputLabel, List, MenuItem, Select, Stack, TextField } from "@mui/material";




const App = (props) => {
  /* period.indexOf(time) >= 0 || period.length === 2 && (converter(time) > converter(period[0]) && converter(time) < converter(period[1])) ? "selected-div" : ""*/
  /*time === hovered || period.length === 1 && (converter(time) > Math.min(converter(period[0]), converter(hovered)) && converter(time) < Math.max(converter(period[0]), converter(hovered))) ? "hovered-div" : ""*/
  
  const step = 30;
  const settings = {
    classes: {
      btn: {
        default: props.customClasses?.btn?.default || "btn",
        reserve: props.customClasses?.btn?.reserved || "btn--reserved",
        currentReserve: props.customClasses?.btn.currentReserve || "btn--current-reserve",
        hovered: props.customClasses?.btn.hovered || "btn--hovered",
        selected: props.customClasses?.btn.seleted || "btn--selected",
        flexDiv: props.customClasses?.btn.flexDiv || "btn--flex-div",
        book: props.customClasses?.btn.book || "btn--book",
        delete: props.customClasses?.btn.delete || "btn--delete"
      },
      dropdown: {
        userList: props.customClasses?.dropdown.userList || "dropdown--user-list",
        userDiv: props.customClasses?.dropdown.userDiv || "dropdown--user-div",
        logo: props.customClasses?.dropdown.logo || "dropdown--user-logo"
      }

    }
  }
  const [period, setPeriod] = React.useState([]);
  // const [selectedButton, setSelectedButton] = React.useState([]);
  const [hovered, setHovered] = React.useState("");
  const [reserves, setReserves] = React.useState([]);
  const [users, setUsers] = React.useState([
    {
      name: "Ческидов Александр Леонидович",
      id: "4937",
      logo: "https://avatars.mds.yandex.net/i?id=238b2b70a2e06e504bb39372d79b19a8_l-3598775-images-thumbs&n=13"
    },
    {
      name: "Иванов Андрей Петрович",
      id: "78",
      logo: "https://i.pinimg.com/originals/82/ec/87/82ec8770fec12e698bd634de368cfa9a.jpg"
    }
  ])
  const [currentDate, setCurrentDate] = React.useState(dayjs(Date.now()));
  const [currentUserId, setCurrentUserId] = React.useState(0);
  const [currentUser, setCurrentUser] = React.useState(users[currentUserId]);
  const [isVisible, setIsVisible] = React.useState(false);
  const [position, setPosition] = React.useState({ x: 0, y: 0 });
  const [reserveForDel, setReserveForDel] = React.useState({})
  const [open, setOpen] = React.useState(false)

  
  const contextMenuClick = (e, action = "default") => {
    e.stopPropagation();
    switch(action){
    case "delete" :   deleteReserve(e, reserveForDel);
    default: console.log("default")
    }
  }

  const handleContextMenu = (e, isCurrentUser) => {
    if(isCurrentUser){
    e.preventDefault();
    const id = e.currentTarget.dataset.id
    setReserveForDel(...reserves.filter((el) => el.id === id))
    setPosition({x : e.clientX, y:e.clientY});
    setIsVisible(true);
    }

    
  }



  const handleMouseEnter = (e) => {
    e.preventDefault()
    e.stopPropagation()
    e.currentTarget.classList.add("hovered-div");
    const currentTime = e.currentTarget.dataset.time;
    if (period.length === 1) {
      const selectedTime = converter(currentTime);
      const periodTime = converter(period[0]);
      const arraySelectTime = currentTime.split(":").map((el) => Number(el));
      const arrPeriodTime = period[0].split(":").map((el) => Number(el));
      if (selectedTime < periodTime) {
        if (!isReserved(arraySelectTime, arrPeriodTime).result) {
          setHovered(currentTime);
        } else {
          setHovered("");
        }
      } else {
        if (!isReserved(arrPeriodTime, arraySelectTime).result
      ) {
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
    e.currentTarget.classList.remove(settings.classes.btn.hovered);
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
    // setSelectedButton([currentTime]);
    comparePeriod(currentTime);
    





  };

  const contextMenuDiv = (e) => {
    e.preventDefault()
  }

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
        
        if (!isReserved(arraySelectTime, arrPeriodTime).result) {
          setPeriod((prev) => [time, ...prev]);
        } else {
          setPeriod([time]);
        }
      } else {
        
        if (!isReserved(arrPeriodTime, arraySelectTime).result) {
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

  const getReserves = async () => {
    console.log(currentDate);
    await fetch(`http://localhost:8080/https://molot.papillon.ru/rty/wht/reserv/get.php?dates=[${getFormatDate(currentDate)}]&box=1`,{
   headers: {
    'Content-Type': 'application/json',
    'X-Requested-With': 'XMLHttpRequest', 
  }, 
  }).then((data) => data.json()).then((data) => setReserves(
    data[0]?.intervals
    // reservedTime.filter((el) => el.date === getFormatDate(currentDate))[0]?.reserves
  ))
  // console.log(data)  
  // if (currentDate) {
      
  //   }
  };

  const deleteReserve = async (e, currentReserve) => {
    e.preventDefault()
    const reserve = {
      ...currentReserve,
      free: true  
    }
    
      
      await fetch(`http://localhost:8080/https://molot.papillon.ru/rty/wht/reserv/set.php?box=1`,
        {
          method: "POST",
          headers: {
            'Content-Type': 'application/json',
            'X-Requested-With': 'XMLHttpRequest', 
          }, 
          body: JSON.stringify(reserve)
        }
      ).then(data => console.log(data))
      await getReserves()
      console.log(reserve)
  }

  const addReserve = async () => {

    const duration =
      period.length === 2
        ? converter(period[1]) - converter(period[0]) + step
        : step

    
    const reserve = {
      id: null,
      date: getFormatDate(currentDate),
      time: { start: period[0], duration: duration },
      free: false,
      person: {
        id: currentUser.id,
      },
    }

    
    await fetch(`http://localhost:8080/https://molot.papillon.ru/rty/wht/reserv/set.php?box=1`,
      {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          'X-Requested-With': 'XMLHttpRequest', 
        }, 
        body: JSON.stringify(reserve)
      }
    )
  }

  const getCurDate = (arg) => {
    console.log(new Date(arg.$d).getTime());
    setCurrentDate(dayjs(new Date(arg.$d).getTime()));
  };

  const paintYellowDiv = (time) => {
    
    if ( 
      period.indexOf(time) >= 0 ||
      (period.length === 2 &&
        converter(time) > converter(period[0]) &&
        converter(time) < converter(period[1]))

    ) {
      return settings.classes.btn.selected;
    } else {
      return "";
    }
  };

  const reserveTime = async (e) => {
    await addReserve();
    setPeriod([]);
    await getReserves();
    
  };

  const paintBlueDiv = (time) => {
    if (
      time === hovered ||
      (period.length === 1 &&
        converter(time) > Math.min(converter(period[0]), converter(hovered)) &&
        converter(time) < Math.max(converter(period[0]), converter(hovered)))
    ) {
      return settings.classes.btn.hovered;
    } else {
      return "";
    }
  };

  React.useEffect(() => {
    console.log("Резервированое время: " + reserves);
  }, [reserves]);

  React.useEffect(() => {
    getReserves();
  }, [currentDate]);

  React.useEffect(() => {
    console.log("Период равен: " + period);
    if (period.length === 2) {
      console.log("Период равен: " + period);
    }
  }, [period]);

  React.useEffect(() => {
    console.log(currentUser)
  }, [currentUser]);

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
        return {
          result: true,
          isCurrentUser: reserve.person.id === currentUser.id,
          reserveId: reserve.id,
          personId: reserve.person.id,
        };
      }
    }
    return {
      result: false
    }
  };

  const paintUserDiv = (isCurrentUser) => {
    // currentUser?.id === reserves?.person?.id ? "reserved-div div-time" : "current-userDiv div-time";
    // for(let i = 0; i < reserves.length; i++){
    //  if(currentUser.id === reserves[i].person.id){
    //   return "current-userDiv"
    // }
    //   else{
    //   return "reserved-div"
    // }
    return isCurrentUser ? settings.classes.btn.currentReserve : settings.classes.btn.reserve
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
      const reserved = isReserved([currentHours, currentMinutes], newTime)
      const btn = reserved.result ? (
        <div data-id={reserved.reserveId} onContextMenu={(e) => handleContextMenu(e, reserved.isCurrentUser)} className={`${settings.classes.btn.default} ${paintUserDiv(reserved.isCurrentUser)}`}>{time} - {endTime}</div>
      ) : (
        <div
          onContextMenu={contextMenuDiv}
          data-time={time}
          onMouseLeave={handleMouseLeave}
          onMouseEnter={handleMouseEnter}
          onClick={handleClick}
          className={`${settings.classes.btn.default} ${paintYellowDiv(time)} ${paintBlueDiv(time)}`}
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
    
    const id = event.currentTarget.value
    setCurrentUserId(id)
    setCurrentUser(
      users[id]
    )
  }

  React.useEffect(() => {
    
    console.log(reserves)
  }, [changeUser]);

  
  const UserLogo = (props) => {
    return(
      <div>
        <img className={settings.classes.dropdown.logo} src={props.logo}></img>
      </div>
    )
  }

  const UserDropdown = (props) => {
    return(
      <div>
          <select name="select-user" className={settings.classes.dropdown.userList} 
          onChange={props.changeUser} 
          // value={currentUser.name}
          value={props.id}
          id="users">
            {props.users.map((e, idx) => <option value={idx} key={idx}>{e.name}</option>)}
          </select>
        </div>
    )
  }
  const [peopleAmount, setPeopleAmount] = React.useState();

  const getPeopleNumber = (e) => {
    setPeopleAmount(e.target.value)
  }

  const Modalpopup = (props) => {
    const reserveButton = () => {
      reserveTime()
      setOpen(false)
    }
    return (
      <div>
        <Button onClick={() => period.length > 1 ? setOpen(true) : alert("Выберите время начала и время окончания!")} variant="contained">Перейти к бронированию</Button>
        <Dialog open={open} fullWidth>
          <DialogTitle>Бронирование с {props.period[0]} по {props.period[1]}<IconButton style={{float:'right'}}><CloseIcon onClick={() => setOpen(false)} color="primary"></CloseIcon></IconButton></DialogTitle>
          <DialogContent>
            <Stack spacing={2} margin={2}>
              <InputLabel id="peopleAmount">Введите количество человек</InputLabel>
              <Select
              value={peopleAmount}
              onChange={getPeopleNumber}
              >
                <MenuItem value={1}>1</MenuItem>
                <MenuItem value={2}>2</MenuItem>
                <MenuItem value={3}>3</MenuItem>
                <MenuItem value={4}>4</MenuItem>
                <MenuItem value={5}>5</MenuItem>
                <MenuItem value={6}>6</MenuItem>
              </Select>
              <TextField variant="outlined" label="Аппаратура"></TextField>
            </Stack>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpen(false)} color="error" variant="contained">Отмена</Button>
            <Button onClick={reserveButton} color="success" variant="contained">Забронировать</Button>
          </DialogActions>
        </Dialog>
      </div>
    );

  }

  const BasicDatePicker = () => {
    return (
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DemoContainer components={["DatePicker"]}>
          <DatePicker
            style={{width: "max-content"}}
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
    <div  onClick={() => setIsVisible(false)}>
      <div onClick={contextMenuClick}>
        {isVisible && (
        <ul className="context" style={{top: position.y - 25, left: position.x -30, zIndex:1000}}>
          <li title={`Дата: ${reserveForDel.date.split('-').reverse().join('.')}\nВремя начала: ${reserveForDel.time.start}\nПродолжительность: ${reserveForDel.time.duration} минут`} className="context__item" onClick={(e) => contextMenuClick(e, "delete")}>Удалить</li>
        </ul>
        )}
      </div>
      <div className={settings.classes.dropdown.userDiv}>
      <UserLogo logo={currentUser.logo} />
      <UserDropdown users={users} changeUser={changeUser} id={currentUserId}/>
      </div>
      
      <BasicDatePicker />
      <div className={settings.classes.btn.flexDiv}>
        <CreateTimeButtons />
        {/* <button onClick={deleteReserve}>Удалить</button> */}
      </div>
      {/* <button className={settings.classes.btn.book} onClick={reserveTime}>Забронировать</button> */}
      <Modalpopup period={period} />
      
        
        
    </div>
  );
};

export default App;
