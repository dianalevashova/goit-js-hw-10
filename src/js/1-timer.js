import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

import iziToast from 'izitoast';

import 'izitoast/dist/css/iziToast.min.css';

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] < Date.now()) {
      iziToast.error({
        title: 'Error',
        message: 'Please choose a date in the future',
        position: 'topRight',
      });
      refs.startBtn.disabled = true;
    } else {
      userSelectedDate = selectedDates[0];
      refs.startBtn.disabled = false;
      console.log(userSelectedDate);
    }
  },
};

let userSelectedDate = 0;
let interval = 0;
flatpickr('#datetime-picker', options);

const refs = {
  input: document.querySelector('#datetime-picker'),
  startBtn: document.querySelector('[data-start]'),
  dataDays: document.querySelector('[data-days]'),
  dataHours: document.querySelector('[data-hours]'),
  dataMinutes: document.querySelector('[data-minutes]'),
  dataSeconds: document.querySelector('[data-seconds]'),
};

refs.startBtn.disabled = true;
refs.startBtn.addEventListener('click', onStartBtnClick);

function onStartBtnClick(e) {
  refs.startBtn.disabled = true;
  refs.input.disabled = true;
  interval = setInterval(() => {
    const selectedDate = userSelectedDate.getTime();
    const dateNow = Date.now();
    const difInDates = selectedDate - dateNow;
    if (difInDates <= 0) {
      clearInterval(interval);
      refs.input.disabled = false;
      refs.dataDays.textContent = '00';
      refs.dataHours.textContent = '00';
      refs.dataMinutes.textContent = '00';
      refs.dataSeconds.textContent = '00';
      return;
    }
    const { days, hours, minutes, seconds } = convertMs(difInDates);
    refs.dataDays.textContent = String(days).padStart(2, '0');
    refs.dataHours.textContent = String(hours).padStart(2, '0');
    refs.dataMinutes.textContent = String(minutes).padStart(2, '0');
    refs.dataSeconds.textContent = String(seconds).padStart(2, '0');
  }, 1000);
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}
