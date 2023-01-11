// Описаний в документації
import flatpickr from 'flatpickr';
// Додатковий імпорт стилів
import 'flatpickr/dist/flatpickr.min.css';

const userInput = document.querySelector('#datetime-picker');
const startBtn = document.querySelector('[data-start]');

const optionsTimer = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] < Date.now()) {
      window.alert('Please choose a date in the future');
      return;
    }
    startBtn.removeAttribute('disabled');
    startBtn.addEventListener('click', () => {
      timer.start(selectedDates[0]);
    });
  },
};

const timer = {
  intervalId: null,

  start(deadline) {
    startBtn.setAttribute('disabled', true);
    this.intervalId = setInterval(() => {
      const ms = deadline - Date.now();

      if (ms <= 0) {
        this.stop();

        return;
      }

      const { days, hours, minutes, seconds } = this.convertMs(ms);

      document.querySelector('[data-days]').textContent = this.pad(days);
      document.querySelector('[data-hours]').textContent = this.pad(hours);
      document.querySelector('[data-minutes]').textContent = this.pad(minutes);
      document.querySelector('[data-seconds]').textContent = this.pad(seconds);
    }, 1000);
  },

  stop() {
    clearInterval(this.intervalId);
  },

  convertMs(ms) {
    // Number of milliseconds per unit of time!!
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
  },

  pad(value) {
    return String(value).padStart(2, 0);
  },
};

flatpickr(userInput, optionsTimer);
