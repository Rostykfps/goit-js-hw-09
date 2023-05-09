refs = {
  startBtn: document.querySelector('[data-start]'),
  stopBtn: document.querySelector('[data-stop]'),
  body: document.querySelector('body'),
};

refs.startBtn.addEventListener('click', onStartClick);
refs.stopBtn.addEventListener('click', onStopClick);

let timeoutId = null;

// Раз на секунду змінює колір фону <body> на випадкове значення
function onStartClick() {
  timeoutId = setInterval(() => {
    refs.body.style.backgroundColor = getRandomHexColor();
  }, 1000);

  refs.startBtn.setAttribute('disabled', true);
}

function onStopClick() {
  clearInterval(timeoutId);

  refs.startBtn.removeAttribute('disabled');
}

// Генерування випадкового кольору
function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}
