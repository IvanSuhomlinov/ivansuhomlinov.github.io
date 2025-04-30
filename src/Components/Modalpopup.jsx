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
  const [inventory, setInventory] = React.useState("none");
  const [price, setPrice] = React.useState("");
  const handleReserve = React.useCallback(() => {
    props.onReserve(peopleAmount, inventory);
    refresh();
  }, [peopleAmount, inventory, props.onReserve]);

  const handlePeopleChange = (e) => {
    setPeopleAmount(e.target.value);
  };

  const handleInventoryChange = (e) => {
    setInventory(e.target.value);
  };

  const refresh = () => {
    setPeopleAmount(1);
    setInventory("none");
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
    const priceData = await props.priceCounter(props.period[0], peopleAmount, props.mode, props.date?.split(".").reverse().join("-"))
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

  return (
    <Dialog open={props.isOpen} fullWidth>
      <DialogTitle>
        Бронирование с {props.period[0]} по {props.period[0] && props.increaseTime(...props.period[0]?.split(":").map((e) => Number(e)), props.duration).join(":")} на дату{" "}
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
          
          <InputLabel>Дополнительные услуги</InputLabel>
          <Select value={inventory} onChange={handleInventoryChange}>
            <MenuItem value="none">Без доп. услуг</MenuItem>
            <MenuItem value="tshirts">
              Халаты на {peopleAmount}{" "}
              {peopleAmount === 1 ? "человека" : "человек"}
            </MenuItem>
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
