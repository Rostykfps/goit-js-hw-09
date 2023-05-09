import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const refs = {
  startBtn: document.querySelector('[data-start]'),
  days: document.querySelector('[data-days]'),
  hours: document.querySelector('[data-hours]'),
  minutes: document.querySelector('[data-minutes]'),
  seconds: document.querySelector('[data-seconds]'),
};

const currentDate = Date.now();

refs.startBtn.addEventListener('click', onStartClick);

refs.startBtn.setAttribute('disabled', true);

// Обєкт параметрів для flatpickr
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const selectedDate = selectedDates[0].getTime();
    if (selectedDate <= currentDate) {
      Notiflix.Notify.failure('Please choose a date in the future');
      return refs.startBtn.setAttribute('disabled', true);
    }
    refs.startBtn.removeAttribute('disabled');
  },
};

// Використання бібліотеки flatpickr для того, щоб дозволити користувачеві
// кросбраузерно вибрати кінцеву дату і час в одному елементі інтерфейсу
let timeoutId = null;
const selectedDate = flatpickr('#datetime-picker', options);

function onStartClick() {
  const setDate = selectedDate.selectedDates[0];

  timeoutId = setInterval(() => {
    const currentDate = Date.now();
    const dateDifferenceMs = setDate - currentDate;
    if (dateDifferenceMs < 0) {
      return;
    }

    remainTime = convertMs(dateDifferenceMs);
    displayTime(remainTime);
  }, 1000);
  refs.startBtn.setAttribute('disabled', true);
}

// Відображення залишкового часу на сторінці
function displayTime({ days, hours, minutes, seconds }) {
  refs.days.textContent = addLeadingZero(days);
  refs.hours.textContent = addLeadingZero(hours);
  refs.minutes.textContent = addLeadingZero(minutes);
  refs.seconds.textContent = addLeadingZero(seconds);
}

// Конвертер часу з мс
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

// додаває '0', якщо в числі менше двох символів
function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}
