import React from 'react';
import ReactDOM from 'react-dom/client';
import './booking.css';
import Book from './Book';


const booking_root = ReactDOM.createRoot(document.getElementById('booking-root'));
booking_root.render(
  <React.StrictMode>
    <Book />
  </React.StrictMode>
);

