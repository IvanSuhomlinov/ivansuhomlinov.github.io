import React from 'react'
import {
    InputLabel,
    MenuItem,
    Select,
    Stack,
  } from "@mui/material";
const HamamStack = ({peopleAmount, handlePeopleChange, peopleSelector, adultRobe, handleRobeChange, robe, price, childrenSelector, handleChildrenChange, childrenAmount}) => {
    return(
        <Stack spacing={2} margin={2}>
          <InputLabel id="peopleAmount">Выберите количество взрослых</InputLabel>
          
          <Select value={peopleAmount} onChange={handlePeopleChange}>
            {peopleSelector.map((e, idx) => {
              return(
              <MenuItem key={idx} value={e}>{e}</MenuItem>
              )
            })}
          </Select>

          <InputLabel id="childrenAmount">Выберите количество детей</InputLabel>
          
          <Select value={childrenAmount} onChange={handleChildrenChange}>
            {childrenSelector.map((e, idx) => {
              return(
              <MenuItem key={idx} value={e}>{e}</MenuItem>
              )
            })}
          </Select>
          
          <InputLabel>Выберите количество халатов</InputLabel>
          <Select value={adultRobe} onChange={handleRobeChange}>
            <MenuItem value="none">Без халатов</MenuItem>
            {robe.map((e, idx) => {
              return(
                <MenuItem key={idx} value={e}>{e} шт</MenuItem>
              )
            })}
          </Select>
          Итого: {price}
        </Stack>
    );
}

export default HamamStack;