import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {step} from "./settings.js"
const customStyles = {
  btn:{
      default: {},
      reserved: {},
      hovered: {},
      delete: {},
      book: {},
      selected: {},
      currentReserve: {}
  },
  dropdown:{
    userLogo: {},
    userList: {}
  },
  context:{
    context: {},
    contextItem: {}
  }
}

const customClasses = {
  
  btn: {
    default: "btn",
    reserved: "btn--reserved",
    currentReserve:"btn--current-reserve",
    hovered:  "btn--hovered",
    selected: "btn--selected",
    flexDiv: "btn--flex-div",
    book: "btn--book",
    delete: "btn--delete"
  }
  ,
  dropdown: {
    userList: "dropdown--user-list",
    userDiv: "dropdown--user-div",
    logo:  "dropdown--user-logo"
  }
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App step={step} customClasses={customClasses} customStyles={customStyles} />
  </React.StrictMode>
);

