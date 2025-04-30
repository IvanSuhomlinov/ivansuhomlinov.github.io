import React from 'react'
import CloseIcon from "@mui/icons-material/Close";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    IconButton,
    InputLabel,
    MenuItem,
    Select,
    Stack,
  } from "@mui/material";

const Modalpopup = (props) => {
  const [peopleAmount, setPeopleAmount] = React.useState(1);
  const [adultRobe, setAdultRobe] = React.useState(1);
  const [price, setPrice] = React.useState("");
  const handleReserve = React.useCallback(() => {
    props.onReserve(peopleAmount, adultRobe);
    refresh();
  }, [peopleAmount, adultRobe, props.onReserve]);

  const handlePeopleChange = (e) => {
    setPeopleAmount(e.target.value);
  };

  const handleInventoryChange = (e) => {
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

  const changePrice = async () => {
    function extractString(str) {
      const regex = /(?<=:)(.*?)(?=Р)/;
      const match = str.match(regex);
      return match ? match[0] : null;
  }
    const priceData = await props.priceCounter(props.period[0], peopleAmount, props.mode, props.date?.split(".").reverse().join("-"), adultRobe)
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

  const childrenSelector = [1,2,3,4,5,6,7,8]
  const peopleSelector = [1,2,3,4,5,6,7,8]
  const robe = [1,2,3,4,5,6,7,8]

  return (
    <Dialog open={props.isOpen} fullWidth>
      <DialogTitle>
        Бронирование с {props.period[0]} на {props.duration <= 60 ?  props.duration + " минут" : (props.duration / 60) <= 4 ? (props.duration / 60) + " часа" : (props.duration / 60) + " часов"} на дату{" "}
        {props.date.split("-").reverse().join(".")}
        <IconButton style={{ float: "right" }}>
          <CloseIcon onClick={handleClose} color="primary"></CloseIcon>
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <Stack spacing={2} margin={2}>
          <InputLabel id="peopleAmount">Выберите количество человек</InputLabel>
          
          <Select value={peopleAmount} onChange={handlePeopleChange}>
            {peopleSelector.map((e, idx) => {
              return(
              <MenuItem key={idx} value={e}>{e}</MenuItem>
              )
            })}
            
          </Select>
          
          <InputLabel>Выберите количество халатов</InputLabel>
          <Select value={adultRobe} onChange={handleInventoryChange}>
            <MenuItem value="none">Без халатов</MenuItem>
            {robe.map((e, idx) => {
              return(
                <MenuItem key={idx} value={e}>{e} шт</MenuItem>
              )
            })}
          </Select>
          Итого: {price}
        </Stack>
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
