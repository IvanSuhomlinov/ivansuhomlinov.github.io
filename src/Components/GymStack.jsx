
import React from 'react'
import {
    InputLabel,
    MenuItem,
    Select,
    Stack,
  } from "@mui/material";

const GymStack = ({peopleAmount, handlePeopleChange, peopleSelector, adultRobe, handleRobeChange, robe, price}) => {
    return (
        <Stack spacing={2} margin={2}>
          <InputLabel id="peopleAmount">Выберите количество человек</InputLabel>
          
          <Select value={peopleAmount} onChange={handlePeopleChange}>
            {peopleSelector.map((e, idx) => {
              return(
              <MenuItem key={idx} value={e}>{e}</MenuItem>
              )
            })}
            
          </Select>
          
          
          Итого: {price}
        </Stack>
    )
}

export default GymStack