import React from 'react'
import {
    InputLabel,
    MenuItem,
    Select,
    Stack,
  } from "@mui/material";
const HamamStack = ({peopleAmount, handlePeopleChange, peopleSelector, adultRobe, handleRobeChange, robe, price, childrenSelector, handleChildrenChange, childrenAmount, childrenRobe, handleChildrenRobe, childrenRobeAmount, commonCount}) => {
    return(
        <Stack spacing={2} margin={2}>
          <InputLabel id="peopleAmount">Выберите количество взрослых</InputLabel>
          
          <Select value={peopleAmount} onChange={handlePeopleChange}>
            {peopleSelector.map((e, idx) => {
              return(
              <MenuItem key={idx} value={e} disabled={e + commonCount.children > 8}>{e}</MenuItem>
              )
            })}
          </Select>

          <InputLabel id="childrenAmount">Выберите количество детей</InputLabel>
          
          <Select value={childrenAmount} onChange={handleChildrenChange}>
            {childrenSelector.map((e, idx) => {
              return(
              <MenuItem key={idx} value={e} disabled={e + commonCount.adults > 8}>{e}</MenuItem>
              )
            })}
          </Select>
          
          <InputLabel>Выберите количество халатов для взрослых</InputLabel>
          <Select value={adultRobe} onChange={handleRobeChange}>
            <MenuItem value="none">Без халатов</MenuItem>
            {robe.map((e, idx) => {
              return(
                <MenuItem key={idx} value={e}>{e} шт</MenuItem>
              )
            })}
          </Select>

          <InputLabel>Выберите количество халатов для детей</InputLabel>
          <Select value={childrenRobeAmount} onChange={handleChildrenRobe}>
            <MenuItem value="none">Без халатов</MenuItem>
            {childrenRobe.map((e, idx) => {
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