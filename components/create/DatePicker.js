import React, { useState } from "react";
import Datepicker from "tailwind-datepicker-react"

const options = {
  title: "Demo Title",
  autoHide: true,
  todayBtn: false,
  clearBtn: true,
  clearBtnText: "Clear",
  maxDate: new Date("2030-01-01"),
  minDate: new Date("1950-01-01"),
  theme: {
    background: "bg-gray-400",
    todayBtn: "",
    clearBtn: "",
    icons: "",
    text: "",
    disabledText: "bg-gray-300",
    input: "",
    inputIcon: "",
    selected: "",
  },
  icons: {
    prev: () => <span>Previous</span>,
    next: () => <span>Next</span>,
  },
  datepickerClassNames: "top-12",
  defaultDate: new Date(),
  language: "en",
  disabledDates: [],
  weekDays: ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"],
  inputNameProp: "date",
  inputIdProp: "date",
  inputPlaceholderProp: "Select Date",
  inputDateFormatProp: {
    day: "numeric",
    month: "numeric",
    year: "numeric",
  },
};

const DatePicker = (props) => {
  const [show, setShow] = useState(false);
  const {setDate} = props;
  const handleChange = (selectedDate) => {
    console.log(selectedDate);
    setDate(selectedDate);
  };

  const handleClose = (state) => {
    setShow(state);
  };

  return (
    <div>
      <Datepicker options={options} onChange={handleChange} show={show} setShow={handleClose} />
    </div>
  );
};

export default DatePicker;
