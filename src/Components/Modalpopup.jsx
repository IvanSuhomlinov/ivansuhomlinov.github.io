import React, { useState } from 'react'
import CloseIcon from "@mui/icons-material/Close";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    IconButton
  } from "@mui/material";
  import GymStack from './GymStack';
  import HamamStack from './HamamStack';
  import CarwashStack from './CarwashStack';

const Modalpopup = (props) => {
  const [peopleAmount, setPeopleAmount] = React.useState(1);
  const [childrenAmount, setChildrenAmount] = React.useState(1);
  const [adultRobe, setAdultRobe] = React.useState(1);
  const [price, setPrice] = React.useState("");
  const [childrenRobeAmount, setChildrenRobeAmount] = React.useState(1)
  const handleReserve = React.useCallback(() => {
    props.onReserve(peopleAmount, adultRobe);
    refresh();
  }, [peopleAmount, adultRobe, props.onReserve]);

  const handlePeopleChange = (e) => {
    setPeopleAmount(e.target.value);
  };

  const handleChildrenChange = (e) => {
    setChildrenAmount(e.target.value)
  }

  const handleRobeChange = (e) => {
    setAdultRobe(e.target.value);
  };

  const refresh = () => {
    setPeopleAmount(1);
    setAdultRobe(1);
  };

  const handleClose = () => {
    refresh();
    props.onClose();
  };

  const handleChildrenRobe = (e) => {
    setChildrenRobeAmount(e.target.value)
  }

  const changePrice = async () => {
    function extractString(str) {
      const regex = /(?<=:)(.*?)(?=Р)/;
      const match = str.match(regex);
      return match ? match[0] : null;
  }
    const priceData = await props.priceCounter(props.period[0], peopleAmount, adultRobe, props.mode, props.date?.split(".").reverse().join("-"), childrenAmount, childrenRobeAmount)
    const price = extractString(priceData)
    setPrice(price);
    // console.log(await props.priceCounter(props.period[0], peopleAmount, props.mode, props.date?.split(".").reverse().join("-")))
  }

  React.useEffect(() => {
    if(props.isOpen){
      changePrice();
    }
  }, [props.isOpen]);

  React.useEffect(() => {
    changePrice()
  }, [peopleAmount]);

  React.useEffect(() => {
    changePrice()
  }, [childrenAmount])

  React.useEffect(() => {
    changePrice()
  }, [childrenRobeAmount])

  React.useEffect(() => {
    changePrice()
  }, [adultRobe]);

  const childrenSelector = [1,2,3,4,5,6,7,8]
  const peopleSelector = [1,2,3,4,5,6,7,8]
  const robe = [1,2,3,4,5,6,7,8]
  const childrenRobe = [1,2,3,4,5,6,7,8]

  
  

  return (
    <Dialog open={props.isOpen} fullWidth>
      <DialogTitle>
        Бронирование с {props.period[0]} до {props.endTime} на дату{" "}
        {props.date.split("-").reverse().join(".")}
        <IconButton style={{ float: "right" }}>
          <CloseIcon onClick={handleClose} color="primary"></CloseIcon>
        </IconButton>
      </DialogTitle>
      <DialogContent>
        {props.currentSport === "Зал" ? (
          <GymStack 
            peopleAmount={peopleAmount}
            handlePeopleChange={handlePeopleChange}
            peopleSelector={peopleSelector}
            adultRobe={adultRobe}
            handleRobeChange={handleRobeChange}
            robe={robe}
            price={price}
          />
        ) : props.currentSport === "Хамам" ? (
        <HamamStack 
            peopleAmount={peopleAmount}
            handlePeopleChange={handlePeopleChange}
            peopleSelector={peopleSelector}
            adultRobe={adultRobe}
            handleRobeChange={handleRobeChange}
            robe={robe}
            price={price}
            childrenSelector={childrenSelector}
            handleChildrenChange={handleChildrenChange}
            childrenAmount={childrenAmount}
            childrenRobe={childrenRobe}
            childrenRobeAmount={childrenRobeAmount}
            handleChildrenRobe={handleChildrenRobe}
        />
      ) : <CarwashStack />}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="error" variant="contained">
          Отмена
        </Button>
        <Button onClick={handleReserve} color="success" variant="contained">
          Забронировать
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default Modalpopup
