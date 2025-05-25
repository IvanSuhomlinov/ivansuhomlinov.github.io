import * as React from "react";
import dayjs from "dayjs";
import {Button} from "@mui/material";
import 'dayjs/locale/ru';
import updateLocale from 'dayjs/plugin/updateLocale';
import Modalpopup from "./Components/Modalpopup";
import BasicDatePicker from "./Components/BasicDataPicker";
import converter from "./Components/converter";
import getFormatDate from "./Components/getFormateDate";
import { useState } from "react";

dayjs.extend(updateLocale);


const App = ({...props}) => {
  /* period.indexOf(time) >= 0 || period.length === 2 && (converter(time) > converter(period[0]) && converter(time) < converter(period[1])) ? "selected-div" : ""*/
  /*time === hovered || period.length === 1 && (converter(time) > Math.min(converter(period[0]), converter(hovered)) && converter(time) < Math.max(converter(period[0]), converter(hovered))) ? "hovered-div" : ""*/
  
  const [step, setStep] = useState(30);
  const [period, setPeriod] = useState([]);
  const [hovered, setHovered] = useState("");
  const [reserves, setReserves] = useState([]);
  const [currentSport, setCurrentSport] = useState("Зал");
  const [users, setUsers] = React.useState([
    {
      name: "Ческидов Александр Леонидович",
      id: "4937",
      logo: "https://avatars.mds.yandex.net/i?id=238b2b70a2e06e504bb39372d79b19a8_l-3598775-images-thumbs&n=13",
    },
    {
      name: "Иванов Андрей Петрович",
      id: "78",
      logo: "https://i.pinimg.com/originals/82/ec/87/82ec8770fec12e698bd634de368cfa9a.jpg",
    },
  ]);
  const [currentDate, setCurrentDate] = React.useState(dayjs(Date.now()));
  const [currentUserId, setCurrentUserId] = React.useState(0);
  const [currentUser, setCurrentUser] = React.useState(users[currentUserId]);
  const [isVisible, setIsVisible] = React.useState(false);
  const [position, setPosition] = React.useState({ x: 0, y: 0 });
  const [reserveForDel, setReserveForDel] = React.useState({});
  const [open, setOpen] = React.useState(false);
  const [mode, setMode] = React.useState(2);
  const [timeLong, setTimeLong] = React.useState(0)
  const [endTime, setEndTime] = React.useState("")
  const halls = ["Зал", "Хамам", "Автомойка"]

  const settings = {
    styles: {
      btn:{
        default: {width: "120px", borderRadius: "100px", backgroundColor:"#e8e8e8", color: "#333", boxShadow: "0 0 0 0 #fff",  ...props.customStyles?.btn?.default},
        reserved: {backgroundColor: "rgba(0, 0, 0, .3)", cursor: "not-allowed", ...props.customStyles?.btn?.reserved},
        hovered: {backgroundColor: "aquamarine", ...props.customStyles?.btn?.hovered},
        delete: {borderRadius: "15px", borderWidth: "1px", fontFamily: "Arial, Helvetica, sans-serif", ...props.customStyles?.btn?.delete},
        book: {borderRadius:"15px", fontFamily: "Arial, Helvetica, sans-serif", fontSize:"15px", ...props.customStyles?.btn?.book},
        selected: {backgroundColor: "rgb(255,255,107)", ...props.customStyles?.btn?.selected},
        currentReserve: {backgroundColor: "rgb(65,251,65)", ...props.customStyles?.btn?.currentReserve}
      },
      dropdown:{
        userLogo: {height: "30px", width:"30px", borderRadius:"50%", margin:"5px", ...props.customStyles?.dropdown?.userLogo},
        userList: {height: "30px", width:"200px", backgroundColor: "rgb(144,144,144)", fontFamily: "Arial, Helvetica, sans-serif", borderRadius:"20px", margin:"5px", ...props.customStyles?.dropdown?.userList}
      },
      context:{
        context:{backgroundColor:"white", border:"1px solid grey", padding:"0", position:"absolute", borderRadius:"2px", width:"100px", ...props.customStyles?.context?.context},
        contextItem: {width: "Calc(100%-20px)", cursor:"pointer", listStyle:"none", margin:"0", padding:"10px 20px", ...props.customStyles?.context?.contextItem}
      }
    },
    classes: {
      btn: {        
        reserve: props.customClasses?.btn?.reserved || "btn--reserved",
        currentReserve: props.customClasses?.btn.currentReserve || "btn--current-reserve",
        hovered: props.customClasses?.btn.hovered || "btn--hovered",
        selected: props.customClasses?.btn.seleted || "btn--selected",
        flexDiv: props.customClasses?.btn.flexDiv || "btn--flex-div",
        book: props.customClasses?.btn.book || "btn--book",
        delete: props.customClasses?.btn.delete || "btn--delete",
      },
      dropdown: {
        userList:
          props.customClasses?.dropdown.userList || "dropdown--user-list",
        userDiv: props.customClasses?.dropdown.userDiv || "dropdown--user-div",
        logo: props.customClasses?.dropdown.logo || "dropdown--user-logo",
      },
    },
  };
  // const [personReserve, setPersonReserve] = React.useState({
  //   person: {
  //     inventory: false,
  //     people: 1,
  //   },
  // });




  const handleReserve = async (peopleAmount, inventory) => {
    const duration =
      period.length === 2
        ? converter(period[1]) - converter(period[0]) + step
        : step;

    const reserve = {
      id: null,
      date: getFormatDate(currentDate),
      time: { start: period[0], duration: duration },
      free: false,
      person: {
        id: currentUser.id,
      },
      options: {
        visitors: [
          {
            name: "adult",
            count: peopleAmount,
          },
        ],
        inventory: [
          {
            name: inventory,
            count: null,
          },
        ],
      },
    };
    await addReserve(reserve);
    await getReserves();

    setOpen(false);
  };

  const contextMenuClick = (e, action = "default") => {
    e.stopPropagation();
    switch (action) {
      case "delete":
        deleteReserve(e, reserveForDel);
      default:
        console.log("default");
    }
  };

  const handleContextMenu = (e, isCurrentUser) => {
    if (isCurrentUser) {
      e.preventDefault();
      const id = e.currentTarget.dataset.id;
      setReserveForDel(...reserves.filter((el) => el.id === id));
      setPosition({x: e.clientX, y: e.clientY});
      setIsVisible(true);
    }
  };

  const handleMouseEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();
    // e.currentTarget.style.color = "aquamarine"
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
        if (!isReserved(arrPeriodTime, arraySelectTime).result) {
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
    const newEndTime = event.currentTarget.dataset.endTime;
  
 
  if (period.length === 0) {
    setEndTime(newEndTime);
  } 
  // Если это второй клик (конец периода)
  else if (period.length === 1) {
    // Устанавливаем более позднее время как endTime
    const currentEnd = converter(newEndTime);
    const prevEnd = converter(endTime);
    setEndTime(currentEnd > prevEnd ? newEndTime : endTime);
  }
  else {
    setEndTime(newEndTime);
  }
    

    comparePeriod(currentTime);
  };

  const contextMenuDiv = (e) => {
    e.preventDefault();
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

  

  

  const getReserves = async () => {
    console.log(currentDate);
    await fetch(
      `http://localhost:8080/https://molot.papillon.ru/rty/wht/reserv/get.php?dates=[${getFormatDate(
        currentDate
      )}]&box=1`,
      {
        headers: {
          "Content-Type": "application/json",
          "X-Requested-With": "XMLHttpRequest",
        },
      }
    )
      .then((data) => data.json())
      .then((data) =>
        setReserves(
          data[0]?.intervals
          // reservedTime.filter((el) => el.date === getFormatDate(currentDate))[0]?.reserves
        )
      );
    // console.log(data)
    // if (currentDate) {

    //   }
  };

  const longCounter = () => {
    if(currentSport === "Хамам"){
      let long = document.querySelectorAll("[data-is-active='true']")
      return long.length * -1
      
    }
    else{

      if(period.length === 2){

        let long = converter(period[1]) - converter(period[0]) + step
        return long;

      }

      else{
        return step;
      }
      
    }
  }

  const priceCounter = async (startTime, peopleAmount, adultRobe, mode, reservationDate, childrenAmount, childrenRobeAmount) => {
    console.log(startTime)
    if(!startTime){
      return ""
    }

    let [h, m] = startTime?.split(":")
    
    const data = {
      utime: +new Date(`${reservationDate}T00:00:00+05:00`) / 1000,
      // utime: 1745002800,
      mode: mode,
      service: 1,
      minute1: Number(m),
      hour1: Number(h),
      time_long: longCounter(),
      count_user: peopleAmount,
      count_child: childrenAmount,
      robe1: adultRobe,
      robe2: childrenRobeAmount,
    };
    // const data = {
    //   utime: 1744052400,
    //   mode: 1,
    //   service: 1,
    //   minute1: 0,
    //   hour1: 8,
    //   time_long: -1,
    //   count_user: 1,
    //   count_child: 0,
    //   robe1: 0,
    //   robe2: 4,
    // };
    const jsonData = JSON.stringify(data);

    function objectToFormData(obj) {
      const formData = new FormData();
    
    
      const jsonStr = JSON.stringify(obj);
    
    
      formData.append('jsonData', jsonStr);
    
      return formData;
    }

    const formData = objectToFormData(data);
    // const formData = new FormData();
    for(const [k,v] of Object.entries(data)){
      console.log(k,": " , v)
      formData.append(k,v)
    }
    
  
    // console.log("Форм дата: " + JSON.stringify(formData))
    return await fetch('http://localhost:8080/https://rider74.ru/rty/api74.php?put=1', {
      method: 'POST', // Указываем метод POST
      // headers: {
      //   'Content-Type': 'application/x-www-form-urlencoded' 
      // },
      body: formData
    }).then(data => data.text())

  }

  const deleteReserve = async (e, currentReserve) => {
    e.preventDefault();
    const reserve = {
      ...currentReserve,
      free: true,
    };

    await fetch(
      `http://localhost:8080/https://molot.papillon.ru/rty/wht/reserv/set.php?box=1`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Requested-With": "XMLHttpRequest",
        },
        body: JSON.stringify(reserve),
      }
    ).then((data) => console.log(data));
    await getReserves();
    console.log(reserve);
  };

  const addReserve = async (reserve) => {
    await fetch(
      `http://localhost:8080/https://molot.papillon.ru/rty/wht/reserv/set.php?box=1`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Requested-With": "XMLHttpRequest",
        },
        body: JSON.stringify(reserve),
      }
    );
  };

  const getCurDate = (date) => {
    console.log(date.day())
    setCurrentDate(date);
  };

  const getActiveStyle = (time) => {
    if (
      period.indexOf(time) >= 0 ||
      (period.length === 2 &&
        converter(time) > converter(period[0]) &&
        converter(time) < converter(period[1]))
    ) {
      return {
        isActive: true,
        activeStyles:{backgroundColor: "yellow"}
      };
    } else {
      return {
        isActive: false,
        activeStyles:{}
      };
    }
  };

  // const reserveTime = async (e) => {
  //   await addReserve();
  //   setPeriod([]);
  //   await getReserves();
  // };

  const getHoveredStyle = (time) => {
    
    if (
      time === hovered ||
      (period.length === 1 &&
        converter(time) > Math.min(converter(period[0]), converter(hovered)) &&
        converter(time) < Math.max(converter(period[0]), converter(hovered)))
    ) {
      return {backgroundColor: "aquamarine"};
    } else {
      return {};
    }
  };

  React.useEffect(() => {
    console.log("Резервированое время: " + reserves);
  }, [reserves]);

  React.useEffect(() => {
    getReserves();
  }, [currentDate]);

  React.useEffect(() => {
    // if(period.length >= 1){
    //   const activeButtons = document.querySelectorAll("[data-is-active='true']");
    // const endTimes = Array.from(activeButtons).map(button => 
    //   Number(button.dataset.endTime || 0)
    // );
    
    // const maxEndTime = endTimes.length > 0 
    //   ? Math.max(...endTimes) 
    //   : 0;
    
    // console.log("Active endTimes:", endTimes); // Отладка
    // setEndTime(maxEndTime);
    // }
    if (period.length === 2) {
      console.log("Период равен: " + period);
    }
  }, [period]);

  React.useEffect(() => {
    console.log(currentUser);
    console.log("последние времена: " + endTime)
  }, [currentUser]);

  React.useEffect(() => {
  console.log(currentSport)
  }, [currentSport]);

  const increaseTime = (h, m, step) => {
    // console.log(h,m,step)
    h = Number(h) + Math.floor(Number(step) / 60);
    m = Number(m) + (Number(step) % 60);
    if (m >= 60) {
      h += 1;
      m -= 60;
    }
    // if(h >= 24){
    //   h = h - 24; 
    // }
    return [h, m];
  };

  const isReserved = (t1, t2) => {
    if (reserves) {
      for (const reserve of reserves) {
        const { start, duration } = reserve.time;

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
      result: false,
    };
  };

  const getCurrentReserveStyle = (isCurrentUser) => {
    // currentUser?.id === reserves?.person?.id ? "reserved-div div-time" : "current-userDiv div-time";
    // for(let i = 0; i < reserves.length; i++){
    //  if(currentUser.id === reserves[i].person.id){
    //   return "current-userDiv"
    // }
    //   else{
    //   return "reserved-div"
    // }
    return isCurrentUser
      ? {backgroundColor: "#72dc74"}
      : {backgroundColor: "#b2b2b2", color: "#77787a"};
  };

  // const createTimeBtns = (startTime, endTime, step) => {
  //   let timeBtns = [];

  //   let [currentHours, currentMinutes] = String(startTime)
  //     .split(":")
  //     .map((el) => Number(el));
  //   const [endHours, endMinutes] = endTime.split(":").map((el) => Number(el));
  //   while (
  //     currentHours < endHours ||
  //     (currentHours === endHours && currentMinutes <= endMinutes)
  //   ) {
  //     const newTime = increaseTime(currentHours, currentMinutes, step);
  //     const [newHours, newMinutes] = newTime;

  //     const time =
  //       String(currentHours).padStart(2, "0") +
  //       ":" +
  //       String(currentMinutes).padStart(2, "0");
  //     const endTime =
  //       String(newHours).padStart(2, "0") +
  //       ":" +
  //       String(newMinutes).padStart(2, "0");
  //     const reserved = isReserved([currentHours, currentMinutes], newTime);
  //     const btn = reserved.result ? (
  //       <Button variant="contained" disabled
  //         data-id={reserved.reserveId}
  //         onContextMenu={(e) => handleContextMenu(e, reserved.isCurrentUser)}
  //         className={`${settings.classes.btn.default} ${getCurrentReserveStyle(
  //           reserved.isCurrentUser
  //         )}`}
  //       >
  //         {time} - {endTime}
  //       </Button>
  //     ) : (
  //       <Button
        
  //         onContextMenu={contextMenuDiv}
  //         data-time={time}
  //         onMouseLeave={handleMouseLeave}
  //         onMouseEnter={handleMouseEnter}
  //         onClick={handleClick}
  //         className={`${settings.classes.btn.default} ${getActiveStyle(
  //           time
  //         )} ${getHoveredStyle(time)}`}
  //       >
  //         {time} - {endTime}
  //       </Button>
  //     );

  //     timeBtns.push(btn);
  //     currentHours = newHours;
  //     currentMinutes = newMinutes;
  //   }
  //   return timeBtns;
  // };

  const reservationBody = (count, currentHours, currentMinutes, clean, timeBtns, step) => {
        count -= 1;        
        const newTime = increaseTime(currentHours, currentMinutes, step) 
        let [newHours, newMinutes] = newTime;
        const finalTime = increaseTime(newHours, newMinutes, clean)
        const [finalHours, finalMinutes] = finalTime;
        const time =
          String(currentHours  >= 24 ? currentHours - 24 : currentHours).padStart(2, "0") +
          ":" +
          String(currentMinutes).padStart(2, "0");
        const endTime =
          String(newHours >= 24 ? newHours - 24 : newHours).padStart(2, "0") +
          ":" +
          String(newMinutes).padStart(2, "0");
          const curTime = currentDate.toDate()
          curTime.setHours(currentHours)
          curTime.setMinutes(currentMinutes)
          const isCorrectTime =  curTime.getTime() > Date.now()
          const reserved = isReserved([currentHours, currentMinutes], newTime);
          const btn = reserved.result || !isCorrectTime ? (
            <Button variant="contained" 
            style={{...settings.styles.btn.default, ...getCurrentReserveStyle(reserved.isCurrentUser && isCorrectTime)}}
              data-id={reserved.reserveId}
              data-end-time={endTime}
              onContextMenu={(e) => handleContextMenu(e, reserved.isCurrentUser)}
              // className={`${settings.classes.btn.default} ${getCurrentReserveStyle(
              //   reserved.isCurrentUser
              // )}`}
            
            >
              {time} - {endTime}
            </Button>
          ) : (() => {
            const {isActive, activeStyles} = getActiveStyle(time);
             return <Button
              variant="contained"
              style={{...settings.styles.btn.default, ...getHoveredStyle(time), ...activeStyles}}
              onContextMenu={contextMenuDiv}
              data-time={time}
              data-end-time={endTime}
              data-is-active={isActive}
              onMouseLeave={handleMouseLeave}
              onMouseEnter={handleMouseEnter}
              onClick={handleClick}
              // className={`${settings.classes.btn.default} ${getActiveStyle(
              //   time
              // )} ${getHoveredStyle(time)}`}
            >
              {time} - {endTime}
            </Button>}
          )()
  
        timeBtns.push(btn)
        currentHours = finalHours;
        currentMinutes = finalMinutes;
        
        return [count, currentHours, currentMinutes]
  }


  const timeButtons = (startTime, endTime, options) => {
    const convert = (string) => {
      return string.split(":").map((el, idx) => idx === 0 ? Number(el) * 60: Number(el)).reduce((acc, el) => acc + el, 0)
    }
    
    let timeBtns = [];
    let [currentHours, currentMinutes] = String(startTime).split(":").map((el) => Number(el))
    options.forEach(element => {
    let step = element.step;
    let count = element.count || -1;
    const clean = element.clean || 0;
    
    const [endHours, endMinutes] = String(endTime).split(":").map((el) => Number(el))
    if(convert(startTime) >= convert(endTime)){
      while(count !== 0 && (currentHours + Math.floor(step / 60)) < 23 || ((currentHours + Math.floor(step / 60)) === 23 && currentMinutes + Math.floor(step % 60) <= 59)){
        [count, currentHours, currentMinutes] = reservationBody(count, currentHours, currentMinutes, clean, timeBtns, step)
      }
     
      while(count !== 0 && (currentHours + Math.floor(step / 60)) < endHours + 24 || ((currentHours + Math.floor(step / 60)) === endHours + 24 && currentMinutes + Math.floor(step % 60) <= endMinutes)){
      [count, currentHours, currentMinutes] = reservationBody(count, currentHours, currentMinutes, clean, timeBtns, step)
      }
    }
    else while(count !== 0 && (currentHours + Math.floor(step / 60)) < endHours || ((currentHours + Math.floor(step / 60)) === endHours && currentMinutes + Math.floor(step % 60) <= endMinutes)){
        [count, currentHours, currentMinutes] = reservationBody(count, currentHours, currentMinutes, clean, timeBtns, step)
    }
    });

    
    return timeBtns
  }


  const CreateTimeButtons = () => {
    // return hamamTimeButtons("8:00", "01:00", [{step: 90, clean: 30, count: 1}, {step: 180, clean: 60}])
    // const createTime = timeList.map((time, index) => {
    //   const [hours, minutes] = time.split(":").map((el) => Number(el));
    //   const newTime = increaseTime(hours, minutes, step);
    //   return isReserved([hours, minutes], newTime) ? (
    //     <div className="reserved-div">{time}</div>
    //   ) : (

    //     <div id={index} data-time={time} onMouseLeave={handleMouseLeave} onMouseEnter={handleMouseEnter} onClick={handleClick}
    //     className={`div-time ${getActiveStyle(time)} ${getHoveredStyle(time)}`}>
    //       {time}
    //     </div>
    //   );
    // });

    

    if(currentSport === "Зал"){
      setMode(2)
      setStep(30)
      return timeButtons("06:00", "23:00", [{step:30}]);
    }
    else if(currentSport === "Хамам"){
      setMode(1)
      setStep(180)
      return timeButtons("8:00", "01:00", [{step: 90, clean: 30, count: 1}, {step: 180, clean: 60}])
    }
    else{
      setMode(0)
      setStep(15)
      return timeButtons("00:00", "00:00", [{step:15}]);
    }
    // return createTime;
    
    
    
  };

  const changeUser = (event) => {
    const id = event.currentTarget.value;
    setCurrentUserId(id);
    setCurrentUser(users[id]);
  };

  React.useEffect(() => {
    console.log(reserves);
  }, [changeUser]);

  React.useEffect(() =>{
    setPeriod([])
    setEndTime("")
  },[currentDate, mode])
  

  const UserLogo = (props) => {
    return (
      <div>
        <img className={settings.classes.dropdown.logo} src={props.logo}></img>
      </div>
    );
  };

  const UserDropdown = (props) => {
    return (
      <div>
        <select
          name="select-user"
          className={settings.classes.dropdown.userList}
          onChange={props.changeUser}
          // value={currentUser.name}
          value={props.id}
          id="users"
        >
          {props.users.map((e, idx) => (
            <option value={idx} key={idx}>
              {e.name}
            </option>
          ))}
        </select>
      </div>
    );
  };

  // const getPeopleNumber = (e) => {
  //   const people = e.target.value
  //   setPeopleAmount(people)
  //   setPersonReserve((prev) => ({
  //     ...prev,
  //     person: {
  //       ...prev.person,
  //       people: people
  //     }
  //   }))
  // }

  // const getInventory = (e) => {
  //   const inventory = e.target.value
  //   setInventory(inventory)
  //   setPersonReserve((prev) => ({
  //     ...prev,
  //     person: {
  //       ...prev.person,
  //       inventory: inventory
  //     }
  //   }))
  // }
  
  
  const changeSport = (e) => {
    setCurrentSport(e.target.value)
    
  }


  const SportDropdown = (props) => {
    return(
      <div>
        <select value={currentSport} className={settings.classes.dropdown.userList} onChange={props.changeSport}>
          {props.halls.map((e, idx) => (
            <option value={e} key={idx}>
              {e}
            </option>
          ))}
        </select>
      </div>
    );
  };

  
  

  return (
    <div onClick={() => setIsVisible(false)}>
      <div>
        {isVisible && (
          <ul
            className="context"
            style={{
              top: position.y - 25,
              left: position.x - 30,
              zIndex: 1000,
            }}
          >
            <li
              title={`Дата: ${reserveForDel.date
                .split("-")
                .reverse()
                .join(".")}\nВремя начала: ${
                reserveForDel.time.start
              }\nПродолжительность: ${reserveForDel.time.duration} минут`}
              className="context__item"
              onClick={(e) => contextMenuClick(e, "delete")}
            >
              Удалить
            </li>
          </ul>
        )}
      </div>
      <div className={settings.classes.dropdown.userDiv}>
        <UserLogo logo={currentUser.logo} />
        <UserDropdown
          users={users}
          changeUser={changeUser}
          id={currentUserId}
        />
      </div>

      <BasicDatePicker currentDate={currentDate} getCurDate={getCurDate}/>

      <SportDropdown changeSport={changeSport} halls={halls} />
      <div className={settings.classes.btn.flexDiv}>
        <CreateTimeButtons />
        {/* <button onClick={deleteReserve}>Удалить</button> */}
      </div>
      <Button
        onClick={() =>{
          const activeButtons = document.querySelectorAll("[data-is-active='true']")
          console.log(activeButtons.length)
          period.length > 1
            ? setOpen(true)
            : alert("Выберите время начала и время окончания!")
        }}
        variant="contained"
      >
        Перейти к бронированию
      </Button>
      {/* <Button onClick={(e) => console.log(mode)}>Узнать мод</Button> */}
      {/* <button className={settings.classes.btn.book} onClick={reserveTime}>Забронировать</button> */}
      <Modalpopup
        date={getFormatDate(currentDate)}
        onReserve={handleReserve}
        onClose={() => setOpen(false)}
        isOpen={open}
        period={period}
        priceCounter={priceCounter}
        mode={mode}
        increaseTime={increaseTime}
        duration={period.length === 2
          ? converter(period[1]) - converter(period[0]) + step
          : step}
        currentSport={currentSport}
        endTime={endTime}
      />
    </div>
  );
};

export default App;
